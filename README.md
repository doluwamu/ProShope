## Available Scripts

In the project directory, you can run:

### `npm run client`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run server`

Runs the server on any port specified in the `.env` file in the root directory or in the `server.js` file in the backend folder

### `.env` file

Create a `.env` file in the root directory of the project with content of the following

```
PORT = Port number you want your app to run on
DB_URI = Your mongoDB connection string
JWT_SECRET = json-web-token secret(Could be anything unique such as: ftihuidhre)
PAYPAL_CLIENT_ID = Your PayPal client ID
```

## For more scripts you can run, go into the frontend folder and find the `README.md` file.
