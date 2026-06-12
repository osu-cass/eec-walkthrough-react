This application is a wiki that allows users to browse, edit, and review
content pages. The application uses Node.js, express, React, and MySQL.

In production the server that this application is hosted on is expected to accept
HTTPS requests from the public (for example using ports 444 and 443) and then proxy
these requests using HTTP (for example using ports 1111 and 2222).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Required Resources

### `environment variables`

- API_PORT: The port that this application will use to serve API requests.<br>
This value will set the API server's port.<br>
If you change this value you will need to update the `proxy` value in
`client/package.json`.

- FILE_PORT: The port that this application will use to serve build files in production mode.

- REACT_APP_API_HOST: The address that will be used when attempting to send requests
to the API. Note that you might use a different port here if you are sending requests
through a proxy. For example you might set API_PORT to 1111 and then have the
host use port 444 as a https public port, that way you can have the public communicate with the server
over a SSL and not have to deal with a SSL inside the application.

- NODE_ENV: The environment that the application is running in.

- MYSQL_DB_NAME: The name of the database.
- MYSQL_PORT: The port that the database is running on.
- MYSQL_HOST: The host that the database is running on.
- MYSQL_USER: The username for the database.

#### Setup Steps
1. Create a file named `.env` in the root directory of your project
2. Copy the contents of the `.env.example` file into the `.env` file

### `user secrets`

The following user secrets are used to store the database credentials and the JWT secret key:
- MYSQL_PASSWORD: The password for the database user.
- MYSQL_ROOT_PASSWORD: The password for the root user.
- JWT_SECRET_KEY: The secret key for JWT authentication.

> **⚠️ Important:** The credentials shown in [DOCKER.md](DOCKER.md) (e.g., `walkthrough`, `walkthroughpass`, `rootpassword`) are **example values only**. You must create your own secure passwords for local development. Never use these example values or commit real credentials to source control.

#### Setup Steps
1. Create a directory named `secrets` in the root directory of your project.
2. Create these files in the `secrets` directory:
    - `mysql_password.txt`
    - `mysql_root_password.txt`
3. Add your own secure values for the secrets to each of the files. **Do not use the example values from the documentation.** These values should be human readable and you should not share them with anyone.
4. Ensure you have Node.js installed and run the following command to generate a random JWT secret key.
```
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
5. Once generated, create a file named `jwt_secret_key.txt` in the `secrets` directory and add the generated key to the file.

To run this application in development mode using Docker, follow the instructions in the [DOCKER.md](DOCKER.md) file.

## Available Scripts

In the project directory, you can run:

### `npm run installAll`

This is the first script you should run when you start working on this project.
This command installs all of the backend and client modules. This process may take some time.

### `npm start`

Runs the app in production mode.<br />

While in production mode webpages will be served from the `client/build` folder,
and all API requests will be required to be sent over https.

### `npm run dev`

Runs the app in development mode.<br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `client/build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed.

## Using a Linter

Running a linter to check for stylistic errors and simple bugs is good practice.

To install eslint on your computer run the following command:

```
npm install eslint --global
```

From the root directory, attempt to fix all errors across the project:

```
eslint "." --fix 
```

## Database Setup for Development

Docker Compose is the recommended development database setup. The MariaDB
container initializes an empty local database volume from
`services/database/db-init-new.sql`, then the Flyway container applies any SQL
migrations from `services/database/migrations` before the app container starts.

Existing databases are not reloaded from `db-init-new.sql`. They are upgraded
through Flyway migrations, which are tracked in the `flyway_schema_history`
table.

Use these commands to inspect and run migrations through Docker:

```bash
docker compose run --rm flyway info
docker compose run --rm flyway validate
docker compose run --rm flyway migrate
```
> Note: When running these commands, you may see a message like this:
> ```
> You are not signed in to Flyway, to sign in please run auth
> ```
> This is expected and can be ignored, as auth is not necessary for Flyway community.


Add plain SQL migration files under `services/database/migrations` using Flyway
names such as `V001__description.sql` and `V002__description.sql`. Keep
migrations small and reviewable. Large data backfills or long-running migrations
should be run manually during planned maintenance rather than during normal app
startup.

Flyway Community does not provide the paid `undo` workflow. Treat migrations as
forward-only: if a schema change needs to be corrected, add a new migration that
fixes or reverses it. Before production migrations, back up the database and run
`flyway info`, `flyway validate`, and `flyway migrate` through the deployment
process.

For full Docker setup instructions, see [DOCKER.md](DOCKER.md).



## Update the Production Server

This will only work for the current production server at Oregon State University. For hosting using other services, please refer to the appropriate guide.

You will need to open a ticket with IT to add new users to the production server. A new ticket can be opened here:
https://is.oregonstate.edu/td-service/virtual-servers

Access the production server at `walkthrough.eec.oregonstate.edu` using PuTTY or use any shell that supports SSH.

Once you have logged in perform the following commands to update the version being ran in production.
```
cd /webdev/deployment/eec-walkthrough-react
```

Login with the shared walkthrough account
```
sudo -u walkthrough bash
```

Make sure you first kill any running processes or else you will not be able to use the ports that you want. You can check to see what processes are running, but there should be only one node process running that needs to be killed.
```
ps -ef
killall node
```
If that killall command doesn't work, do `killall -9` node instead.

You are now able to use git commands.
Once you have updated the repo to the current version you will need to build.
```
git pull
npm run build
```

Now you can run a script to start the web application and close the terminal without killing your process.
```
/data/walkthrough/start-wt.sh
```

Lastly you can close your terminal and the web application should be running your newest version.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting
https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration
https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment
https://facebook.github.io/create-react-app/docs/deployment
