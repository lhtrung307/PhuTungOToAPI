const Joi = require("joi");

const ProductControllers = require("../controllers/product-controllers");
const ValidateHandle = require("./validate-handle");

const Router = {
  name: "product-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/products",
      options: {
        description: "Get list of products",
        tags: ["api", "products"]
        // response: ValidateHandle.responseOptions(
        //   ValidateHandle.pizzaResponseSchema
        // )
      },
      handler: ProductControllers.list
    });

    server.route({
      method: "GET",
      path: "/products/{id}",
      options: {
        validate: {
          params: { id: Joi.string().length(24) },
          failAction: ValidateHandle.handleValidateError
        },
        description: "Get product detail by id",
        tags: ["api", "products"],
        response: ValidateHandle.responseOptions(
          ValidateHandle.pizzaDetailResponseSchema
        )
      },
      handler: ProductControllers.detail
    });

    server.route({
      method: "POST",
      path: "/products",
      options: {
        validate: {
          payload: ValidateHandle.createProductResponse,
          failAction: ValidateHandle.handleValidateError
        },
        description: "Create products new product",
        tags: ["api", "products"]
        // response: ValidateHandle.responseOptions(
        //   ValidateHandle.pizzaResponseSchema
        // )
      },
      handler: ProductControllers.create
    });

    server.route({
      method: "POST",
      path: "/products",
      options: {
        validate: {
          payload: Joi.array()
            .items(
              Joi.object().keys({
                productID: Joi.string().required(),
                variants: Joi.array()
                  .items(
                    Joi.object().keys({
                      key: Joi.string().example("size"),
                      value: Joi.string().example("S")
                    })
                  )
                  .optional()
              })
            )
            .label("Body"),
          failAction: ValidateHandle.handleValidateError
        },
        description: "Get products by product ids",
        tags: ["api", "products"],
        response: ValidateHandle.responseOptions(
          ValidateHandle.listPizzaResponseSchema
        )
      },
      handler: ProductControllers.listByIDs
    });

    server.route({
      method: "GET",
      path: "/products/category/{id}",
      options: {
        validate: {
          params: {
            id: Joi.string().required()
          },
          failAction: ValidateHandle.handleValidateError
        },
        description: "Get products by category ids",
        tags: ["api", "products"]
        // response: ValidateHandle.responseOptions(
        //   ValidateHandle.pizzaResponseSchema
        // )
      },
      handler: ProductControllers.listByCategoryID
    });

    // server.route({
    //   method: "GET",
    //   path: "/best-sellers",
    //   options: {
    //     description: "Get list of best seller pizzas",
    //     tags: ["api", "pizza"]
    //     // response: ValidateHandle.responseOptions(
    //     //   ValidateHandle.pizzaResponseSchema
    //     // )
    //   },
    //   handler: ProductControllers.bestSellers
    // });
  }
};

module.exports = Router;
