import mongoose from "mongoose";

export const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const users = [
  {
    _id: user1Id,
    name: "Admin User",
    email: "admin@gmail.com",
    password: "adminuser",
    isAdmin: true,
  },
  {
    _id: user2Id,
    name: "test1",
    email: "test1@gmail.com",
    password: "testtest1",
  },
  {
    _id: user3Id,
    name: "test2",
    email: "test2@gmail.com",
    password: "testtest2",
  },
];

export default users;
