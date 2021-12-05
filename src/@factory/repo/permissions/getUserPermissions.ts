import IConfig from '../utils/sequelize/Config';
import { IOptions } from '../../models/interfaces/permissions/getUserPermissions';
import { ModelNotFoundError } from '../../../@core/helpers/errors';

export default (config: IConfig): any => {
    return async (options: IOptions) => {
        const permissions: Array<string> = [];
        const user = await config.models.User.findOne({
            where: { id: options.userId },
            include: [
                {
                    model: config.models.Role,
                    as: 'roles',
                    include: [{ model: config.models.Permission, as: 'permissions' }]
                }
            ]
        });

        if (user === null) throw new ModelNotFoundError();

        user.roles.map((role: any) => {
            const temp = role.get({ plain: true });
            permissions.push(...temp.permissions);
            return role.permissions;
        });

        return permissions;
    };
};
