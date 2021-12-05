import { Sequelize } from 'sequelize';
import APP_CONFIG from '../../../@core/app.config';

// Establish Sequelize connection
const { database, username, password, connectionOptions } = APP_CONFIG.modelDb.sequelize;
const sequelizeConnection: Sequelize = new Sequelize(database, username, password, {
    ...connectionOptions
});

export default sequelizeConnection;
