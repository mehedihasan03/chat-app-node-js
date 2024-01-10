//external imports
const express = require("express");
require("dotenv").config();
const { connectDatabase } = require("./middlewares/core/database");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();

connectDatabase();

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// error handling
// 404 handler
app.use(notFoundHandler);

// common handling
app.use(errorHandler);

// listen port
const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT, () => {
  console.log(`App Listening to port ${PORT}`);
});
