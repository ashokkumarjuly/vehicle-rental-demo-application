import Config from '../Config';
import ISignature from '../../models/interfaces/permissions/getUserPermissions';

export const getUserPermissions =
    (config: Config): ISignature =>
    async (options) => {
        return config.db.getUserPermissions({
            userId: options.userId
        });
    };
