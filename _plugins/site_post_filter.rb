# frozen_string_literal: true

module SitePostFilter
  module_function

  def matches_site?(doc, site_id)
    return true if site_id.nil? || site_id.empty?

    assigned = doc.data["site"]
    return false if assigned.nil?

    Array(assigned).map(&:to_s).include?(site_id.to_s)
  end

  def filter_posts!(site)
    site_id = site.config["site_id"]
    return if site_id.nil? || site_id.empty?

    posts = site.collections["posts"]
    return unless posts

    filtered = posts.docs.select { |doc| matches_site?(doc, site_id) }
    posts.docs.replace(filtered)
    site.posts.docs.replace(filtered)
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  SitePostFilter.filter_posts!(site)
end
