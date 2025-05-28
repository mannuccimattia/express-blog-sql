const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "db_blog"
});

connection.connect((err) => {
  if (err) { console.log(err) }
  else { console.log(`Connected to mySQL database`) }
});

module.exports = connection;