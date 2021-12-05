import IConfig from '../Config';
import { ICreateRentalSignature } from '../../models/interfaces';

export const createRental =
    (config: IConfig): ICreateRentalSignature =>
    async (options) => {
        try {
            const { data, loggedInUser } = options;

            return await config.db.createRental({ data, loggedInUser });
        } catch (error) {
            config.logger.error({
                fn: 'createRental',
                type: 'Service output',
                resp: 'error',
                err: error
            });

            throw error;
        }
    };
