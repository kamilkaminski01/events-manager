# Set the COMPOSE_FILE variable to the appropriate file based on the environment
# without env for development
# env=prod for production

ifeq ($(env),prod)
	COMPOSE_FILE=docker-compose-prod.yml
else
	COMPOSE_FILE=docker-compose.yml
endif

.PHONY: build run down recreate admin initial-data clear-data isort black flake8 mypy test pytest vitest lint check frontcheck migrations migrate clear

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
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web isort .

black:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web black .

flake8:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web flake8 .

mypy:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web mypy .

test:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web pytest
	docker compose -f $(COMPOSE_FILE) run --rm frontend npm run test

pytest:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web pytest

vitest:
	docker compose -f $(COMPOSE_FILE) run --rm frontend npm run test

lint:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps -T web isort .
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps -T web black .
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps -T web flake8 .
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps -T web mypy .

check:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web isort --check-only .
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web black --check .
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web flake8 .
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps web mypy .

frontcheck:
	docker compose -f $(COMPOSE_FILE) run --rm --no-deps -T frontend npm run check

migrations:
	docker compose -f $(COMPOSE_FILE) run --rm web flask db migrate

migrate:
	docker compose -f $(COMPOSE_FILE) run --rm web flask db upgrade

clear:
	docker compose -f $(COMPOSE_FILE) down
	docker images -q kamil01/events-manager | xargs -r docker rmi
