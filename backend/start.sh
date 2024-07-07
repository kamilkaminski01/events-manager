#!/bin/bash

echo "Running migrations"
flask db upgrade

echo "Starting server"
gunicorn wsgi:app -b 0.0.0.0:4000

exec "$@"
