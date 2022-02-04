import APP_CONFIG from '../../src/@core/app.config';
// import sequelizeConnection from '../../src/@factory/models/sequelize/config';
// import * as models from '../../src/@factory/models/sequelize';

module.exports = async () => {
    console.log('START >> importing test database');
    if (process.env.NODE_ENV && ['development', 'testing'].indexOf(process.env.NODE_ENV) === 0) {
        throw new Error('Testing is not allowed');
    }
    const execSync = require('child_process').execSync;
    const dbUser = APP_CONFIG.modelDb.sequelize.username;
    const dbPass = APP_CONFIG.modelDb.sequelize.password ? APP_CONFIG.modelDb.sequelize.password : 'password';
    const dbName = APP_CONFIG.modelDb.sequelize.database;
    
    // await sequelizeConnection.query(`CREATE DATABASE IF NOT EXISTS \`${APP_CONFIG.modelDb.sequelize.database}\`;`);

    await execSync(`sh bin/scripts/import_test_db.sh -u ${dbUser} -p ${dbPass} -d ${dbName}`);
    console.log('<< END Finished importing test database');
};
