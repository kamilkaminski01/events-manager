<h1 align="center">Events Manager</h1>

This project allows to create events, participants and add participants to the
events. Choose or update which participant hosts the event and which participants
can attend to the event. You can also delete the events/participants or remove
participants from an event.

## Resources
- The server side application is written in `Flask` using `SQLAlchemy`'s ORM. <br/>
- User interface is written in `TypeScript` using the `React` framework. <br/>
- Styling is handled by [SASS](https://sass-lang.com/).<br/>
- Frontend building tool is handled by [Vite](https://vitejs.dev/). <br/>
- The database is handled by Postgres in a Docker container. <br/>
- The project is maintained in a containerized environment with [Docker](https://www.docker.com/).

## Running from sources
### Docker Compose setup
```sh
git clone https://github.com/kamilkaminski01/events-manager.git
cd events-manager/
make build
make run
```
The application will be running at `localhost:3000`

If `make` is not supported, the associated Docker commands can be used directly
in order to build and run the project:
```
cd events-manager/
docker compose build
docker compose up
```

[`Makefile`](Makefile) contains common commands that can be used to
build, run, and test the project. The most important commands include:
- `build`: builds the project with Docker Compose.
- `run`: runs the project with Docker Compose.
- `lint`: performs backend static code checks.
- `frontcheck`: performs frontend static code checks.
- `test`: runs backend and frontend unit tests.
- `pytest`: runs backend unit tests.
- `vitest`: runs frontend unit tests.
- `clear`: stops the currently running services and removes the volumes.

### Troubleshooting

In case of errors with typing or missing dependencies, try to rebuild the
Docker images:

```bash
make clear
docker compose up --build --force-recreate
```

### Local setup with a virtual environment
Start with the backend and database:
```bash
cd events-manager/
virtualenv venv
source venv/bin/activate

cd backend/
pip install -r requirements.txt

flask db upgrade
flask run --host=0.0.0.0 --port=4000
```

Next run the frontend app:
```bash
cd events-manager/frontend
npm install
npm run dev
```
The application will be running at `localhost:3000`

## Application setup

After running the application, the following actions can be executed
to initialize the database with example data: <br />
`make initial-data` <br/>
or <br/>
cd into the `backend` directory and type `flask cmd initialize_data`

### Authentication
Logging in allows to create events, register participants and modify existing data.
<br /> In order to login - create an admin user by running `make admin` or `flask
cmd admin` in the `backend` directory. <br /> The credentials will be `admin:admin`

## Code quality standards
### Backend
All backend code is formatted and verified by the `black`, `flake8`,
`mypy` and `isort` tools. Their configurations can be found in the
[setup.cfg](backend/setup.cfg) file. Additionally, `pre-commit` [checks](.pre-commit-config.yaml)
are performed to verify whitespaces, credentials, etc.

Custom functions and methods use **type hints** to improve IDE code
completions, prevent from type errors and extend code documentation.

### Frontend
All frontend code is written in `TypeScript`, formatted and verified by the `prettier`
and `eslint` tools.


## Demo

![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo1.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo2.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo3.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo4.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo5.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo6.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo7.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo8.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo9.png)
![demo](https://raw.githubusercontent.com/kamilkaminski01/events-manager/master/frontend/src/assets/images/demo/demo10.png)
