/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from './Config';

import getVariants from '../../variants/getVariants';

export default (config: IConfig): any => ({
    getVariants: getVariants(config)
});
