import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IVehicleMakeModelAttributes } from '../interfaces';
type IVehicleMakeModelCreationAttributes = Optional<IVehicleMakeModelAttributes, 'id'>;

class VehicleMakeModel
    extends Model<IVehicleMakeModelAttributes, IVehicleMakeModelCreationAttributes>
    implements IVehicleMakeModelAttributes
{
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public name!: string;

    public vehicle_make!: string;

    public vehicle_type_id!: number;

    public is_active!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

VehicleMakeModel.init(
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
        vehicle_make: {
            allowNull: false,
            type: DataTypes.STRING
        },
        vehicle_type_id: {
            allowNull: false,
            type: DataTypes.BIGINT
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
        tableName: 'vehicle_make_models',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default VehicleMakeModel;
