const express = require("express")
const router = express.Router()
const { getseriesList } = require("./api/test")
const getCategoryList = require("./function/getCategoryList")
const config = require("../config")
require("./utils/mongoose")
const TestModel = require("./models/test")
router.get("/api/getCategoryList", async (req, res) => {
  try {
    let list = await getCategoryList()
    res.send({
      code: 1,
      list,
    })
  } catch (error) {
    res.send({
      code: 0,
      msg: error,
    })
  }
})

//year,state params
router.get("/api/getseriesByState", async (req, res) => {
  let { year, state } = req.query
  try {
    let Categorylist = await getCategoryList()
    let series_id = Categorylist.filter((item) => item.name == state)[0].series_id
    let list = await getseriesList({ api_key: config.api_key, series_id })
    let item = list.series[0].data.filter((item) => item[0] == year)[0][1]
    res.send({
      code: 1,
      num: item,
    })
  } catch (error) {
    res.send({
      code: 0,
      msg: error,
    })
  }
})

//from,to,state params
router.get("/api/getPaynum", async (req, res) => {
  let { from, to, state } = req.query
  try {
    let Categorylist = await getCategoryList()
    let series_id = Categorylist.filter((item) => item.name == state)[0].series_id
    let list = await getseriesList({ api_key: config.api_key, series_id })
    list = list.series[0].data.filter((item) => from <= Number(item[0]) && Number(item[0]) <= to)
    let paynum = list.map((item) => item[1]).reduce((a, b) => Number(a) + Number(b))
    res.send({
      code: 1,
      num: paynum,
    })
  } catch (error) {
    res.send({
      code: 0,
      msg: error,
    })
  }
})

router.get("/api/getHighMsgByMongo", async (req, res) => {
  let { from, to } = req.query
  try {
    const data = await TestModel.getAll()
    let newArr = []
    data.forEach((item, index) => {
      let obj = {}
      let total = item.series[0].data
        .filter((item) => from <= Number(item[0]) && Number(item[0]) <= to)
        .map((item) => item[1])
        .reduce((a, b) => Number(a) + Number(b))
      obj.total = total
      obj.name = item.series[0].name.replace("Electric power carbon dioxide emissions, coal, ", "")
      newArr.push(obj)
    })
    newArr = newArr.sort((a, b) => b.total - a.total)
    res.send({ code: 1, city: newArr[0] })
  } catch (error) {
    res.send({
      code: 0,
      msg: error,
    })
  }
})
module.exports = router
