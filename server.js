const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const connectToDb = require("./config/dbConnection");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

connectToDb();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(errorHandler);
app.use("/api/v1/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
