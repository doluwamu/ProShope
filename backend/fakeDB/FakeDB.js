import products from "./data/products.js";
import users from "./data/users.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

class FakeDB {
  async deleteData() {
    try {
      await Order.deleteMany({});
      await Product.deleteMany({});
      await User.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async addData() {
    try {
      await Product.create(products);
      await User.create(users);
    } catch (error) {
      console.log(error);
    }
  }

  async populate() {
    await this.deleteData();
    await this.addData();
  }
}

const fakeDB = new FakeDB();

export default fakeDB;
