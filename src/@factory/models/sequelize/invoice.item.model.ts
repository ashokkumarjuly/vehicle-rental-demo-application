import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IInvoiceItemAttributes } from '../interfaces';
// Some attributes are optional in `Invoice.build` and `Invoice.create` calls
type IInvoiceItemCreationAttributes = Optional<IInvoiceItemAttributes, 'id'>;

class InvoiceItem extends Model<IInvoiceItemAttributes, IInvoiceItemCreationAttributes> implements IInvoiceItemAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public invoice_id!: number;

    public vehicle_id!: number;

    public user_id!: number;

    public amount!: number;

    public damage_amount!: number;

    public total_amount!: number;

    public payment_status!: number;

    public damage_remarks!: string;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

InvoiceItem.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        invoice_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        vehicle_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT
        },

        amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        total_amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        damage_amount: {
            allowNull: true,
            type: DataTypes.DECIMAL
        },
        damage_remarks: {
            allowNull: true,
            type: DataTypes.STRING
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
        tableName: 'invoice_items',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default InvoiceItem;
