/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from './Config';

import createRental from '../../rental/createRental';

export default (config: IConfig): any => ({
    createRental: createRental(config)
});
