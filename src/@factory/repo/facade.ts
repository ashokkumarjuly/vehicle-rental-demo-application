/* istanbul ignore file */

import Db, { ModelDbInterface } from './Db';

import sequelizeDb from './utils/sequelize/facade';
import sequelizeConnection from '../models/sequelize/config';
import * as sequelizeModels from '../models/sequelize';
import logger from '../../logger';

interface IConfig {
    readonly modelDb_ORM_NAME: string;
}

const modelDbFactory = (name: string): ModelDbInterface => {
    switch (name) {
        default:
        case 'sequelize':
            return sequelizeDb({
                sequelizeInstance: sequelizeConnection,
                models: sequelizeModels,
                logger
            });
    }
};

export default (config: IConfig): Db => ({
    ...modelDbFactory(config.modelDb_ORM_NAME)
});
