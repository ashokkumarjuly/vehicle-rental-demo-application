/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';

import { createRental } from './rental.service';

// eslint-disable-next-line import/prefer-default-export
export const RentalFacades = (config: IConfig) => ({
    createRental: createRental(config)
});
