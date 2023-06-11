const express = require('express')
const bodyparser = require("body-parser")
const app = express()
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


app.use("/api/user", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoutes)



app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("server run on 3000 PORT.");
})