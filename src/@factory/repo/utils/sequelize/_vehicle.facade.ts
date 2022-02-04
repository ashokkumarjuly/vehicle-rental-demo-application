/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from './Config';

import createVehicle from '../../vehicles/createVehicle';
import updateVehicle from '../../vehicles/updateVehicle';
import getVehicles from '../../vehicles/getVehicles';
import getFuelTypes from '../../vehicles/getFuelTypes';
import getVehicleTypes from '../../vehicles/getVehicleTypes';

export default (config: IConfig): any => ({
    createVehicle: createVehicle(config),
    updateVehicle: updateVehicle(config),
    getVehicles: getVehicles(config),
    getFuelTypes: getFuelTypes(config),
    getVehicleTypes: getVehicleTypes(config)
});
