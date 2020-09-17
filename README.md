This application is a wiki that allows users to browse, edit, and review
content pages. The application uses Node.js, express, React, and MySQL.

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

SQL_USER: The username to connect to the SQL server with.

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

### `ssl certificate`

If you plan to run this application in production mode you will need to include
a certificate and private key file in the root directory. The files should be name
`walkthrough.cer` and `walkthrough.key` respectively.

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
"# eec-walkthrough-react" 
