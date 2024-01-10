const bcrypt = require("bcrypt");
const { Person } = require("../model/person");
const { database } = require("../middlewares/core/database");

// get users page
function getUsers(req, res, next) {
  res.render("users");
}

async function addUser(req, res, next) {
  // let newUser;
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // if (req.files && req.files.length > 0) {
  // newUser = await new Person({
  //   ...req.body,
  //   avatar: req.files[0].filename,
  //   password: hashedPassword,
  // });
  // console.log(req.body.name);
  // } else {
  //   await new Person({
  //     ...req.body,
  //     password: hashedPassword,
  //   });
  // }
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

module.exports = {
  getUsers,
  addUser,
};
