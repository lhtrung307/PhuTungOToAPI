const Brands = require("../models/brand");

class BrandServices {
  async getAllBrands(sortType) {
    let sort;
    if (!sortType && (sortType !== "1" || sortType !== "-1")) {
      sort = {};
    } else {
      sort = { name: sortType };
    }
    let brands = await Brands.getAll(sort);
    if (brands.error) {
      throw brands.error;
    }
    return brands;
  }

  async createBrand(brand) {
    let createdBrand = await Brands.save(brand);
    if (createdBrand.error) {
      throw createdBrand.error;
    }
    return createdBrand;
  }
}

module.exports = new BrandServices();
