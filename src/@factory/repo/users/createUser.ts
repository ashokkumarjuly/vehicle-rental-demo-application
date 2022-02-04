/* eslint-disable @typescript-eslint/naming-convention */
import { UniqueConstraintError } from 'sequelize';
import IConfig from '../utils/sequelize/Config';
import { IOptions } from '../../models/interfaces/user/createUser';
import hashPassword from '../../../lib/hashPassword';
import { APP_ROLES, USER_STATUS, USER_WALLET_AMOUNT_TYPE } from '../../../constants';
import { RecordAlreadyExistsError } from '../../../@core/helpers/errors';
import { IUserAttributes } from '../../models/interfaces/user';

export default (config: IConfig) =>
    async ({ data, loggedInUser }: IOptions): Promise<IUserAttributes> => {
        const transaction = await config.sequelizeInstance.transaction();
        try {
            const dbInput = {
                ...data,
                status: USER_STATUS.ACTIVE,
                created_by: loggedInUser?.id || 0
            };

            if (dbInput.password) {
                dbInput.password = await hashPassword(dbInput.password);
            }

            if (!dbInput.role_id) {
                dbInput.role_id = APP_ROLES.CUSTOMER.id;
            }
            const user = await config.models.User.create({ ...dbInput }, { transaction });
            await config.models.UserRole.create({ role_id: dbInput.role_id, user_id: user.id }, { transaction });

            // To add wallet amount to customer
            if (dbInput.role_id === APP_ROLES.CUSTOMER.id) {
                await config.models.UserWalletAmount.create(
                    { user_id: user.id, type: USER_WALLET_AMOUNT_TYPE.DEBIT, amount: data.wallet_amount },
                    { transaction }
                );
            }

            await transaction.commit();

            return user.get({ plain: true });
        } catch (error) {
            // always rollback
            await transaction.rollback();

            if (error instanceof UniqueConstraintError) {
                throw new RecordAlreadyExistsError('user.error.alreadyExists');
            }
            throw error;
        }
    };
