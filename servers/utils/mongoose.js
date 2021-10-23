const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://feeco:codetest@cluster0.de2gw.mongodb.net/HRZallat?retryWrites=true&w=majority", { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("connect error"));
module.exports = mongoose