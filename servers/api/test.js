const request = require("../utils/request")

module.exports.getCategory = function getCategoryList(params) {
  return request({
    url: `/category`,
    method: "get",
    params,
  })
}
module.exports.getseriesList = function getseriesList(params) {
  return request({
    url: `/series`,
    method: "get",
    params,
  })
}
