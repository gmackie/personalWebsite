# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is Graham Mackie's personal website/blog built with Jekyll (static site generator). The site showcases blog posts, resume information, and projects.

## Key Technologies

- **Jekyll**: Static site generator (Ruby-based)
- **Leonids Theme**: Jekyll theme for the site design
- **Docker/Nginx**: Containerized deployment
- **SCSS/Sass**: Modular styling
- **Markdown**: Content authoring for blog posts

## Building and Running

Since Jekyll is not installed locally and the repository uses Docker:

```bash
# Build the Docker image
docker build -t personal-website .

# Run the container locally
docker run -p 8080:80 personal-website
```

The Dockerfile expects a pre-built `_site/` directory. To build the Jekyll site:
1. Install Jekyll locally: `gem install jekyll bundler`
2. Build the site: `jekyll build`
3. The static files will be in `_site/`

## Project Structure

- `_posts/`: Published blog posts in Markdown format (YYYY-MM-DD-title.md)
- `_drafts/`: Unpublished blog posts
- `_data/`: YAML files containing resume data:
  - `careers.yml`: Work experience
  - `education.yml`: Educational background
  - `skills.yml`: Technical skills
  - `projects.yml`: Project showcase
- `_layouts/`: Page templates (default, post, resume)
- `_includes/`: Reusable components and sections
- `_sass/`: Modular SCSS files
- `_config.yml`: Site configuration and metadata

## Content Management

### Creating Blog Posts
1. Add new posts to `_posts/` with filename format: `YYYY-MM-DD-title.md`
2. Include front matter:
   ```yaml
   ---
   layout: post
   title: "Post Title"
   excerpt: "Brief description"
   categories: [category]
   tags: [tag1, tag2]
   ---
   ```
3. Use `<!--more-->` to mark the excerpt separator

### Updating Resume
Edit the YAML files in `_data/index/`:
- `careers.yml`: Work experience entries
- `education.yml`: Education entries
- `skills.yml`: Technical skills
- `projects.yml`: Project descriptions

### Site Configuration
Main settings in `_config.yml`:
- Site metadata (title, description, keywords)
- Owner information and social links
- Jekyll processing options
- Google Analytics tracking ID

## Deployment
The site is configured to run on Kubernetes. The deployment process:
1. Build Jekyll site locally
2. Build Docker image with static files
3. Deploy container to Kubernetes cluster