STACK=stack
HAKYLL=stack exec -- site
NPM=npm

default: help

install: ## Initial setup
	$(STACK) build
	# $(BUNDLER) install
	$(NPM) install

uninstall: ## Clear setup files
	rm -r ./.gem ./node_modules

jslint: ## Lint
	@$(NPM) run lint

sanitytests: ## Sanity test
	bash ./sanitytests.sh

jstest: ## js test
	$(NPM) run test

build_site: ## Build the site
	$(STACK) build
	$(HAKYLL) rebuild

serve: ## Start test server
	$(HAKYLL) build
	$(HAKYLL) watch

clean: ## Clean cache
	$(HAKYLL) clean
	$(STACK) clean

help: ## Display this help
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install uninstall serve clean jslint jstest sanitytests
