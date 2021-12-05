import IConfig from '../Config';

import { getUserById, getUserByEmail, createUser } from './user.service';

export const UserFacades = (config: IConfig) => ({
    getUserById: getUserById(config),
    getUserByEmail: getUserByEmail(config),
    createUser: createUser(config)
});
