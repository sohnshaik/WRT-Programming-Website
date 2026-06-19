source "https://rubygems.org"

# Jekyll 4.x — compatible with Ruby 4.0
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
  gem "jekyll-redirect-from"
end

# Ruby 4.0 removed these from stdlib
gem "csv"
gem "bigdecimal"
gem "base64"

# Windows/JRuby compat shims
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.2", platforms: %i[mingw x64_mingw mswin]
