const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

// consider about address field, should we save address if don't have delivery system.
const CustomerRankSchema = new Schema(
  {
    type: {
      type: String,
      required: "Must have type of customer"
    },
    description: String
  },
  { versionKey: false }
);

const CustomerRankModel = Mongoose.model("customer-rank", CustomerRankSchema);

const getByID = (id) =>
  CustomerRankModel.find({ id })
    .then((customerRank) => customerRank)
    .catch((error) => {
      return { error };
    });

const getByEmail = (email) =>
  CustomerRankModel.findOne({ email })
    .then((customerRank) => customerRank)
    .catch((error) => {
      return { error };
    });

const save = (customerRank) =>
  CustomerRankModel.create(customerRank)
    .then((customerRank) => customerRank)
    .catch((error) => {
      return { error };
    });

module.exports = {
  CustomerRankSchema,
  CustomerRankModel,
  getByID,
  save,
  getByEmail
};
