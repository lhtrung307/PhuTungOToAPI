const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: "Brand must have a name"
    },
    description: String
  },
  { versionKey: false }
);

const BrandModel = Mongoose.model("brand", BrandSchema);

const getAll = (sortType) =>
  BrandModel.find({})
    .sort(sortType)
    .then((brands) => brands)
    .catch((error) => {
      return { error };
    });

const save = (category) =>
  BrandModel.create(category)
    .then((createdBrand) => createdBrand)
    .catch((error) => {
      return { error };
    });

module.exports = {
  BrandSchema,
  BrandModel,
  getAll,
  save
};
