const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Product must have name"
    },
    description: String,
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "category"
    },
    brandID: {
      type: Schema.Types.ObjectId,
      ref: "brand"
    },
    price: Number,
    image: {
      type: String
    },
    quantity: Number
  },
  { versionKey: false }
);

const ProductModel = Mongoose.model("product", ProductSchema);

const getAllProducts = (sortType) =>
  ProductModel.find()
    .sort(sortType)
    .then((products) => products)
    .catch((error) => {
      return { error };
    });

const getProductByID = (productID) =>
  ProductModel.findById(productID)
    .then((product) => product)
    .catch((error) => {
      return { error };
    });

const getProductsByCategoryID = (categoryID, sortType) => {
  return ProductModel.find({ categoryIDs: categoryID })
    .sort(sortType)
    .then((product) => product)
    .catch((error) => {
      return { error };
    });
};

const createProduct = (product) => 
  ProductModel.create(product)
    .then(createProduct => createProduct)
    .catch(error => { return {error}})

const getProductForOrder = (productID) =>
  ProductModel.findById(productID)
    .select("")
    .then((product) => product)
    .catch((error) => {
      return { error };
    });

const updateByID = (id, updateInfo) =>
  ProductModel.update({ _id: id }, updateInfo, { new: true })
    .then((product) => product)
    .catch((error) => {
      return { error };
    });

const updateProducts = (listID, updateInfo) =>
  ProductModel.updateMany({ _id: { $in: listID } }, updateInfo, { new: true })
    .then((products) => products)
    .catch((error) => {
      return { error };
    });

// const deleteProducts = (listID) => {
//   ProductModel.deleteMany({ _id: { $in: listID } })
//     .then((products) => products)
//     .catch((error) => {
//       return { error };
//     });
// };

module.exports = {
  ProductSchema,
  ProductModel,
  getAllProducts,
  getProductByID,
  getProductsByCategoryID,
  updateByID,
  updateProducts,
  createProduct
};
