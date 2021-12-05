import IConfig from '../Config';
import { ICreateVehicletSignature, IGetVehiclesSignature, IUpdateVehicleSignature } from '../../models/interfaces';

export const createVehicle =
    (config: IConfig): ICreateVehicletSignature =>
    async (options) => {
        try {
            const { data, loggedInUser } = options;

            return await config.db.createVehicle({ data, loggedInUser });
        } catch (error) {
            config.logger.error({
                fn: 'createVehicle',
                type: 'Service output',
                resp: 'error',
                err: error
            });

            throw error;
        }
    };
export const updateVehicle =
    (config: IConfig): IUpdateVehicleSignature =>
    async (options) => {
        const { data, uid, loggedInUser } = options;

        return config.db.updateVehicle({ uid, data, loggedInUser });
    };

export const getVehicles =
    (config: IConfig): IGetVehiclesSignature =>
    async ({ limit, page, term, sort, filter }) =>
        config.db.getVehicles({
            limit,
            page,
            term,
            sort,
            filter
        });
