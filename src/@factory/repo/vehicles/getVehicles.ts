import { Op, where, col, literal } from 'sequelize';
import IConfig from '../utils/sequelize/Config';
import { IOptions as IGetAllOptions } from '../../models/interfaces/vehicles/getVehicles';

import {
    API_ROUTE_V1,
    USER_MODEL_VISIBLE_PROPERTIES,
    VEHICLE_MODEL_VISIBLE_PROPERTIES,
    VEHICLE_RENTAL_MODEL_VISIBLE_PROPERTIES
} from '../../../constants';
import { Paginate } from '../../../lib';
import { getPagingOffset } from '../../../helpers/util';

export default (config: IConfig) =>
    async ({ limit, page, filter }: IGetAllOptions): Promise<any> => {
        const { Rental, User, Vehicle, VariantValue } = config.models;

        const [pLimit, pOffset] = getPagingOffset(limit, page);

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { variant_value, status, rented_user_id, is_overdue } = filter || {};

        const whereOptions: Record<string, unknown> = {};
        const andWhere: any = [];
        const modelInclude = [];

        if (status) {
            whereOptions.status = status;
        }

        const options: any = {
            attributes: [...VEHICLE_MODEL_VISIBLE_PROPERTIES],
            where: whereOptions,
            limit: pLimit,
            offset: pOffset,
            include: [
                {
                    attributes: [...VEHICLE_RENTAL_MODEL_VISIBLE_PROPERTIES],
                    model: Rental,
                    as: 'vehicle_rentals',
                    where: { is_active: 1 },
                    required: false,
                    include: [
                        {
                            attributes: [...USER_MODEL_VISIBLE_PROPERTIES],
                            model: User,
                            as: 'customer',
                            required: false
                        }
                    ]
                }
            ],
            subQuery: false
        };

        if (variant_value) {
            modelInclude.push({
                model: VariantValue,
                as: 'vehicle_variant'
            });
            andWhere.push(
                where(col('vehicle_variant.variant_value'), {
                    [Op.like]: `%${variant_value}%`
                })
            );
        }

        if (rented_user_id) {
            andWhere.push(
                where(col('vehicle_rentals.user_id'), {
                    [Op.like]: `%${rented_user_id}%`
                })
            );
        }

        if (is_overdue) {
            andWhere.push(
                where(col('vehicle_rentals.is_active'), {
                    [Op.eq]: 1
                }),
                literal(`vehicle_rentals.planned_return_date < now()`)
            );
        }

        options.include = [...options.include, ...modelInclude];

        if (andWhere.length > 0) {
            options.where[Op.and] = andWhere;
        }

        const { count, rows } = await Vehicle.findAndCountAll(options)
            .then((r: any) => {
                return r;
            })
            .catch((error) => {
                throw error;
            });

        return Paginate({
            count,
            rows,
            baseUrl: `${API_ROUTE_V1}/artists`,
            offset: pOffset,
            limit: pLimit
        });
    };
