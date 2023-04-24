const mysql = require("mysql");
const config = require("./config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env].database;

const connection = mysql.createConnection(dbConfig);

module.exports = connection;


