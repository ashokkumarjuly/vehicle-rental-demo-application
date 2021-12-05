/* istanbul ignore file */

import * as Joi from 'joi';
import { VEHICLE_STATUS } from '../../../constants';
const { ACTIVE, INACTIVE, DAMAGED, DELETED, RENTED } = VEHICLE_STATUS;

export const createSchema = Joi.object().keys({
    sku: Joi.string().max(36).required(),
    fuel_type_id: Joi.number().allow(1, 2).required(),
    vehicle_no: Joi.string().required(),
    hourly_rent: Joi.number().required(),
    daily_rent: Joi.number().required(),
    vehicle_variant_id: Joi.number().required(),
    vehicle_type: Joi.number().required(),
    model: Joi.string().max(100).required(),
    make: Joi.string().max(100).required()
});

export const updateSchema = Joi.object().keys({
    status: Joi.number().valid(ACTIVE, INACTIVE, DAMAGED, DELETED).required()
});

export const filterSchema = Joi.object().keys({
    limit: Joi.string().optional().allow(''),
    page: Joi.string().optional().allow(''),
    term: Joi.string().optional().allow(''),
    sort: Joi.object({
        vehicle_no: Joi.string().optional().allow('').allow(null)
    }),
    filter: Joi.object({
        variant_value: Joi.string().optional().allow('').allow(null),
        status: Joi.number().valid(ACTIVE, RENTED).optional().allow('').allow(null),
        rented_user_id: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null).allow('').optional(),
        is_overdue: Joi.boolean().optional().allow('').allow(null)
    })
});
