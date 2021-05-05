This application is a wiki that allows users to browse, edit, and review
content pages. The application uses Node.js, express, React, and MySQL.

In production the server that this application is hosted on is expected to accept
HTTPS requests from the public (for example using ports 444 and 443) and then proxy
these requests using HTTP (for example using ports 1111 and 2222).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Required Resources

### `environment variables`

To make it easier to manage your environment variables it is recommend that you
create a `.env` file in the root directory.

API_PORT: The port that this application will use to serve API requests.<br>
This value will set the API server's port.<br>
If you change this value you will need to update the `proxy` value in
`client/package.json`.

FILE_PORT: The port that this application will use to serve build files in production mode.

REACT_APP_API_HOST: The address that will be used when attempting to send requests
to the API. Note that you might use a different port here if you are sending requests
through a proxy. For example you might set API_PORT to 1111 and then have the
host use port 444 as a https public port, that way you can have the public communicate with the server 
over a SSL and not have to deal with a SSL inside the application.

SQL_DB_NAME: The name of the SQL database.

SQL_HOST: The host address of the SQL server.

SQL_PASSWORD: The password for the SQL server.

SQL_PORT: The port used to access the SQL database.

SQL_USER: The username for connecting to the SQL server.

JWT_SECRET_KEY: A random string that will be used as a secret key.
The secret key should be at least 15 characters long.

An example file contains the following:
```
API_PORT=1111
FILE_PORT=2222
REACT_APP_API_HOST='https://walkthrough.eec.oregonstate.edu:444/'
SQL_DB_NAME='eec_walkthrough'
SQL_HOST='localhost'
SQL_PASSWORD=''
SQL_PORT=3307
SQL_USER='root'
JWT_SECRET_KEY='Coe2QWp2!PCEqo432'
```
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

## Creating a Database for Development

Install XAMPP: https://www.apachefriends.org/index.html

Follow the steps in this video to get into PHPMyAdmin: https://www.youtube.com/watch?v=0DPB70hZykg

When in PHPMyAdmin create a new database called `eec_walkthrough`.

Click on your new database.

Click the "Import" tab at the top of the screen.

Select the `db-init.sql` file in our repo (services\database\db-init.sql).

Press the "Go" button at the bottom of the screen.

Create a file named `.env` in the root directory of your project with the following contents:
```
PORT=1111
SQL_DB_NAME='eec_walkthrough'
SQL_HOST='localhost'
SQL_PASSWORD=''
SQL_PORT=3306
SQL_USER='root'
JWT_SECRET_KEY='anythingCanGoHere'
```

Run the following command to start the server in development mode. Your application should now be using your local database.
```
npm run dev
```


## Update the Production Server

This will only work for the current production server at Oregon State University. For hosting using other services, please refer to the appropriate guide.

You will need to open a ticket with IT to add new users to the production server. A new ticket can be opened here:
https://is.oregonstate.edu/td-service/virtual-servers

Access the production server at `walkthrough.eec.oregonstate.edu` using PuTTY or use any shell that supports SSH.

Once you have logged in perform the following commands to update the version being ran in production.
```
cd /webdev/EEC/deploy/eec-walkthrough-react/
```

Login with the shared walkthrough account
```
sudo -u walkthrough bash
```

Make sure you first kill any running processes or else you will not be able to use the ports that you want. Run a command to see what processes are running, then kill all node processes.
```
ps -a
kill 5823
```

You are now able to use git commands.
Once you have updated the repo to the current version you will need to build.
```
git pull
npm run build
```

Now you will use screen so that you can close the terminal without killing your process.
```
screen
npm start
```
Hold CTRL + A, and press D to exit your screen.

Now you can close your terminal and the web application should be running your newest version.


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
