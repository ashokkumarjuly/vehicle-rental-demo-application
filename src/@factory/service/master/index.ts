/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';

import { getMasterDropdowns } from './master.service';

// eslint-disable-next-line import/prefer-default-export
export const MasterFacades = (config: IConfig) => ({
    getMasterDropdowns: getMasterDropdowns(config)
});
