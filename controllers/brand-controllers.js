const BrandServices = require("../services/brand-services");
const Boom = require("@hapi/boom");

module.exports.list = async (request, h) => {
  let query = request.query;
  let sortType;
  if (query.sort && (query.sort === "1" || query.sort === "-1")) {
    sortType = query.sort;
  }
  try {
    const brands = await BrandServices.getAllBrands(sortType);
    if (brands) {
      return h.response(brands).code(200);
    }
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports.create = async (request, h) => {
  let brand = request.payload;
  try {
    const createdBrand = await BrandServices.createBrand(brand);
    console.log(createdBrand);
    return h.response(createdBrand).code(200);
  } catch (error) {
    console.log(error.stack);
    return Boom.badImplementation(error);
  }
};
