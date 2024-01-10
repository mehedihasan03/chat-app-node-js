const bcrypt = require("bcrypt");
const { Person } = require("../model/person");
const { database } = require("../middlewares/core/database");

// get users page
function getUsers(req, res, next) {
  res.render("users");
}

async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // if (req.files && req.files.length > 0) {
  //   newUser = await new Person({
  //     ...req.body,
  //     avatar: req.files[0].filename,
  //     password: hashedPassword,
  //   });
  // } else {
  //   await new Person({
  //     ...req.body,
  //     password: hashedPassword,
  //   });
  // }
  try {
    const result = await database.query(
      "insert into node.person (name, email, mobile, password, avatar, role) values ( 'mehedi', 'mehe3di@gmail.com', '+8801621640057', 'mehedi', 'mehedi.jpg', 'admin');"
    );

    console.log(" result is : " + result.toString());
    res.status(200).json({
      message: "User created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred : " + err,
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  addUser,
};
