import IConfig from '../utils/sequelize/Config';
import { IOptions as IUpdateStatus } from '../../models/interfaces/vehicles/updateVehicle';
import { ModelNotFoundError } from '../../../@core/helpers/errors';

export default (config: IConfig) =>
    async ({ data, uid, id }: IUpdateStatus): Promise<boolean> => {
        const { Vehicle } = config.models;
        const whereOptions: Record<string, unknown> = {};

        if (uid) {
            whereOptions.uid = uid;
        }
        if (id) {
            whereOptions.id = id;
        }

        if (Object.keys(whereOptions).length === 0) {
            throw new ModelNotFoundError('', { entityName: 'Vehicle' });
        }

        const result = await Vehicle.findOne({ where: whereOptions, raw: true });

        if (result === null) throw new ModelNotFoundError('', { entityName: 'Vehicle' });

        console.log(result);

        // TBD update status based on rental table status

        await Vehicle.update({ ...data }, { where: whereOptions });

        return true;
    };
