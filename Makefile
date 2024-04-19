.PHONY: build run recreate isort black flake8 mypy lint frontcheck migrations migrate clear

build:
	docker compose build

run:
	docker compose up

recreate:
	docker compose up --build --force-recreate

isort:
	docker compose run --rm web isort .

black:
	docker compose run --rm web black . --exclude="migrations/"

flake8:
	docker compose run --rm web flake8 .

mypy:
	docker compose run --rm web mypy .

lint:
	docker compose run --rm -T web isort .
	docker compose run --rm -T web black .
	docker compose run --rm -T web flake8 .
	docker compose run --rm -T web mypy .

frontcheck:
	docker compose run --rm -T frontend npm run check

migrations:
	docker compose run --rm web flask db migrate

migrate:
	docker compose run --rm web flask db upgrade

clear:
	docker compose down -v
	docker system prune --force
	docker volume prune --force
