import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';

import { IRolePermissionAttributes } from '../interfaces';

type IRolePermissionCreationAttributes = Optional<IRolePermissionAttributes, 'id'>;

class RolePermission
    extends Model<IRolePermissionAttributes, IRolePermissionCreationAttributes>
    implements IRolePermissionAttributes
{
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

RolePermission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: { type: DataTypes.INTEGER, unique: false },
        permission_id: { type: DataTypes.INTEGER, unique: false }
    },
    {
        tableName: 'auth_role_permission',
        timestamps: false,
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default RolePermission;
