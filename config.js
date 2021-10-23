const pathlib = require("path")

module.exports = {
  //basic
  baseURL:'https://api.eia.gov',
  api_key:'f8c39d1a3ce44b9772f00aa5ad65de14',
  port: 8080,
  imgDir: pathlib.resolve("assets/"),
  cssDir: pathlib.resolve("src/"),
  //database
  db_host: "localhost",
  db_port: 3306,
  db_user: "root",
  db_pass: "root",
  db_name: "root",
}
