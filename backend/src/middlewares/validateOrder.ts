import { celebrate, Joi, Segments } from 'celebrate';

const paymentMethods = ['card', 'online'];

const orderSchema = Joi.object({
  total: Joi.number().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  items: Joi.array().items(Joi.string()).min(1).required(),
  payment: Joi.string().valid(...paymentMethods).required(),
});

export default celebrate({ [Segments.BODY]: orderSchema });
