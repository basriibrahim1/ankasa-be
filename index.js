const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./src/routes/mainRoutes");
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/", mainRoutes);

app.use("/img", express.static("./tmp"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server are ready to use",
  });
});

app.listen(port, () => {
  console.log(`You are connected to port: ${port}`);
});
