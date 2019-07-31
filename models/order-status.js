const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

// consider about address field, should we save address if don't have delivery system.
const OrderStatusSchema = new Schema(
  {
    status: {
      type: String,
      required: "Must have order status"
    },
    description: String
  },
  { versionKey: false }
);

const OrderStatusModel = Mongoose.model("order-status", OrderStatusSchema);

const getByID = (id) =>
  OrderStatusModel.find({ id })
    .then((orderStatus) => orderStatus)
    .catch((error) => {
      return { error };
    });

const getByEmail = (email) =>
  OrderStatusModel.findOne({ email })
    .then((orderStatus) => orderStatus)
    .catch((error) => {
      return { error };
    });

const save = (orderStatus) =>
  OrderStatusModel.create(orderStatus)
    .then((orderStatus) => orderStatus)
    .catch((error) => {
      return { error };
    });

module.exports = {
  OrderStatusSchema,
  OrderStatusModel,
  getByID,
  save,
  getByEmail
};
