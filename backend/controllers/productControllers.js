import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.mongoError(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    return res.json(foundProduct);
  } catch (error) {
    return res.mongoError(error);
  }
};
