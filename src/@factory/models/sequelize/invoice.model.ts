import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { USER_STATUS } from '../../../constants';
import sequelizeConnection from './config';
import { IInvoiceAttributes } from '../interfaces';
// Some attributes are optional in `Invoice.build` and `Invoice.create` calls
type IInvoiceCreationAttributes = Optional<IInvoiceAttributes, 'id'>;

class Invoice extends Model<IInvoiceAttributes, IInvoiceCreationAttributes> implements IInvoiceAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public rental_id!: number;

    public user_id!: number;

    public transaction_id!: string;

    public total_amount!: number;

    public sub_total_amount!: number;

    public additional_amount!: number;

    public damage_amount!: number;

    public payment_status!: number;

    public payment_method!: string;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

Invoice.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        payment_method: { type: DataTypes.STRING, allowNull: false },
        payment_status: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: USER_STATUS.PENDING
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        rental_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        transaction_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        total_amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        sub_total_amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        additional_amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        damage_amount: {
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
        }
    },
    {
        tableName: 'invoices',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default Invoice;
