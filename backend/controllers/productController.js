import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.sendApiError({
        title: "Invalid data",
        detail: "Product not found",
      });
    }

    const owner = await User.findById(product.user);
    if (req.user.id !== owner.id) {
      return res.sendApiError({
        title: "Unauthorized user",
        detail: "This product isn't yours",
      });
    }

    await product.remove();
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.mongoError(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.mongoError(error);
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, description, brand, image, category, countInStock } =
    req.body;
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.sendApiError({
        title: "Invalid data",
        detail: "Product not found",
      });
    }

    const owner = await User.findById(product.user);
    if (req.user.id !== owner.id) {
      return res.sendApiError({
        title: "Unauthorized user",
        detail: "This product isn't yours",
      });
    } else {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.description = description;

      const updatedProduct = await product.save();
      return res.json(updatedProduct);
    }
  } catch (error) {
    return res.mongoError(error);
  }
};

export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.sendApiError({
        title: "Invalid data",
        detail: "Product not found",
      });
    } else {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res.sendApiError({
          title: "Already reviewed",
          detail: "Product already reviewed",
        });
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      return res.status(201).json({ message: "Review added" });
    }
  } catch (error) {
    return res.mongoError(error);
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    return res.json(products);
  } catch (error) {
    return res.mongoError(error);
  }
};
