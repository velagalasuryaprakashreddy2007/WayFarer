const Joi = require("joi")

module.exports.listingSchema = Joi.object(
    {
        listing : Joi.object({
            title:Joi.string().required(),
            description:Joi.string().required(),
            country:Joi.string().required(),
            location:Joi.string().required(),
            price:Joi.number().required().min(1),
            image:Joi.string().allow("",null),
            category:Joi.string().valid('mountains','houses','rooms','castles','pools','cities','tranding','camping','arctic','farms').required()
        }
    ).required()}
).required()

module.exports.reviewSchema = Joi.object(
    {
        review : Joi.object({
            rating:Joi.number().required().min(1).max(5),
            comment:Joi.string().required(),
        }).required()

}).required();