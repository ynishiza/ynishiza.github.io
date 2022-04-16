Source code for https://ynishiza.github.io/githubpage/

# Development

## Installation (macos)

Note: macos native `ruby` may not work.
Use Homebrew `ruby` instead.
Also need `libffi`.

Reference: https://github.com/ffi/ffi/issues/869#issuecomment-810890178 \
Reference: https://stackoverflow.com/questions/68351594/rvm-install-ruby-2-6-4-fails-with-makefile-error-implicit-declaration-of-functi \

Step 1: Install `ruby` + `libffi`
```
# step: install ruby + libffi
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

# step: install bundler
$ gem install bundler
```

Step 2: Install Jekyll

```
# step: install dependencies
$ cd ./docs
$ bundler install
```

Step 3: Start test server
```
# step: start test server
# Page available at http://localhost:4000
$ bundler exec jekyll serve
```

Step 4: run tests
```
$ ./docs/sanitytests.sh
```

