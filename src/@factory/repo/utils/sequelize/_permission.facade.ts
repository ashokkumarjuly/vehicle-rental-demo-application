/* istanbul ignore file */

import IConfig from './Config';

import { getUserPermissions } from '../../permissions';

export default (config: IConfig): any => ({
    getUserPermissions: getUserPermissions(config)
});
