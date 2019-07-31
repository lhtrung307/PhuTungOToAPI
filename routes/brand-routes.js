const BrandControllers = require("../controllers/brand-controllers");
const Joi = require("@hapi/joi");
const ValidateHandle = require("./validate-handle");

const Router = {
  name: "brand-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/brands",
      options: {
        // response: ValidateHandle.responseOptions(
        //   ValidateHandle.categoryResponseSchema
        // ),
        description: "Get list of brands",
        tags: ["api", "brands"]
      },
      handler: BrandControllers.list
    });

    server.route({
      method: "POST",
      path: "/brands",
      options: {
        validate: {
          payload: Joi.object()
            .keys({
              name: Joi.string().required(),
              description: Joi.string().required()
            })
            .label("Body"),
          failAction: ValidateHandle.handleValidateError
        },
        description: "Create new brand",
        tags: ["api", "brands"]
        // response: ValidateHandle.responseOptions(
        //   ValidateHandle.createdCategoryResponseSchema
        // )
      },
      handler: BrandControllers.create
    });
  }
};

module.exports = Router;
