source "https://rubygems.org"

# GitHub Pages umbrella gem — pins Jekyll + all whitelisted plugins
gem "github-pages", group: :jekyll_plugins

# Explicitly listed so local `bundle exec jekyll serve` works too
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
  gem "jekyll-redirect-from"
end

# Windows/JRuby compat shims
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1", platforms: %i[mingw x64_mingw mswin]
gem "http_parser.rb", "~> 0.6.0", platforms: :jruby
