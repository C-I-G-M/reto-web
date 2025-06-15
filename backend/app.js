const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { poolPromise } = require('./db');

require('dotenv').config();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/signup", require("./routes/signup"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/login"));
app.use("/api/refreshtoken", require("./routes/refreshtoken"));


app.get('/', async (req,res)=>
    {res.send('hello world!'); 

    });

    app.listen(port,() => {
        console.log(`server is running on port: ${port}`);
    });
    