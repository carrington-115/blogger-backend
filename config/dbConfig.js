require("dotenv").config({ path: "../.env" });
const { MongoClient } = require("mongodb");
const url = process.env.MONGO_DB_URL;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const session = client.startSession();

const connectDBConfig = async () => {
  session.startTransaction();
  try {
    await client.connect();
    console.log("The db client is connected");
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};

module.exports = { connectDBConfig, client };
