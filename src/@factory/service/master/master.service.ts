import IConfig from '../Config';

export const getMasterDropdowns = (config: IConfig) => async (): Promise<any> => {
    const result = {
        fuel_type_dropdown: [],
        vehicle_type_dropdown: [],
        variants_dropdown: []
    };

    result.fuel_type_dropdown = await config.db.getFuelTypes();
    result.vehicle_type_dropdown = await config.db.getVehicleTypes();
    result.variants_dropdown = await config.db.getVariants();

    return result;
};
