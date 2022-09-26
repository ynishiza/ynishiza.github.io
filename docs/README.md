# Development

## Installation (macos)

Note: macos native `ruby` may not work.
Use Homebrew `ruby` instead.
Also need `libffi`.

Reference: https://github.com/ffi/ffi/issues/869#issuecomment-810890178 \
Reference: https://stackoverflow.com/questions/68351594/rvm-install-ruby-2-6-4-fails-with-makefile-error-implicit-declaration-of-functi \

Step 1: install ruby + libffi

```
# Install
$ brew install ruby libffi

# step: configure ruby
# Does not override native ruby by default
# Probably want to add these to .bashrc
$ BREW_LIB_PATH="/usr/local/opt"
$ export PATH="$BREW_LIB_PATH/ruby/bin:$PATH"
$ export LDFLAGS="-L$BREW_LIB_PATH/libffi/lib"
$ export CPPFLAGS="-I$BREW_LIB_PATH/libffi/include"
$ export PKG_CONFIG_PATH="$BREW_LIB_PATH/libffi/lib/pkgconfig"

# Confirm
$ which ruby
/usr/local/opt/ruby/bin/ruby
```


Step 2: install **bundler**

Bundler is a Ruby package manager. Required to install jekyll.

```
$ gem install bundler
```

## Usage

```
## Show help
$ make
$ make help

## Setup
$ make install        # Install packages, including jekyll
$ make uninstall      # Cleanup installation files

## Development
$ make serve          # Start local server
$ make clean          # Cleanup cache

## Automated tests
$ make jslint
$ make jstest
$ make sanitytests
```

