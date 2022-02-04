/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';

import { createVehicle, updateVehicle, getVehicles } from './vehicle.service';

// eslint-disable-next-line import/prefer-default-export
export const VehicleFacades = (config: IConfig) => ({
    createVehicle: createVehicle(config),
    updateVehicle: updateVehicle(config),
    getVehicles: getVehicles(config)
});
