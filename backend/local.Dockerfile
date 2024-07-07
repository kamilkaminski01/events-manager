FROM python:3.10-slim

EXPOSE 4000

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY ./app .
