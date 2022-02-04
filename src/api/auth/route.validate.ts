/* istanbul ignore file */

import * as Joi from 'joi';

const loginSchema = Joi.object().keys({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(100).required()
});
// .xor('username', 'email');

export { loginSchema };
