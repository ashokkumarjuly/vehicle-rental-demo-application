import { CAN_CREATE_USER, CAN_GET_USER } from '../../../constants';
import { getAuthUserAndPermissions, hasPermission } from '../../../@core/jwt';
import { ExpressHanlder } from '../../../@core/lib';
import { ICoreConfig } from '../../../@core/ICoreConfig';
import { IRequestUser } from '../../../@core/app.config/interface';
import { catchErrors, sendApiResponse } from '../../../helpers';

export const createUser = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        const payload = req.body;
        const loggedInUser = req.user as IRequestUser;

        const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        hasPermission({ permissions, permissionName: CAN_CREATE_USER });

        config.logger.info({ type: 'API request', fn: 'createUser', user_id: payload.email });

        const user = await config.service.createUser({ data: payload, loggedInUser });

        config.logger.info({ type: 'API Response', fn: 'createUser', resp: 'success', user: user.id });
        sendApiResponse(res, req.t('user.success.createUser'), user);
    });

export const getUserById = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { uid } = req.params;

        config.logger.info({ type: 'API request', fn: 'getUserById', uid });
        const { permissions } = await getAuthUserAndPermissions({ req, service: config.service });

        hasPermission({ permissions, permissionName: CAN_GET_USER });

        const result = await config.service.getUserById({ uid });
        delete result.id;

        config.logger.info({ type: 'API Response', fn: 'getUserById', resp: 'success', uid });
        sendApiResponse(res, req.t('general.success.list'), result);
    });
