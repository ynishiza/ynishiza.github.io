BUNDLER=bundler

default: help

install: ## Initial setup 
	$(BUNDLER) install

uninstall: ## 
	rm -r ./.gem

testserver: ## Start test server
	$(BUNDLER) exec jekyll serve

clean: ## Cleanup
	rm -r ./_site

help: ## Display this help
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install uninstall testserver clean
