# Developer Notes [![Availability at SixNines](http://www.sixnines.io/b/0e54)](http://www.sixnines.io/h/0e54)

## Set up Ruby on macOS

Run the below commands from the same Terminal window, from the folder with this `README.md` file.

```shell
brew install rbenv
rbenv install -l # list the Ruby versions
rbenv install 3.1.6 # install the latest one
rbenv local 3.1.6 # set the Ruby version for this directory
ruby --version # check the version
bundle install
```

## Build and run locally

Set the next environment variable to build and run locally: `set JEKYLL_ENV=development`.

Once the environment variable is set, just run `bundle exec jekyll serve`.

## Build for production

Set the next environment variable to build for production (e.g. to see Disqus comments and enable Google Analytics): `set JEKYLL_ENV=production` (note that default value is `development`).

Once the environment variable is set, just run `bundle exec jekyll build`.
