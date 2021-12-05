import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';

import { IUserRoleAttributes } from '../interfaces';

type IUserRoleCreationAttributes = Optional<IUserRoleAttributes, 'id'>;

class UserRole extends Model<IUserRoleAttributes, IUserRoleCreationAttributes> implements IUserRoleAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public user_id!: number;

    public role_id!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;

    public readonly deleted_at!: Date;
}

UserRole.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: DataTypes.BIGINT,
        role_id: DataTypes.BIGINT,
        deleted_at: DataTypes.STRING
    },
    {
        tableName: 'auth_user_role',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default UserRole;
