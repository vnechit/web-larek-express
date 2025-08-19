import { celebrate, Joi, Segments } from 'celebrate';

const imageSchema = Joi.object({
  fileName: Joi.string().required(),
  originalName: Joi.string().required(),
});

const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
  image: imageSchema.required(),
});

export default celebrate({ [Segments.BODY]: productSchema });
