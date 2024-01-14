const bcrypt = require("bcrypt");
const { database } = require("../middlewares/core/database");
const path = require("path");
const { unlink } = require("fs");

// get users page
async function getUsers(req, res, next) {
  try {
    const getUsersQuery = `select * from node.person;`;
    const result = await database.query(getUsersQuery, []);
    console.log(result.rows[0].avatar);
    res.render("users", { users: result.rows });
  } catch (error) {
    next(error.message);
  }
}

async function addUser(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let avatar = "";
    if (req.files && req.files.length > 0) {
      avatar = req.files[0].filename;
    }

    const addUserQuery = `
      INSERT INTO node.person (name, email, mobile, password, avatar, role)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const addUserValues = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      hashedPassword,
      avatar,
      "user", // Assuming role is set as 'admin' for new users
    ];

    const result = await database.query(addUserQuery, addUserValues);

    console.log(result);
    res.status(200).json({
      message: "User created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred : " + err.message,
        },
      },
    });
  }
}

async function deleteUser(req, res, next) {
  try {
    const deleteUserValues = [req.params.id];
    console.log(req.params.id);

    const findUserQuery = `
      select * FROM node.person WHERE id = $1
    `;

    const getResult = await database.query(findUserQuery, deleteUserValues);
    console.log(getResult);

    const deleteUserQuery = `
      DELETE FROM node.person WHERE id = $1
    `;

    const deleteResult = await database.query(
      deleteUserQuery,
      deleteUserValues
    );
    console.log(getResult);

    if (getResult.rows[0].avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/${getResult.rows[0].avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "could not delete user : " + err.message,
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
};
