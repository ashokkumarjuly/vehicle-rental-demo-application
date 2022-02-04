import IConfig from '../utils/sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    const { VehicleFuelType } = config.models;

    const options: any = {
        attributes: ['id', 'name']
    };

    return VehicleFuelType.findAll(options)
        .then((r: any) => {
            return r;
        })
        .catch((error) => {
            throw error;
        });
};
