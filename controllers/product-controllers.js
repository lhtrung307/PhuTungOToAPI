const ProductServices = require("../services/product-services");
const Boom = require("@hapi/boom");

module.exports.list = async (request, h) => {
  let query = request.query;
  let sortType;
  if (query.sort && (query.sort === "1" || query.sort === "-1")) {
    sortType = parseInt(query.sort);
  }
  try {
    const products = await ProductServices.getAllProducts(sortType);
    if (products) {
      return h.response(products).code(200);
    }
  } catch (error) {
    return h.response(error.message).code(500);
  }
};

module.exports.listByCategoryID = async (request, h) => {
  let categoryID = request.params.id;
  let query = request.query;
  let sortType;
  if (query.sort && (query.sort === "1" || query.sort === "-1")) {
    sortType = parseInt(query.sort);
  }
  try {
    const products = await ProductServices.getProductsByCategory(
      categoryID,
      sortType
    );
    if (products) {
      return h.response(products).code(200);
    }
  } catch (error) {
    return h.response(error.message).code(500);
  }
};

module.exports.detail = async (request, h) => {
  try {
    let productID = request.params.id;
    if (productID.length !== 24) {
      return Boom.badRequest("Invalid product id");
    }
    let product = await ProductServices.getProductDetail(productID);
    if (product == null) {
      return Boom.notFound("Product not found");
    } else {
      console.log(product);
      return h.response(product);
    }
  } catch (error) {
    h.response(error).code(500);
  }
};

module.exports.listByIDs = async (request, h) => {
  try {
    // let products = {
    //   productIDs: request.payload.productIDs,
    //   variants: request.payload.variants
    // };
    let products = request.payload;
    let productInfos = await ProductServices.getProductsForCreateOrder(
      products
    );
    if (productInfos == null) {
      return Boom.notFound("Cannot found any product");
    } else {
      return h.response(productInfos);
    }
  } catch (error) {
    return h.response(error.stack).code(500);
  }
};

// module.exports.bestSellers = async (request, h) => {
//   try {
//     let bestSellers = await ProductServices.getBestSellers();
//     let filtered = bestSellers.filter((item) => {
//       return item != null;
//     });
//     return h.response(filtered);
//   } catch (error) {
//     return h.response(error.message).code(500);
//   }
// };
