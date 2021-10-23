const express = require("express")
const PORT = 8080
const app = express()
app.use("/", require("./servers/index.js"))
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
