import IConfig from '../utils/sequelize/Config';

export default (config: IConfig) => async (): Promise<any> => {
    const { Variant, VariantValue } = config.models;

    const options: any = {
        attributes: ['id', 'variant_id', 'variant_value'],
        include: [
            {
                attributes: ['variant'],
                model: Variant,
                as: 'variant'
            }
        ]
    };

    return VariantValue.findAll(options)
        .then((r: any) => {
            if (r) {
                r.map((a: any, index: number) => {
                    const b = a.get({ plain: true });
                    b.variant = b.variant?.variant;
                    r[index] = b;
                    return r;
                });
            }

            return r;
        })
        .catch((error) => {
            throw error;
        });
};
