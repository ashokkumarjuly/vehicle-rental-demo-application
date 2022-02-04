import IConfig from '../utils/sequelize/Config';
import { IOptions } from '../../models/interfaces/user/getUserById';
import { APP_ROLES, USER_MODEL_VISIBLE_PROPERTIES } from '../../../constants';
import { ModelNotFoundError } from '../../../@core/helpers/errors';
import { IUserAttributes } from '../../models/interfaces';

export default (config: IConfig) =>
    async (data: IOptions): Promise<IUserAttributes> => {
        const { id, uid } = data;
        const whereOptions: Record<string, unknown> = {};

        if (id) {
            whereOptions.id = id;
        } else if (uid) {
            whereOptions.uid = uid;
        }

        if (Object.keys(whereOptions).length === 0) {
            throw new ModelNotFoundError('', { entityName: 'User' });
        }

        const modelInclude = [];

        modelInclude.push({
            attributes: ['id', 'name'],
            model: config.models.Role,
            as: 'roles'
        });

        const user = await config.models.User.findOne({
            attributes: [...USER_MODEL_VISIBLE_PROPERTIES, 'id'],
            where: whereOptions,
            include: [...modelInclude]
        });
        if (user === null) throw new ModelNotFoundError('', { entityName: 'User' });

        const isCustomer = user?.roles?.find((el: any) => el.id === APP_ROLES.CUSTOMER.id);

        const result = { ...user.get({ plain: true }) };

        if (isCustomer) {
            const isAmountAvailable = await config.models.UserWalletAmount.sum('amount', {
                where: { user_id: user.id }
            });

            result.available_amount = isAmountAvailable;
        }

        delete result.roles;

        return result;
    };
