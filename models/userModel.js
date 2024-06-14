const { ObjectId } = require("mongodb");
const { client } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const session = client.startSession();
const accountCollection = client.db("users").collection("accounts");

const findUserByUsername = async (username) => {
  session.startTransaction();
  try {
    const user = await accountCollection.findOne({ username: username });
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
  } finally {
    await session.endSession();
  }
};
const findUserById = async (userId) => {
  session.startTransaction();
  try {
    const user = await accountCollection.findOne({ _id: new ObjectId(userId) });
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
  } finally {
    await session.endSession();
  }
};
const createUser = async (username, password) => {
  session.startTransaction();
  try {
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await accountCollection.insertOne({
      username,
      encryptedPassword,
    });

    return user?.insertedId;
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
  } finally {
    await session.endSession();
  }
};

module.exports = { findUserByUsername, findUserById, createUser };
