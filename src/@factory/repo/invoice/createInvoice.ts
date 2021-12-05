import IConfig from '../utils/sequelize/Config';
import { IInvoiceAttributes } from '../../models/interfaces/invoices';
import { IOptions as ICreate } from '../../models/interfaces/invoices/createInvoice';

export default (config: IConfig) =>
    async ({ data, loggedInUser }: ICreate): Promise<IInvoiceAttributes> => {
        const transaction = await config.sequelizeInstance.transaction();
        try {
            const { Invoice } = config.models;

            const dbInput = { ...data };
            const result = await Invoice.create(dbInput, { transaction });

            await transaction.commit();
            return result;
        } catch (error) {
            // always rollback
            await transaction.rollback();
            throw error;
        }
    };
