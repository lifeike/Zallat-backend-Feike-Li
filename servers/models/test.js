const mongoose = require("../utils/mongoose")

const schema = mongoose.Schema({
  request: Object,
  series: Array,
})

schema.statics.getAll = function () {
  return this.model("test").find().exec()
}

const model = mongoose.model("test", schema)
module.exports = model
