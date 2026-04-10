(function() {
  var DEFAULT_MANIFEST_URL = "https://data.gmac.io/forgegraph/v1/manifest.json";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function domainFromUrl(url) {
    if (!url) return "";

    try {
      return new URL(url).host;
    } catch (_error) {
      return String(url).replace(/^https?:\/\//, "");
    }
  }

  function formatRelativeTime(value) {
    if (!value) return "unknown";

    var ts = new Date(value).getTime();
    if (Number.isNaN(ts)) return "unknown";

    var diffMinutes = Math.max(0, Math.round((Date.now() - ts) / 60000));
    if (diffMinutes < 60) return diffMinutes + "m ago";

    var diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 48) return diffHours + "h ago";

    var diffDays = Math.round(diffHours / 24);
    return diffDays + "d ago";
  }

  function mapDashboardStatus(status) {
    switch (status) {
      case "healthy":
        return "live";
      case "degraded":
        return "degraded";
      case "down":
        return "down";
      case "building":
        return "coming";
      case "private":
        return "local";
      default:
        return "unknown";
    }
  }

  function mapLandingStatus(status) {
    switch (status) {
      case "healthy":
        return "live";
      case "degraded":
        return "wip";
      case "down":
        return "killed";
      case "building":
        return "wip";
      default:
        return "paused";
    }
  }

  function renderTags(tags, className) {
    if (!tags || !tags.length) return "";

    return tags.map(function(tag) {
      return '<span class="' + className + '">' + escapeHtml(tag) + "</span>";
    }).join("");
  }

  function renderDashboardCard(app) {
    var media = app.screenshot_url
      ? '<div class="proto-card-media"><img src="' + escapeHtml(app.screenshot_url) + '" alt="' + escapeHtml(app.name) + ' screenshot"></div>'
      : '<div class="proto-card-media proto-card-fallback">' + escapeHtml(domainFromUrl(app.primary_url || app.name)) + "</div>";

    var metaBits = [];
    if (app.last_checked_at) metaBits.push("checked " + formatRelativeTime(app.last_checked_at));
    if (app.last_deploy_at) metaBits.push("deployed " + formatRelativeTime(app.last_deploy_at));
    if (app.screenshot_taken_at) metaBits.push("shot " + formatRelativeTime(app.screenshot_taken_at));
    if (app.freshness && app.freshness !== "unknown") metaBits.push(app.freshness);

    return (
      '<div class="proto-card proto-card-live">' +
        media +
        '<div>' +
          '<div class="proto-header">' +
            '<span class="status-dot dot-' + mapDashboardStatus(app.public_status) + '"></span>' +
            '<span class="proto-name">' + escapeHtml(app.name) + '</span>' +
            '<span class="proto-url">' + escapeHtml(domainFromUrl(app.primary_url || "")) + '</span>' +
          "</div>" +
          '<p class="proto-desc">' + escapeHtml(app.description || app.thesis || "") + "</p>" +
          '<p class="proto-meta">' + escapeHtml(metaBits.join(" · ") || app.public_status) + "</p>" +
          (app.tags && app.tags.length ? '<div class="proto-stack">' + renderTags(app.tags, "stack-pill") + "</div>" : "") +
        "</div>" +
      "</div>"
    );
  }

  function renderDashboardSections(apps) {
    var services = apps.filter(function(app) { return app.kind === "service"; });
    var prototypes = apps.filter(function(app) { return app.kind !== "service"; });
    var html = "";

    if (services.length) {
      html += '<section class="dashboard-section"><h2 class="dashboard-section-label">Services</h2><div class="proto-grid">';
      html += services.map(renderDashboardCard).join("");
      html += "</div></section>";
    }

    if (prototypes.length) {
      html += '<section class="dashboard-section"><h2 class="dashboard-section-label">Prototypes</h2><div class="proto-grid">';
      html += prototypes.map(renderDashboardCard).join("");
      html += "</div></section>";
    }

    return html;
  }

  function renderLandingCard(app) {
    var thumb = app.screenshot_url
      ? '<div class="startup-thumb"><img src="' + escapeHtml(app.screenshot_url) + '" alt="' + escapeHtml(app.name) + ' homepage thumbnail"></div>'
      : '<div class="startup-thumb"><div class="startup-thumb-fallback startup-thumb-' + mapLandingStatus(app.public_status) + '"><span>' + escapeHtml(domainFromUrl(app.primary_url || app.name)) + "</span></div></div>";

    var updatedBits = [];
    if (app.last_checked_at) updatedBits.push("checked " + formatRelativeTime(app.last_checked_at));
    if (app.last_deploy_at) updatedBits.push("deployed " + formatRelativeTime(app.last_deploy_at));

    return (
      '<a class="startup-card" href="' + escapeHtml(app.primary_url || "#") + '" target="_blank" rel="noopener noreferrer">' +
        thumb +
        '<div class="startup-copy">' +
          '<div class="startup-title-row">' +
            '<h3>' + escapeHtml(app.name) + '</h3>' +
            '<span class="status-badge status-' + mapLandingStatus(app.public_status) + '">' + escapeHtml(app.public_status) + "</span>" +
          "</div>" +
          (app.thesis ? '<p class="venture-thesis">' + escapeHtml(app.thesis) + "</p>" : "") +
          '<p>' + escapeHtml(app.description || "") + "</p>" +
          (app.tags && app.tags.length ? '<div class="venture-tags">' + renderTags(app.tags, "venture-tag") + "</div>" : "") +
          (updatedBits.length ? '<p class="venture-updated">' + escapeHtml(updatedBits.join(" · ")) + "</p>" : "") +
        "</div>" +
      "</a>"
    );
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  }

  async function fetchJson(url) {
    var response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Request failed for " + url + ": " + response.status);
    }
    return response.json();
  }

  async function loadPublicFeed(manifestUrl) {
    var manifest = await fetchJson(manifestUrl || DEFAULT_MANIFEST_URL);
    var appsPayload = await fetchJson(manifest.apps_url);
    return {
      manifest: manifest,
      apps: appsPayload.apps || [],
      payload: appsPayload
    };
  }

  async function hydrateDashboard() {
    var dashboard = document.querySelector("[data-public-feed-dashboard]");
    if (!dashboard) return;

    var root = dashboard.querySelector("[data-dashboard-feed-root]");
    var meta = dashboard.querySelector("[data-dashboard-feed-meta]");

    try {
      var feed = await loadPublicFeed(dashboard.getAttribute("data-feed-manifest-url"));
      var apps = feed.apps.filter(function(app) {
        return app.site_targets && app.site_targets.indexOf("gmac") !== -1;
      });

      if (apps.length && root) {
        root.innerHTML = renderDashboardSections(apps);
      }

      dashboard.setAttribute("data-generation-id", feed.manifest.generation_id);
      if (meta) meta.textContent = "live feed · " + feed.manifest.generation_id;
    } catch (_error) {
      dashboard.setAttribute("data-feed-state", "fallback");
      if (meta) meta.textContent = "static fallback";
    }
  }

  window.GmacPublicFeed = {
    DEFAULT_MANIFEST_URL: DEFAULT_MANIFEST_URL,
    domainFromUrl: domainFromUrl,
    escapeHtml: escapeHtml,
    formatRelativeTime: formatRelativeTime,
    loadPublicFeed: loadPublicFeed,
    mapLandingStatus: mapLandingStatus,
    renderLandingCard: renderLandingCard
  };

  ready(hydrateDashboard);
})();
