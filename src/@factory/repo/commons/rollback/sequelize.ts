/* istanbul ignore file */

import IConfig from '../../utils/sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    await Promise.resolve(config.sequelizeInstance.dropAllSchemas({ logging: false }));
};
