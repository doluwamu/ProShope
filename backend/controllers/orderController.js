import Order from "../models/orderModel.js";

// Request type: GET
// To: /api/v1/orders/:id
// Desc: to get an order by its id
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

// Request type: PUT
// To: /api/v1/orders/:id/pay
// Desc: to update a particular order's paid status
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

// Request type: PUT
// To: /api/v1/orders/:id/deliver
// Desc: to update a particular order's delivered status (Admins only)
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
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

// Request type: GET
// To: /api/v1/orders/myorders
// Desc: to get a user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    return res.mongoError(error);
  }
};

// Request type: GET
// To: /api/v1/orders/
// Desc: to get all orders from DB (Admins only)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    return res.mongoError(error);
  }
};

// Request type: POST
// To: /api/v1/orders/
// Desc: to add an order
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
