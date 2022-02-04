import { Model, DataTypes, Optional, HasManyCreateAssociationMixin } from 'sequelize';
import sequelizeConnection from './config';

import { IRoleAttributes } from '../interfaces';
import Permission from './auth.permission';

type IRoleCreationAttributes = Optional<IRoleAttributes, 'id'>;

class Role extends Model<IRoleAttributes, IRoleCreationAttributes> implements IRoleAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;

    public readonly deleted_at!: Date;

    setPermissions!: HasManyCreateAssociationMixin<Permission>;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING, unique: true },
        description: DataTypes.STRING,
        deleted_at: DataTypes.DATE
    },
    {
        tableName: 'auth_roles',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default Role;
