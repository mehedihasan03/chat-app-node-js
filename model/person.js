// const { Sequelize, DataTypes } = require('sequelize');
// const { client } = require('../middlewares/core/database');

// const sequelize = new Sequelize(client)

// // Define the People model
// const Person = sequelize.define('Person', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     trim: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   mobile: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   avatar: {
//     type: DataTypes.STRING,
//   },
//   role: {
//     type: DataTypes.ENUM('admin', 'user'),
//     defaultValue: 'user',
//   },
// }, {
//   // Other options
//   timestamps: true,
// });

// // Synchronize the model with the database
// sequelize.sync()
//   .then(() => {
//     console.log('User table created');
//   })
//   .catch((err) => {
//     console.error('Error creating People table:', err);
//   });

// module.exports = Person;
