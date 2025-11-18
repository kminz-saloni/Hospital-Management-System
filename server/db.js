const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@Vishantsql45",   // <-- change this
  database: "hospital_db"
});

module.exports = pool;
