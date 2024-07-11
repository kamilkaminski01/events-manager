#!/bin/bash

echo "Running migrations"
flask db upgrade

echo "Creating admin user"
flask cmd admin

echo "Starting server"
gunicorn wsgi:app -b 0.0.0.0:4000

exec "$@"
