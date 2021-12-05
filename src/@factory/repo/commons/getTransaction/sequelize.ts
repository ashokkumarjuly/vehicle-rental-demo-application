import { Transaction } from 'sequelize';
import IConfig from '../../utils/sequelize/Config';

export default (config: IConfig) => {
    return async (): Promise<Transaction> => {
        return config.sequelizeInstance.transaction();
    };
};
