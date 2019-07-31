const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const OrderPricingRuleSchema = new Schema(
  {
    fromDate: Date,
    toDate: Date,
    amount: {
      type: Number,
      required: "Order Pricing Rule must have amount to apply"
    },
    discountType: {
      type: String,
      enum: ["amount", "percentage"]
    },
    discount: {
      type: Number,
      required: "Order Pricing Rule must have discount"
    },
    condition: {
      type: Number,
      required: "Order pricing rule must have condition"
    }
  },
  { versionKey: false }
);

module.exports = Mongoose.model("order-pricing-rule", OrderPricingRuleSchema);
