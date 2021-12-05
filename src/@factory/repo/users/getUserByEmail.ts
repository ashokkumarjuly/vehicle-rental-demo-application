import IConfig from '../utils/sequelize/Config';
import { IOptions } from '../../models/interfaces/user/getUserByEmail';
import { ModelNotFoundError } from '../../../@core/helpers/errors';
import { USER_MODEL_VISIBLE_PROPERTIES } from '../../../constants';
import { IUserAttributes } from '../../models/interfaces';

export default (config: IConfig) =>
    async ({ email }: IOptions): Promise<IUserAttributes | null> => {
        const user = await config.models.User.findOne({
            attributes: [...USER_MODEL_VISIBLE_PROPERTIES, 'id', 'password'],
            where: { email }
        });

        if (user === null) throw new ModelNotFoundError('', { entityName: 'User' });

        return user.get({ plain: true });
    };
