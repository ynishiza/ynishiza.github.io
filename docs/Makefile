BUNDLER=bundler
NPM=npm

default: help

install: ## Initial setup 
	$(BUNDLER) install
	$(NPM) install

uninstall: ## Clear setup files 
	rm -r ./.gem ./node_modules

jslint: ## Lint
	@$(NPM) run lint

sanitytests: ## Sanity test
	bash ./sanitytests.sh

jstest: ## js test
	$(NPM) run test

serve: ## Start test server
	$(BUNDLER) exec jekyll serve

clean: ## Clean cache
	rm -r ./_site

help: ## Display this help
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install uninstall serve clean jslint jstest sanitytests
