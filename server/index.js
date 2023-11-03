// Importing Modules
const express = require('express');
require("dotenv").config();
const cors = require('cors');
const {json, urlencoded} = express;
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
//-----------------
const app = express();

// PORT
const port = process.env.PORT || 4050;

//Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
// Routes
const UserRoutes = require('./routes/userRoutes');
app.use('/',UserRoutes);

//Listener
const server = app.listen(port , ()=> {
    console.log(`Server is running on port - ${port}`);
});
