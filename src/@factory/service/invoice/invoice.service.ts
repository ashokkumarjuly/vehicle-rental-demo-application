import IConfig from '../Config';
import { ICreateInvoiceSignature } from '../../models/interfaces';

export const createInvoice =
    (config: IConfig): ICreateInvoiceSignature =>
    async (options) => {
        try {
            const { data, loggedInUser } = options;

            const result = await config.db.createInvoice({ data, loggedInUser });

            return result;
        } catch (error) {
            config.logger.error({
                fn: 'createInvoice',
                type: 'Service output',
                resp: 'error',
                err: error
            });

            throw error;
        }
    };
