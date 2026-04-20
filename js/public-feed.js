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
      document.dispatchEvent(new CustomEvent('public-feed:loaded', { detail: result }));
    }).catch(function (err) {
      log('load failed, static shell remains', err && err.message);
      document.dispatchEvent(new CustomEvent('public-feed:failed', { detail: { error: String(err) } }));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
