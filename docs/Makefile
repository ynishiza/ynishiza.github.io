BUNDLER=bundler

default: help

install: ## Initial setup 
	$(BUNDLER) install
	npm install eslint@^8

uninstall: ## Clear setup files 
	rm -r ./.gem ./node_modules

jslint: ## Lint
	npx eslint data/

sanitytest: ## Sanity test
	bash ./sanitytests.sh

serve: ## Start test server
	$(BUNDLER) exec jekyll serve

clean: ## Clean cache
	rm -r ./_site

help: ## Display this help
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install uninstall serve clean
