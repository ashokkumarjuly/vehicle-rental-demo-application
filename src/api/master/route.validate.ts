/* istanbul ignore file */

/* eslint-disable import/prefer-default-export */
import * as Joi from 'joi';
// const Extension = require('@hapi/joi-date');

export const filterSchema = Joi.object().keys({
    limit: Joi.string().optional().allow(''),
    page: Joi.string().optional().allow(''),
    term: Joi.string().optional().allow('')
});
