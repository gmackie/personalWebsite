// ForgeGraph public-feed consumer.
//
// Reads a bootstrap <script type="application/json" id="public-feed-config">
// blob containing { enabled, manifest_url, fetch_timeout_ms, site_target }.
// When enabled, fetches manifest → apps, exposes the result on
// window.__publicFeed, and dispatches `public-feed:loaded` on document.
//
// Everything no-ops when disabled or when any request fails — the static
// server-rendered shell is the ground truth, hydration is additive.

(function () {
  function readConfig() {
    var el = document.getElementById('public-feed-config');
    if (!el) return null;
    try {
      return JSON.parse(el.textContent || '{}');
    } catch (_) {
      return null;
    }
  }

  function debugOn() {
    try {
      return /[?&]feed_debug=1\b/.test(window.location.search);
    } catch (_) {
      return false;
    }
  }

  function log() {
    if (!debugOn()) return;
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[public-feed]');
    console.log.apply(console, args);
  }

  function fetchJson(url, timeoutMs) {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, timeoutMs);
    return fetch(url, { cache: 'no-store', signal: ctrl.signal })
      .then(function (r) {
        clearTimeout(timer);
        if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
        return r.json();
      })
      .catch(function (err) {
        clearTimeout(timer);
        throw err;
      });
  }

  function load(cfg) {
    var timeout = cfg.fetch_timeout_ms || 3500;
    log('loading manifest', cfg.manifest_url);
    return fetchJson(cfg.manifest_url, timeout).then(function (manifest) {
      if (!manifest || !manifest.apps_url) {
        throw new Error('manifest missing apps_url');
      }
      log('manifest ok, loading apps', manifest.apps_url);
      return fetchJson(manifest.apps_url, timeout).then(function (apps) {
        return { manifest: manifest, apps: apps };
      });
    });
  }

  function init() {
    var cfg = readConfig();
    if (!cfg) {
      log('no config element — skipping');
      return;
    }
    if (!cfg.enabled) {
      log('feed disabled — skipping');
      return;
    }
    if (!cfg.manifest_url) {
      log('no manifest_url — skipping');
      return;
    }

    load(cfg).then(function (result) {
      window.__publicFeed = result;
      log('loaded', result);
      applyFeedToCards(result.apps, cfg);
      document.dispatchEvent(new CustomEvent('public-feed:loaded', { detail: result }));
    }).catch(function (err) {
      log('load failed, static shell remains', err && err.message);
      document.dispatchEvent(new CustomEvent('public-feed:failed', { detail: { error: String(err) } }));
    });
  }

  // --- Card enhancement -----------------------------------------------------
  // Hybrid model: YAML renders the cards (authoritative for name, description,
  // URL, ordering). Feed supplements with live status + screenshot + freshness
  // metadata on any card carrying a data-feed-slug attribute.

  function indexApps(appsPayload) {
    var apps = (appsPayload && appsPayload.apps) || [];
    var byId = {};
    for (var i = 0; i < apps.length; i++) {
      var a = apps[i];
      if (a && a.slug) byId[a.slug] = a;
    }
    return byId;
  }

  // Map ForgeGraph public_status → the existing .status-dot class set used in
  // dashboard.html. Unknown values fall back to 'unknown' so the CSS stays
  // predictable.
  function statusDotClass(publicStatus) {
    switch (publicStatus) {
      case 'healthy':   return 'dot-live';
      case 'degraded':  return 'dot-degraded';
      case 'down':      return 'dot-down';
      case 'building':  return 'dot-loading';
      case 'private':   return 'dot-local';
      default:          return 'dot-unknown';
    }
  }

  function applyToCard(card, app, siteTarget) {
    if (!app) return;
    // Respect site_targets: skip enhancement if this site isn't listed. A
    // missing site_targets array means the card is opt-in everywhere, which
    // matches how the feed currently seeds every app.
    if (Array.isArray(app.site_targets) && siteTarget && app.site_targets.indexOf(siteTarget) === -1) {
      log('skip (site_target mismatch)', app.slug, siteTarget, app.site_targets);
      return;
    }

    // Expose metadata on the element for inspectability + future CSS hooks.
    card.setAttribute('data-feed-status', app.public_status || 'unknown');
    if (app.freshness) card.setAttribute('data-feed-freshness', app.freshness);
    if (app.last_deploy_at) card.setAttribute('data-feed-last-deploy-at', app.last_deploy_at);
    if (app.last_checked_at) card.setAttribute('data-feed-last-checked-at', app.last_checked_at);

    // Status dot: only override when the feed actually knows something.
    // 'unknown' from the feed is strictly worse than YAML's hand-set status,
    // so we leave the static dot alone in that case.
    var dot = card.querySelector('.status-dot');
    if (dot && app.public_status && app.public_status !== 'unknown') {
      // Strip any existing dot-* class and apply the feed-derived one.
      dot.className = dot.className.replace(/\bdot-[\w-]+\b/g, '').trim();
      dot.classList.add('status-dot', statusDotClass(app.public_status));
    }

    // Screenshot: decorate if available, but never blow away an existing
    // static thumbnail the template already rendered.
    if (app.screenshot_url) {
      card.setAttribute('data-feed-screenshot-url', app.screenshot_url);
      var thumb = card.querySelector('.startup-thumb-fallback');
      if (thumb && !card.querySelector('.startup-thumb img')) {
        thumb.style.backgroundImage = 'url(' + JSON.stringify(app.screenshot_url).slice(1, -1) + ')';
        thumb.style.backgroundSize = 'cover';
        thumb.style.backgroundPosition = 'center';
      }
    }
  }

  function applyFeedToCards(appsPayload, cfg) {
    var byId = indexApps(appsPayload);
    var siteTarget = cfg && cfg.site_target;
    var cards = document.querySelectorAll('[data-feed-slug]');
    var matched = 0;
    var unmatched = [];
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var slug = card.getAttribute('data-feed-slug');
      if (!slug) continue;
      var app = byId[slug];
      if (app) {
        applyToCard(card, app, siteTarget);
        matched++;
      } else {
        unmatched.push(slug);
      }
    }
    log('enhanced cards:', matched, '| missing feed entries for:', unmatched);

    // Feed-only apps (no YAML card on this site): report for editorial
    // review. Not rendered automatically — adding them is a curatorial call.
    if (debugOn()) {
      var yamlSlugs = {};
      for (var j = 0; j < cards.length; j++) {
        var s = cards[j].getAttribute('data-feed-slug');
        if (s) yamlSlugs[s] = true;
      }
      var feedOnly = [];
      var feedApps = (appsPayload && appsPayload.apps) || [];
      for (var k = 0; k < feedApps.length; k++) {
        var a = feedApps[k];
        if (!yamlSlugs[a.slug]) feedOnly.push(a.slug);
      }
      log('feed-only slugs (not rendered on this site):', feedOnly);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
