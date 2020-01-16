const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const dotenv = require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0-jnr0e.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.listen(process.env.PORT);
app.use(express.json())
app.use(routes)

