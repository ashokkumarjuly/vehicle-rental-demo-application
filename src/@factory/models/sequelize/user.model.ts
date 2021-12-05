import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { USER_STATUS } from '../../../constants';
import sequelizeConnection from './config';
import { IUserAttributes } from '../interfaces';
// Some attributes are optional in `User.build` and `User.create` calls
type IUserCreationAttributes = Optional<IUserAttributes, 'id'>;

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public first_name!: string;

    public last_name!: string;

    public email!: string;

    public password!: string;

    public uid!: string;

    public phone_no!: string;

    public phone_code!: string;

    public address!: string;

    public city!: string;

    public state!: string;

    public country!: string;

    public zip_code!: string;

    public status!: number;

    // timestamps!
    public readonly created_at!: Date;

    public readonly updated_at!: Date;

    public readonly deleted_at!: Date;

    public readonly roles!: any;

    // // You can also pre-declare possible inclusions, these will only be populated if you
    // // actively include a relation.
    // public readonly roles?: Roles[]; // Note this is optional since it's only populated when explicitly requested in code

    // public static associations: {
    //     roles: Association<User, Roles>;
    // };
}

User.init(
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
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        full_name: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.first_name || this.last_name ? `${this.first_name} ${this.last_name}` : 'Anonymous';
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
                isUnique(value: string, next: any) {
                    User.findOne({
                        where: {
                            email: value,
                            status: { $gt: -1 }
                        }
                    })
                        .then((user: any) => {
                            // reject if a different user wants to use the same email
                            if (user && this.id !== user.id) {
                                return next('Email id is already in use!');
                            }
                            return next();
                        })
                        .catch((error: any) => next(error));
                }
            }
        },
        password: { type: DataTypes.STRING, allowNull: true },
        phone_no: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                len: { args: [7, 20], msg: 'Phone number invalid, too short.' },
                isNumeric: { msg: 'not a valid phone number.' }
            }
        },
        phone_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: USER_STATUS.PENDING
        },
        customer_preferred_size: {
            allowNull: true,
            type: DataTypes.BIGINT
        },
        address: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        city: {
            allowNull: true,
            type: DataTypes.STRING
        },
        state: {
            allowNull: true,
            type: DataTypes.STRING
        },
        country: {
            allowNull: true,
            type: DataTypes.STRING
        },
        zip_code: {
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
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default User;
