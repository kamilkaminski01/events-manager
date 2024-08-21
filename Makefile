# Set the COMPOSE_FILE variable to the appropriate file based on the environment
# without env for development
# env=prod for production

ifeq ($(env),prod)
	COMPOSE_FILE=docker-compose-prod.yml
else
	COMPOSE_FILE=docker-compose.yml
endif

.PHONY: build run down recreate admin initial-data clear-data isort black flake8 mypy test pytest vitest lint check frontcheck migrations migrate clear

REGISTRY = kamil01/events-manager

build:
	docker compose -f $(COMPOSE_FILE) build

run:
	docker compose -f $(COMPOSE_FILE) up $(if $(filter prod,$(env)),-d)

down:
	docker compose -f $(COMPOSE_FILE) down

recreate:
	docker compose -f $(COMPOSE_FILE) up --build --force-recreate $(if $(filter prod,$(env)),-d)

admin:
	docker compose -f $(COMPOSE_FILE) run --rm web flask cmd admin

initial-data:
	docker compose -f $(COMPOSE_FILE) run --rm web flask cmd initialize_data

clear-data:
	docker compose -f $(COMPOSE_FILE) run --rm web flask cmd clear_data

isort:
	docker compose -f $(COMPOSE_FILE) run --rm web isort .

black:
	docker compose -f $(COMPOSE_FILE) run --rm web black . --exclude="migrations/"

flake8:
	docker compose -f $(COMPOSE_FILE) run --rm web flake8 .

mypy:
	docker compose -f $(COMPOSE_FILE) run --rm web mypy .

test:
	docker compose -f $(COMPOSE_FILE) run --rm web pytest
	docker compose -f $(COMPOSE_FILE) run --rm frontend npm run test

pytest:
	docker compose -f $(COMPOSE_FILE) run --rm web pytest

vitest:
	docker compose -f $(COMPOSE_FILE) run --rm frontend npm run test

lint:
	docker compose -f $(COMPOSE_FILE) run --rm -T web isort .
	docker compose -f $(COMPOSE_FILE) run --rm -T web black .
	docker compose -f $(COMPOSE_FILE) run --rm -T web flake8 .
	docker compose -f $(COMPOSE_FILE) run --rm -T web mypy .

check:
	docker compose -f $(COMPOSE_FILE) run --rm web isort --check-only .
	docker compose -f $(COMPOSE_FILE) run --rm web black --check .
	docker compose -f $(COMPOSE_FILE) run --rm web flake8 .
	docker compose -f $(COMPOSE_FILE) run --rm web mypy .

frontcheck:
	docker compose -f $(COMPOSE_FILE) run --rm -T frontend npm run check

migrations:
	docker compose -f $(COMPOSE_FILE) run --rm web flask db migrate

migrate:
	docker compose -f $(COMPOSE_FILE) run --rm web flask db upgrade

clear:
	docker compose -f $(COMPOSE_FILE) down
	docker images -q $(REGISTRY) | xargs -r docker rmi
