import IConfig from './Config';
import getUsers from '../../users/getUsers';
import getUserById from '../../users/getUserById';
import getUserByEmail from '../../users/getUserByEmail';
import createUser from '../../users/createUser';

export default (config: IConfig): any => ({
    getUsers: getUsers(config),
    getUserByEmail: getUserByEmail(config),
    getUserById: getUserById(config),
    createUser: createUser(config)
});
