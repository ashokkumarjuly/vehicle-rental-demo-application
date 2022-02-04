import { Op } from 'sequelize';
import IConfig from '../utils/sequelize/Config';
import { IRentalAttributes } from '../../models/interfaces/rentals';
import { IOptions as ICreate } from '../../models/interfaces/rentals/createRental';
import { CustomError } from '../../../@core/helpers/errors';
import { VEHICLE_STATUS } from '../../../constants';

export default (config: IConfig) =>
    async ({ data, loggedInUser }: ICreate): Promise<IRentalAttributes> => {
        const transaction = await config.sequelizeInstance.transaction();
        try {
            const { Vehicle, Rental } = config.models;

            const dbInput = { ...data, created_by: loggedInUser.id };

            const isVehicle = await Vehicle.findOne({
                where: { id: data.vehicle_id, status: { [Op.eq]: VEHICLE_STATUS.ACTIVE } },
                raw: true
            });
            if (!isVehicle || isVehicle === null) throw new CustomError('vehicle.error.vehicle_not_available');

            const result = await Rental.create(dbInput, { transaction });

            await Vehicle.update({ status: VEHICLE_STATUS.RENTED }, { where: { id: isVehicle.id }, transaction });

            await transaction.commit();

            return result;
        } catch (error) {
            // always rollback
            await transaction.rollback();
            throw error;
        }
    };
