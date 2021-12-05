import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IVehicleFuelTypeAttributes } from '../interfaces';
type IVehicleFuelTypeCreationAttributes = Optional<IVehicleFuelTypeAttributes, 'id'>;

class VehicleFuelType
    extends Model<IVehicleFuelTypeAttributes, IVehicleFuelTypeCreationAttributes>
    implements IVehicleFuelTypeAttributes
{
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public name!: string;

    public is_active!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

VehicleFuelType.init(
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
        tableName: 'vehicle_fuel_types',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default VehicleFuelType;
