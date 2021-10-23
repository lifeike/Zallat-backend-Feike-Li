const { getCategory } = require("../api/test")
const config = require("../../config")

async function getCategoryList() {
  let list = await getCategory({ api_key: config.api_key, category_id: "2251609" })
  list.category.childseries.forEach((item, index) => {
    list.category.childseries[index].name = item.name.replace("Electric power carbon dioxide emissions, coal, ", "")
  })
  return list.category.childseries
}
module.exports = getCategoryList
