const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      required: "Customer must have email address."
    },
    phone: {
      type: String,
      required: "Customer must have phone number"
    },
    name: {
      type: String,
      required: "Customer must have name"
    },
    password: {
      type: String,
      required: "Customer must have password"
    },
    dob: {
      type: Date,
      required: "Customer must have birthday"
    },
    customerRank: {
      type: Schema.Types.ObjectId,
      ref: "customer-rank",
      required: "Customer must have customer rank"
    }
  },
  { versionKey: false }
);

const CustomerModel = Mongoose.model("customer", CustomerSchema);

const getByID = (id) =>
  CustomerModel.find({ id })
    .then((customer) => customer)
    .catch((error) => {
      return { error };
    });

const getByEmail = (email) =>
  CustomerModel.findOne({ email })
    .then((customer) => customer)
    .catch((error) => {
      return { error };
    });

const save = (customer) =>
  CustomerModel.create(customer)
    .then((customer) => customer)
    .catch((error) => {
      return { error };
    });

module.exports = {
  CustomerSchema,
  CustomerModel,
  getByID,
  save,
  getByEmail
};
