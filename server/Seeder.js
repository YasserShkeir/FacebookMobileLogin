const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/user.model");

// Database linked successfully to cloud
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database error: ", err);
  });

console.log("seeding database...");

const seedTasks = [{}];

const seedDB = async () => {
  await mainCategory.deleteMany({});
  for (const task of seedTasks) {
    await mainCategory.create(seed);
  }
};

seedDB().then(() => {
  console.log("Database Seeded");
  mongoose.connection.close();
});
