import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IVariantValueAttributes } from '../interfaces';
type IVariantValueCreationAttributes = Optional<IVariantValueAttributes, 'variant_id'>;

class VariantValue
    extends Model<IVariantValueAttributes, IVariantValueCreationAttributes>
    implements IVariantValueAttributes
{
    public variant_id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public variant_value!: string;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

VariantValue.init(
    {
        variant_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        variant_value: {
            allowNull: false,
            type: DataTypes.STRING
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
        tableName: 'variant_values',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default VariantValue;
