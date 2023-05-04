const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "database",
  port: 5432,
});

db.connect((err) => {
  if (err) {
    console.log("db connection error", err);
  } else {
    console.log("berhasil");
  }
});

module.exports = db