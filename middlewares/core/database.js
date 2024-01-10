const { Client } = require('pg');

const client = {
  // dialect: 'postgres',
  user: process.env.PG_USER_STRING,
  host: process.env.PG_HOST_STRING,
  database: process.env.PG_DATABASE_STRING,
  password: process.env.PG_PASSWORD_STRING,
  port: process.env.PG_PORT,
};

const database = new Client(client);

//   database connection
const connectDatabase = async () => {
  try {
    await database.connect();
    console.log("Database Connected!");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
};

// Another Database Connection

/*

function connectDatabase() {
  const client = new Client({
    user: process.env.PG_USER_STRING,
    host: process.env.PG_HOST_STRING,
    database: process.env.PG_DATABASE_STRING,
    password: process.env.PG_PASSWORD_STRING,
    port: process.env.PG_PORT,
  });

  // database connection
  client.connect(function (err) {
    if (err) {
      console.error("Error connecting to PostgreSQL database", err);
      throw err;
    }
    console.log("Database Connected!");
  });
}

*/

//   const createPeopleTableQuery = `
//   CREATE TABLE IF NOT EXISTS node.person (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     mobile VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     avatar VARCHAR(255),
//     role VARCHAR(10) DEFAULT 'user',
//     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//   )
// `;

// client.query(createPeopleTableQuery)
//     .then(() => console.log('People table created'))
//     .catch(error => console.error('Error creating People table:', error))
//     .finally(() => client.end());

module.exports = {
  connectDatabase,
  database,
  client,
};
