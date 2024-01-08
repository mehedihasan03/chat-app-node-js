//external imports
const express = require("express");
const dotenv = require("dotenv");
const { Client } = require('pg');
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const {notFoundHandler, errorHandler} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();
dotenv.config();

const client = new Client({
    user: process.env.PG_USER_STRING,
    host: process.env.PG_HOST_STRING,
    database: process.env.PG_DATABASE_STRING,
    password: process.env.PG_PASSWORD_STRING,
    port: process.env.PG_PORT,
  })

  // database connection
  client.connect(function(err) {
    if (err) {
        console.error('Error connecting to PostgreSQL database', err);
        throw err;
        
    }
    console.log("Database Connected!");
  });

  // request parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// error handling
// 404 handler
app.use(notFoundHandler);

// common handling
app.use(errorHandler);

// listen port
app.listen(process.env.PORT, () => {
    console.log(`App Listening to port ${process.env.PORT}`)
});
