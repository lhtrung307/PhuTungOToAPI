const CustomerControllers = require('../controllers/customer-controllers');
const Joi = require('@hapi/joi');
const validateHandle = require('./validate-handle');

const Router = {
  name: 'customer-router',
  version: '1.0.0',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/signup',
      options: {
        validate: {
          payload: Joi.object().keys({
            email: Joi.string()
              .email()
              .required(),
            phone: Joi.string()
              .regex(/^[0-9]+$/, 'phone numbers')
              .required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            dob: Joi.date().required(),
            customerRank: Joi.string().optional()
          }),
          failAction: (request, h, error) => {
            if (
              error.isJoi &&
              error.details[0].message.includes('phone numbers')
            ) {
              return h.response('Phone cannot contains characters').takeover();
            }
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        description: 'Create new customer account',
        tags: ['api', 'customer'],
        response: validateHandle.responseOptions(validateHandle.signupSchema)
      },
      handler: CustomerControllers.signUp
    });

    server.route({
      method: 'POST',
      path: '/login',
      options: {
        validate: {
          payload: Joi.object().keys({
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string().required()
          }),
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        description: 'Login',
        tags: ['api', 'customer'],
        response: validateHandle.responseOptions(
          validateHandle.customerSchema,
          {
            401: {
              statusCode: 401,
              error: 'Unauthorized',
              message: 'Email or password is wrong'
            }
          }
        )
      },
      handler: CustomerControllers.login
    });
  }
};

module.exports = Router;
