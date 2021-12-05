import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { PAYMENT_STATUS, RENT_TYPE } from '../../../constants';
import sequelizeConnection from './config';
import { IRentalAttributes } from '../interfaces';
// Some attributes are optional in `Rental.build` and `Rental.create` calls
type IVehicleCreationAttributes = Optional<IRentalAttributes, 'id'>;

class Rental extends Model<IRentalAttributes, IVehicleCreationAttributes> implements IRentalAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public vehicle_id!: number;

    public user_id!: number;

    public planned_start_date!: string;

    public actual_start_date!: string;

    public planned_return_date!: string;

    public actual_return_date!: string;

    public initial_amount!: number;

    public total_amount!: number;

    public payment_status!: number;

    public is_active!: number;

    public rent_type!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;

    public readonly deleted_at!: Date;
}

Rental.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 1
        },
        payment_status: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: PAYMENT_STATUS.PENDING
        },
        rent_type: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: RENT_TYPE.HOURLY
        },
        vehicle_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        initial_amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        total_amount: {
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
        planned_start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        actual_start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        planned_return_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        actual_return_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'rentals',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default Rental;
