/* istanbul ignore file */

import * as Joi from 'joi';

export const createSchema = Joi.object().keys({
    email: Joi.string().email().max(100).required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    dob: Joi.string().required(),
    birth_place: Joi.string().required(),
    genre: Joi.array().min(1).required(),
    genre_other: Joi.string().optional()
});
