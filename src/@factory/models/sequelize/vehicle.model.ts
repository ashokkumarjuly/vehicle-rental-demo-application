import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { VEHICLE_STATUS } from '../../../constants';
import sequelizeConnection from './config';
import { IVehicleAttributes } from '../interfaces';
// Some attributes are optional in `Vehicle.build` and `Vehicle.create` calls
type IVehicleCreationAttributes = Optional<IVehicleAttributes, 'id'>;

class Vehicle extends Model<IVehicleAttributes, IVehicleCreationAttributes> implements IVehicleAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public sku!: string;

    public uid!: string;

    public fuel_type_id!: number;

    public vehicle_model_id!: number;

    public vehicle_variant_id!: number;

    public vehicle_no!: string;

    public hourly_rent!: number;

    public daily_rent!: number;

    public status!: number;

    public created_by!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;

    public readonly deleted_at!: Date;
}

Vehicle.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or Sequelize.UUIDV1
        },
        sku: { type: DataTypes.STRING, allowNull: false },
        status: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: VEHICLE_STATUS.ACTIVE
        },
        fuel_type_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        vehicle_model_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        vehicle_variant_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        vehicle_no: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        hourly_rent: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        daily_rent: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: '0'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('unix_timestamp(CURRENT_TIMESTAMP)')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'vehicles',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default Vehicle;
