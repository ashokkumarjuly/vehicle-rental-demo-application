/* istanbul ignore file */

import IConfig from '../../utils/sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    return Promise.resolve(config.sequelizeInstance.drop());
};
