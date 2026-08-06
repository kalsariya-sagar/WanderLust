const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.any(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required().trim(),
    category: Joi.string().required(),
    country: Joi.string().required().trim(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required().trim(),
  }).required(),
});