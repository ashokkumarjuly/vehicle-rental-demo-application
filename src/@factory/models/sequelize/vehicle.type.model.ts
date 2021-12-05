import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IVehicleTypeAttributes } from '../interfaces';
type IVehicleTypeCreationAttributes = Optional<IVehicleTypeAttributes, 'id'>;

class VehicleType extends Model<IVehicleTypeAttributes, IVehicleTypeCreationAttributes> implements IVehicleTypeAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public name!: string;

    public is_active!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

VehicleType.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        is_active: {
            allowNull: false,
            type: DataTypes.TINYINT,
            defaultValue: 1
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('unix_timestamp(CURRENT_TIMESTAMP)')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'vehicle_types',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default VehicleType;
