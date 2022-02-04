/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';

import { getUserPermissions } from './permission.service';

// eslint-disable-next-line import/prefer-default-export
export const PermissionFacades = (config: IConfig) => ({
    getUserPermissions: getUserPermissions(config)
});
