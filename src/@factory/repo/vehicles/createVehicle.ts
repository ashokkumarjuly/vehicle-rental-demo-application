import IConfig from '../utils/sequelize/Config';
import { IVehicleAttributes } from '../../models/interfaces/vehicles';
import { IOptions as ICreate } from '../../models/interfaces/vehicles/createVehicle';
import { CustomError } from '../../../@core/helpers/errors';

export default (config: IConfig) =>
    async ({ data, loggedInUser }: ICreate): Promise<IVehicleAttributes> => {
        const transaction = await config.sequelizeInstance.transaction();
        try {
            const { Vehicle, VehicleFuelType, VehicleType, VariantValue, VehicleMakeModel } = config.models;

            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { fuel_type_id, vehicle_type, vehicle_variant_id, model, make } = data;
            console.log(data);

            const [isFuelType, isVehicleType, isVariant, isMakeModel] = await Promise.all([
                VehicleFuelType.count({ where: { id: fuel_type_id } }),
                VehicleType.findOne({ where: { id: vehicle_type }, raw: true }),
                VariantValue.findOne({ where: { id: vehicle_variant_id }, raw: true }),
                VehicleMakeModel.findOne({ where: { name: model, vehicle_make: make }, raw: true })
            ]);

            // verify fuel_type
            if (!isFuelType) throw new CustomError('vehicle.error.fuel_type_not_found');
            if (!isVehicleType || isVariant === null) throw new CustomError('vehicle.error.type_not_found');
            if (!isVariant || isVariant === null) throw new CustomError('vehicle.error.variant_values_not_found');

            console.log('----', isVariant);

            // Find vehicle model_id or insert vehicle model

            let vehicleModelId = null;

            if (isMakeModel) {
                vehicleModelId = isMakeModel.id;
            } else {
                const modelMakeInsert = await VehicleMakeModel.create(
                    { name: model, vehicle_make: make, vehicle_type_id: isVehicleType.id },
                    { transaction }
                );
                vehicleModelId = modelMakeInsert.id;
            }

            const dbInput = { ...data, created_by: loggedInUser?.id };
            dbInput.vehicle_variant_id = isVariant.variant_id;
            dbInput.vehicle_model_id = vehicleModelId;
            console.log(dbInput);

            const result = await Vehicle.create(dbInput, { transaction });

            await transaction.commit();
            return { id: result?.id, uid: result?.uid };
        } catch (error) {
            // always rollback
            await transaction.rollback();
            throw error;
        }
    };
