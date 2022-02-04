/* istanbul ignore file */

import * as JoiBase from 'joi';
import JoiDate from '@joi/date';
import { RENT_TYPE } from '../../../constants';

const Joi = JoiBase.extend(JoiDate);

export const createSchema = Joi.object().keys({
    vehicle_id: Joi.number().required(),
    user_id: Joi.number().required(),
    planned_start_date: Joi.date().format('YYYY-MM-DDTHH:mm:ss.SSSZ').required(),
    actual_start_date: Joi.date().format('YYYY-MM-DDTHH:mm:ss.SSSZ').required(),
    planned_return_date: Joi.date().format('YYYY-MM-DDTHH:mm:ss.SSSZ').min(Joi.ref('planned_start_date')).required(),
    actual_return_date: Joi.date()
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
        .min(Joi.ref('actual_start_date'))
        .allow(null)
        .allow('')
        .optional(),
    initial_amount: Joi.number().required(),
    rent_type: Joi.number().valid(RENT_TYPE.HOURLY, RENT_TYPE.DAILY).required()
});
