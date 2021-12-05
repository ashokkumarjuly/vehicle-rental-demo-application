import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IUserWalletAmountAttributes } from '../interfaces';
type IUserWalletAmountCreationAttributes = Optional<IUserWalletAmountAttributes, 'id'>;

class UserWalletAmount
    extends Model<IUserWalletAmountAttributes, IUserWalletAmountCreationAttributes>
    implements IUserWalletAmountAttributes
{
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public user_id!: number;

    public type!: number;

    public invoice_id!: number;

    public amount!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

UserWalletAmount.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        type: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        invoice_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false
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
        tableName: 'user_wallet_amounts',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default UserWalletAmount;
