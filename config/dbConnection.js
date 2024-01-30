const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

module.exports = connectToDb;
