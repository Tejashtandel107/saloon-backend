require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const routes = require('./routes/route')
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const  createAdmin  = require("./seed");

const app = express();
connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // createAdmin();
  console.log(`${process.env.APP_NAME} running on port ${PORT}`);
});