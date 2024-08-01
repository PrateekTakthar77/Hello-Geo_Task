const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const express = require("express");
const mongoConnect = require("./helpers/db");
const userRoutes = require("./routes/User.routes")
const errorReqRouter = require("./middlewares/errorRouteHandler");

//Connecting MongoDB
mongoConnect();
const app = express();
// parse REQ data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());

app.get("/", (req, res) => {
    res.send(`Welcome To Hello Geo Task Server managed by Prateek Takthar`);
});

// Routes
app.use('/api/v1', userRoutes); // Prefix all user routes with /api

//error handler -----
app.use(
    "/",
    (res, req, next) => {
        next();
    },
    errorReqRouter
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server Started on port: ", PORT);
});