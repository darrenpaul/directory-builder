.PHONY: build-development
build-development: ## Build the development docker image.
	docker compose -f docker/development/docker-compose.yml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/development/docker-compose.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production/docker-compose.yml down

.PHONY: set-nearby-coffee
set-nearby-coffee:
	cp __project__/nearby-coffee/assets/icons/brand.svg assets/icons/brand.svg;
	cp __project__/nearby-coffee/public/favicon.ico public/favicon.ico;
	cp __project__/nearby-coffee/tailwind.config.ts tailwind.config.ts;
	cp __project__/nearby-coffee/.env .env;

.PHONY: set-nearby-coffee-production
set-nearby-coffee-production:
	cp __project__/nearby-coffee/assets/icons/brand.svg assets/icons/brand.svg;
	cp __project__/nearby-coffee/public/favicon.ico public/favicon.ico;
	cp __project__/nearby-coffee/tailwind.config.ts tailwind.config.ts;

.PHONY: set-nearby-spa
set-nearby-spa:
	cp __project__/nearby-spa/assets/icons/brand.svg assets/icons/brand.svg;
	cp __project__/nearby-spa/public/favicon.ico public/favicon.ico;
	cp __project__/nearby-spa/tailwind.config.ts tailwind.config.ts;
	cp __project__/nearby-spa/.env .env;

.PHONY: set-nearby-spa-production
set-nearby-spa-production:
	cp __project__/nearby-spa/assets/icons/brand.svg assets/icons/brand.svg;
	cp __project__/nearby-spa/public/favicon.ico public/favicon.ico;
	cp __project__/nearby-spa/tailwind.config.ts tailwind.config.ts;
