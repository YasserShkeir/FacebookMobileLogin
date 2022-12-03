const mongoose = require("mongoose");

const tasksExample = [
  {
    title: "Task 1",
    description: "Task 1 description",
    date: "2020-01-01",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Task 2",
    description: "Task 2 description",
    date: "2020-01-02",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Task 3",
    description: "Task 3 description",
    date: "2020-01-03",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Task 4",
    description: "Task 4 description",
    date: "2020-01-04",
    image: "https://picsum.photos/200/300",
  },
];

const userSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: "Name is required",
  },
  dateOfBirth: {
    type: Date,
    required: "Date of birth is required",
  },
  imageURL: {
    type: String,
    required: "Image URL is required",
  },
  tasks: [tasksExample],
});

module.exports = mongoose.model("User", userSchema);
