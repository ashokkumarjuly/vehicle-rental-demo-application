import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from './config';
import { IVariantAttributes } from '../interfaces';
type IVariantCreationAttributes = Optional<IVariantAttributes, 'variant_id'>;

class Variant extends Model<IVariantAttributes, IVariantCreationAttributes> implements IVariantAttributes {
    public variant_id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public variant!: string;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;
}

Variant.init(
    {
        variant_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        variant: {
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
        tableName: 'variants',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default Variant;
