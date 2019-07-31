const Mongooose = require("mongoose");

const Schema = Mongooose.Schema;

const OrderSchema = new Schema(
  {
    orderPricingRuleID: {
      type: Schema.Types.ObjectId,
      ref: "order-pricing-rule"
    },
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: "Must have customer id"
    },
    date: {
      type: Date,
      default: Date.now()
    },
    total: {
      type: Number,
      required: "Must have total"
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "order-status",
      required: "Must have order status"
    }
  },
  { versionKey: false }
);

const OrderModel = Mongooose.model("order", OrderSchema);

const save = (order) => OrderModel.create(order);

const getByDate = (date) =>
  OrderModel.aggregate([
    { $match: { date: { $gte: new Date(date) } } },
    {
      $lookup: {
        from: "order-details",
        localField: "_id",
        foreignField: "orderID",
        as: "orderDetails"
      }
    },
    { $unwind: "$orderDetails" },
    { $match: { "orderDetails.type": "pizza" } },
    {
      $group: {
        _id: "$orderDetails.productID",
        quantity: { $sum: "$orderDetails.quantity" }
      }
    }
  ])
    .sort({ quantity: -1 })
    .limit(5)
    .then((result) => result)
    .catch((error) => {
      return { error };
    });

const getAllOrdersByCustomerID = (customerID) =>
  OrderModel.aggregate([
    { $match: { customerID: Mongooose.Types.ObjectId(customerID) } },
    {
      $lookup: {
        from: "order-details",
        localField: "_id",
        foreignField: "orderID",
        as: "orderDetails"
      }
    },
    { $project: { "orderDetails.orderID": 0 } }
  ])
    .then((result) => result)
    .catch((error) => {
      return { error };
    });

module.exports = {
  OrderSchema,
  OrderModel,
  save,
  getByDate,
  getAllOrdersByCustomerID
};
