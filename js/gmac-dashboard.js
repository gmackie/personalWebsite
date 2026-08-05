// gmac.io live operations wall. ForgeGraph supplies factual status and build
// evidence; the static Jekyll catalog remains the fallback and editorial layer.

(function (root) {
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeUrl(value) {
    if (!value) return '';
    try {
      var parsed = new URL(value);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : '';
    } catch (_) {
      return '';
    }
  }

  function formatRelativeTime(value) {
    var timestamp = value ? new Date(value).getTime() : NaN;
    if (!Number.isFinite(timestamp)) return 'time unknown';

    var seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
    if (seconds < 60) return 'just now';
    var minutes = Math.round(seconds / 60);
    if (minutes < 60) return minutes + 'm ago';
    var hours = Math.round(minutes / 60);
    if (hours < 48) return hours + 'h ago';
    return Math.round(hours / 24) + 'd ago';
  }

  function buildSummaryModel(summary, appsPayload) {
    var apps = (appsPayload && appsPayload.apps) || [];
    var derived = { total: apps.length, healthy: 0, degraded: 0, down: 0 };

    apps.forEach(function (app) {
      if (Object.prototype.hasOwnProperty.call(derived, app.public_status)) {
        derived[app.public_status] += 1;
      }
    });

    var counts = (summary && summary.counts) || {};
    return {
      total: Number.isFinite(counts.total) ? counts.total : derived.total,
      healthy: Number.isFinite(counts.healthy) ? counts.healthy : derived.healthy,
      degraded: Number.isFinite(counts.degraded) ? counts.degraded : derived.degraded,
      down: Number.isFinite(counts.down) ? counts.down : derived.down,
      deploys: summary && Number.isFinite(summary.deploys_last_24h)
        ? summary.deploys_last_24h
        : '\u2014',
    };
  }

  function renderTags(tags) {
    return (tags || []).slice(0, 4).map(function (tag) {
      return '<span class="activity-tag">' + escapeHtml(tag) + '</span>';
    }).join('');
  }

  function findArtifactByKind(event, kind) {
    var artifacts = event.artifacts || [];
    for (var i = 0; i < artifacts.length; i++) {
      if (artifacts[i] && artifacts[i].kind === kind && safeUrl(artifacts[i].url)) {
        return artifacts[i];
      }
    }
    return null;
  }

  function findArtifact(event) {
    var priority = ['clip', 'screenshot', 'thumbnail'];
    for (var i = 0; i < priority.length; i++) {
      var artifact = findArtifactByKind(event, priority[i]);
      if (artifact) return artifact;
    }
    return null;
  }

  function renderArtifactMarkup(event) {
    var artifact = findArtifact(event);
    if (!artifact) return '';

    var url = safeUrl(artifact.url);
    var alt = escapeHtml(artifact.alt || event.headline || 'Build evidence');
    if (artifact.kind === 'clip') {
      var thumbnail = findArtifactByKind(event, 'thumbnail');
      var poster = safeUrl(artifact.preview_url) || safeUrl(thumbnail && thumbnail.url);
      return (
        '<div class="activity-media activity-media-video">' +
          '<video controls playsinline preload="metadata"' +
            (poster ? ' poster="' + escapeHtml(poster) + '"' : '') +
            ' aria-label="' + alt + '">' +
            '<source src="' + escapeHtml(url) + '" type="video/webm">' +
          '</video>' +
          '<span class="activity-evidence-label">video evidence</span>' +
        '</div>'
      );
    }

    return (
      '<a class="activity-media" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' +
        '<img src="' + escapeHtml(url) + '" alt="' + alt + '" loading="lazy">' +
        '<span class="activity-evidence-label">visual evidence</span>' +
      '</a>'
    );
  }

  function renderEventMarkup(event) {
    var impact = ['positive', 'negative', 'neutral'].indexOf(event.status_impact) >= 0
      ? event.status_impact
      : 'neutral';
    var type = String(event.event_type || 'build_update').replace(/_/g, ' ');
    var occurredAt = event.occurred_at || '';

    return (
      '<article class="activity-card activity-impact-' + impact + '" data-event-id="' + escapeHtml(event.id || '') + '">' +
        renderArtifactMarkup(event) +
        '<div class="activity-copy">' +
          '<div class="activity-kicker">' +
            '<span>' + escapeHtml(event.app_slug || 'system') + ' / ' + escapeHtml(type) + '</span>' +
            '<time datetime="' + escapeHtml(occurredAt) + '">' + escapeHtml(formatRelativeTime(occurredAt)) + '</time>' +
          '</div>' +
          '<h3>' + escapeHtml(event.headline || 'Build update') + '</h3>' +
          (event.summary ? '<p>' + escapeHtml(event.summary) + '</p>' : '') +
          ((event.tags || []).length ? '<div class="activity-tags">' + renderTags(event.tags) + '</div>' : '') +
        '</div>' +
      '</article>'
    );
  }

  function eventsForSite(eventsPayload, siteTarget) {
    var matching = ((eventsPayload && eventsPayload.items) || []).filter(function (event) {
      return !Array.isArray(event.site_targets) || event.site_targets.indexOf(siteTarget) !== -1;
    });
    var clips = matching.filter(function (event) {
      return Boolean(findArtifactByKind(event, 'clip'));
    });
    var remaining = matching.filter(function (event) {
      return !findArtifactByKind(event, 'clip');
    });
    return clips.concat(remaining).slice(0, 9);
  }

  function appTargetsSite(app, siteTarget) {
    return !Array.isArray(app && app.site_targets) || app.site_targets.indexOf(siteTarget) !== -1;
  }

  function updateText(rootElement, selector, value) {
    var element = rootElement.querySelector(selector);
    if (element) element.textContent = String(value);
  }

  function applySummary(result) {
    var panel = document.querySelector('[data-feed-summary-panel]');
    if (!panel) return;

    var model = buildSummaryModel(result.summary, result.apps);
    updateText(panel, '[data-feed-metric="total"]', model.total);
    updateText(panel, '[data-feed-metric="healthy"]', model.healthy);
    updateText(panel, '[data-feed-metric="degraded"]', model.degraded);
    updateText(panel, '[data-feed-metric="down"]', model.down);
    updateText(panel, '[data-feed-metric="deploys"]', model.deploys);
    updateText(
      panel,
      '[data-feed-sync-label]',
      'live / ' + formatRelativeTime(result.manifest && result.manifest.published_at),
    );
    panel.setAttribute('data-feed-state', 'live');
  }

  function applyActivity(result) {
    var activityRoot = document.querySelector('[data-feed-activity-root]');
    if (!activityRoot) return;

    var events = eventsForSite(result.events, 'gmac');
    var fallback = document.querySelector('[data-feed-static-build-log]');
    if (!events.length) {
      activityRoot.innerHTML = '';
      activityRoot.setAttribute('data-feed-state', 'empty');
      if (fallback) fallback.hidden = false;
      return;
    }

    activityRoot.innerHTML = events.map(renderEventMarkup).join('');
    activityRoot.setAttribute('data-feed-state', 'live');

    if (fallback) fallback.hidden = true;
  }

  function applyCardHealth(result, siteTarget) {
    var apps = (result.apps && result.apps.apps) || [];
    var bySlug = {};
    apps.forEach(function (app) { bySlug[app.slug] = app; });

    document.querySelectorAll('[data-feed-slug]').forEach(function (card) {
      var app = bySlug[card.getAttribute('data-feed-slug')];
      var line = card.querySelector('[data-feed-health-line]');
      if (!app || !appTargetsSite(app, siteTarget)) {
        if (line) line.remove();
        return;
      }

      if (!line) {
        line = document.createElement('p');
        line.className = 'feed-health-line';
        line.setAttribute('data-feed-health-line', '');
        card.appendChild(line);
      }

      var parts = [app.public_status || 'unknown'];
      if (Number.isFinite(app.endpoints_total)) {
        parts.push((app.endpoints_healthy || 0) + '/' + app.endpoints_total + ' checks');
      }
      if (app.last_checked_at) parts.push('checked ' + formatRelativeTime(app.last_checked_at));
      if (app.last_deploy_at) parts.push('deployed ' + formatRelativeTime(app.last_deploy_at));
      line.textContent = parts.join(' / ');
    });
  }

  function markFeedFailure() {
    var panel = document.querySelector('[data-feed-summary-panel]');
    var activityRoot = document.querySelector('[data-feed-activity-root]');
    var wasLive = panel && panel.getAttribute('data-feed-state') === 'live';
    var state = wasLive ? 'stale' : 'unavailable';

    if (panel) {
      panel.setAttribute('data-feed-state', state);
      updateText(panel, '[data-feed-sync-label]', wasLive ? 'stale / refresh failed' : 'unavailable');
    }
    if (activityRoot) activityRoot.setAttribute('data-feed-state', state);
  }

  function applyFeed(result) {
    applySummary(result);
    applyActivity(result);
    applyCardHealth(result, 'gmac');
  }

  root.GmacDashboard = {
    buildSummaryModel: buildSummaryModel,
    escapeHtml: escapeHtml,
    formatRelativeTime: formatRelativeTime,
    renderEventMarkup: renderEventMarkup,
    eventsForSite: eventsForSite,
    applyActivity: applyActivity,
    applyCardHealth: applyCardHealth,
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('public-feed:loaded', function (event) {
      applyFeed(event.detail || {});
    });
    document.addEventListener('public-feed:failed', markFeedFailure);
    if (root.__publicFeed) applyFeed(root.__publicFeed);
  }
})(typeof window !== 'undefined' ? window : globalThis);
