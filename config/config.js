
require('dotenv').config()


const {
MYSQL_HOST,
MYSQL_USER,
MYSQL_PASSWORD,
MYSQL_DBNAME,
MYSQL_DIALECT }= process.env

module.exports ={
  "development": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": MYSQL_DIALECT
  },
  "test": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": MYSQL_DIALECT
  },
  "production": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": MYSQL_DIALECT
  }
}
