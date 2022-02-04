import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';

import { IPermissionAttributes } from '../interfaces';

type IPermissionCreationAttributes = Optional<IPermissionAttributes, 'id'>;

class Permission extends Model<IPermissionAttributes, IPermissionCreationAttributes> implements IPermissionAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;

    public readonly deleted_at!: Date;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING, unique: true },
        label: DataTypes.STRING,
        description: DataTypes.STRING,
        deleted_at: DataTypes.DATE
    },
    {
        tableName: 'auth_permissions',
        timestamps: false,
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default Permission;
