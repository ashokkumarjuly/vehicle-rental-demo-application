import IConfig from '../utils/sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    const { VehicleType } = config.models;

    const options: any = {
        attributes: ['id', 'name']
    };

    return VehicleType.findAll(options)
        .then((r: any) => {
            return r;
        })
        .catch((error) => {
            throw error;
        });
};
