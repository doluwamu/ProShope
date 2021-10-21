import Order from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  try {
    const order = await Order.find({});
    return res.json(order);
  } catch (error) {
    return res.mongoError(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      return res.json(order);
    } else {
      res.sendApiError({
        title: "Invalid data",
        detail: `Order not found`,
      });
    }
  } catch (error) {
    return res.mongoError(error);
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.sendApiError({
        title: "Invalid data",
        detail: `Order not found`,
      });
    }
  } catch (error) {
    return res.mongoError(error);
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    return res.mongoError(error);
  }
};

export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.sendApiError({
        title: "Missing data",
        detail: "No order items",
      });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    return res.mongoError(error);
  }
};
