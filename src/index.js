const express = require('express')
const port = 3000
const path = require('path')
const PORT = process.env.PORT || 3000;
const route = require("./route")
const errorHandler = require("../middlewares/errorHandler");

const app = express()

app.use("/api/v2",route)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${port}`)
})