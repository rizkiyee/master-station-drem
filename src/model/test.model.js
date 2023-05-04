const db = require("../../helper/connection");

const testModel = {
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *
          FROM tabletest`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  add: ({ id, nama, umur }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO tabletest (id, nama, umur) VALUES ('${id}','${nama}','${umur}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ id, nama, umur });
          }
        }
      );
    });
  },
}


module.exports = testModel;