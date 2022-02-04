import IConfig from '../Config';
import { ICreateUserSignature, IGetUserByEmailSignature, IGetUserByIdSignature } from '../../models/interfaces';

export const createUser =
    (config: IConfig): ICreateUserSignature =>
    async ({ data, loggedInUser }) => {
        try {
            return await config.db.createUser({ data, loggedInUser });
        } catch (error) {
            config.logger.error({ fn: 'createUser', type: 'Service output', resp: 'error', err: error });
            throw error;
        }
    };

export const getUserByEmail =
    (config: IConfig): IGetUserByEmailSignature =>
    async ({ email }) => {
        try {
            return await config.db.getUserByEmail({
                email
            });
        } catch (error) {
            config.logger.error({ fn: 'getUserByEmail', type: 'Service output', resp: 'error', err: error });
            throw error;
        }
    };

export const getUserById =
    (config: IConfig): IGetUserByIdSignature =>
    async ({ id, uid }) => {
        try {
            return await config.db.getUserById({ id, uid });
        } catch (error) {
            config.logger.error({ fn: 'getUserById', type: 'Service output', resp: 'error', err: error });
            throw error;
        }
    };
