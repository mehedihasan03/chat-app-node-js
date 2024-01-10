const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
const { database } = require("../core/database");

const addUserValidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await database.query(
          "select * from node.person where email = $1",
          [value]
        );
        if (user) {
          throw createHttpError("Email already in use..!");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await database.query(
          "select * from node.person where email = $1",
          [value]
        );
        if (user) {
          throw createHttpError("Mobile already is use!");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length == 0) {
    next();
  } else {
    // removed upload file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    // response the error
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidator,
  addUserValidationHandler,
};
