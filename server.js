const express = require("express");
const dotenv = require("dotenv").config();
const contactRouter = require("./routes/contactRoutes");
const userRouter = require('./routes/userRouter')
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 5000;
//importing database
require("./config/dbConnection");
//accessing body from request
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on server port ${PORT}`);
});
