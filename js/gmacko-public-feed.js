(function() {
  function groupForApp(app) {
    if (app.kind === "experiment") return "experiments";

    switch (app.category) {
      case "infrastructure":
      case "ai-infra":
        return "infrastructure-ai";
      case "edtech":
      case "gamedev":
      case "consumer":
        return "games-learning";
      case "industrial":
      case "workflow":
      case "iot":
        return "operations-controls";
      case "media":
      case "proptech":
        return "standalone";
      default:
        return null;
    }
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  }

  async function hydrateLanding() {
    var helpers = window.GmacPublicFeed;
    var landing = document.querySelector("[data-public-feed-landing]");
    if (!helpers || !landing) return;

    var meta = landing.querySelector("[data-landing-feed-meta]");

    try {
      var feed = await helpers.loadPublicFeed(landing.getAttribute("data-feed-manifest-url"));
      var apps = feed.apps.filter(function(app) {
        return app.site_targets && app.site_targets.indexOf("gmacko") !== -1;
      });

      var grouped = {};
      apps.forEach(function(app) {
        var group = groupForApp(app);
        if (!group) return;
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(app);
      });

      Object.keys(grouped).forEach(function(groupName) {
        var grid = landing.querySelector('[data-feed-grid="' + groupName + '"]');
        if (!grid || !grouped[groupName].length) return;
        grid.innerHTML = grouped[groupName].map(helpers.renderLandingCard).join("");
      });

      landing.setAttribute("data-generation-id", feed.manifest.generation_id);
      if (meta) meta.textContent = "live feed · " + feed.manifest.generation_id;
    } catch (_error) {
      landing.setAttribute("data-feed-state", "fallback");
      if (meta) meta.textContent = "static fallback";
    }
  }

  ready(hydrateLanding);
})();
