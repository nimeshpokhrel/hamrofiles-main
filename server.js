const express = require("express")
const ejs = require("ejs")
const mongoose  = require("mongoose")
require("dotenv").config()

const { homeRoutes } = require("./routes/home")

const app = express()

app.use(express.urlencoded( {extended: true} ))

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Connected to DB!")
})

app.use(express.static('public'))

app.use(homeRoutes)

app.set("view engine", "ejs")

app.listen(process.env.PORT, () => {
    console.log(`Server running !!`)
})