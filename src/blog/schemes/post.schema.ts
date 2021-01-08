const Joi = require('@hapi/joi');

const tagSchema = Joi.object().keys({
    title: Joi.string(),
    href: Joi.string(),
});

export const PostSchema = Joi.object().keys({
    categories: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(tagSchema),
    image: Joi.string().required(),
    author: Joi.string(),
    title: Joi.string().required(),
    contentHtml: Joi.string().required(),
});