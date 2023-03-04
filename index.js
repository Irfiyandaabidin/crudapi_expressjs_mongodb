const express = require('express');
const cors = require("cors")
const { default: mongoose } = require('mongoose');
const router = require('./router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8000;

app.listen(PORT, async () => {
    console.log(`Server run in ${PORT}`)
});


app.use(router);

mongoose
    .connect("mongodb://localhost:27017/todo_db",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err)
    })