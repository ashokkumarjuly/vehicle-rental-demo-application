/* istanbul ignore file */

/* eslint-disable import/prefer-default-export */
import * as Joi from 'joi';
import { APP_ROLES } from '../../../constants';

export const createSchema = Joi.object().keys({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    role_id: Joi.number().valid(APP_ROLES.CUSTOMER.id).required(),
    customer_preferred_size: Joi.number().optional(),
    phone_code: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null).allow('').optional(),
    phone_no: Joi.string().length(10).regex(/^\d+$/),
    address: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null).allow('').optional(),
    city: Joi.string().max(60).optional(),
    state: Joi.string().max(60).optional(),
    country: Joi.string().max(60).optional(),
    zip_code: Joi.alternatives().try(Joi.number(), Joi.string().max(10)).allow(null).allow('').optional(),
    wallet_amount: Joi.number().required()
});

export const filterSchema = Joi.object().keys({
    limit: Joi.string().optional().allow(''),
    page: Joi.string().optional().allow(''),
    term: Joi.string().optional().allow('')
});
