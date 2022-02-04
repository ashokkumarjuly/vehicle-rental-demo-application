/* istanbul ignore file */

import { IUserAttributes } from '../../@factory/models/interfaces';
import { USER_STATUS } from '../../constants';
import { ModelNotFoundError } from '../helpers/errors';

export default async (userRow: IUserAttributes): Promise<IUserAttributes> => {
    if (userRow.status === USER_STATUS.DELETED) {
        throw new ModelNotFoundError('', { entityName: 'User' });
    }

    return userRow;
};
