# Update 05/06/2016

Important! It's better to download the gzipped files instead of forking the repo. I would really appreciate if you could give me a star. 😁

This project is under MIT license, so feel free to make it your own.

# Leonids Jekyll Themes
a
**[Leonids](http://renyuanz.github.io/leonids)** is a clean Jekyll theme perfect for powering your GitHub hosted blog.

## What is Leonids?

* Responsive templates. Looking good on mobile, tablet, and desktop.
* Simple and clear permalink structure.
* Support for Disqus Comments.
* Support for multi-authors.
* **And** the Leonids (/ˈliːənɪdz/ lee-ə-nidz) are a prolific meteor shower associated with the comet [Tempel-Tuttle](https://en.wikipedia.org/wiki/55P/Tempel%E2%80%93Tuttle).

See a [demo](http://renyuanz.github.io/leonids/) hosted on GitHub.


## Quick setup

`git clone https://github.com/gmackie/personalWebsite`

`cd personalWebsite`

`jekyll server`

Check out your awesome blog at `http://localhost:4000` and Cheers!

## Dockerizing
The `Dockerfile` in the repo will copy the compiled output of `jekyll build`
(located in `./_site/`) and stash it inside an nginx docker container and host
the site on port 80. This can then be pushed to Docker Hub and then used in
conjunction with the helm chart [here](https://github.com/gmackie/charts/) to
deploy the blog to Kubernetes!

## Resume Page by [@Skn0tt](https://github.com/Skn0tt)
Leonids features a simple resume page. It is divided up into five sections: 

* Bio (Edit \_data/index/careers.yml)
* Education (Edit \_data/index/education.yml)
* Skills (Edit \_data/index/skills.yml)
* Projects (Edit \_data/index/projects.yml)
* About (Edit \_includes/sections/about.html)

You can put all your info into these files, and they will be featured on the resume page.
