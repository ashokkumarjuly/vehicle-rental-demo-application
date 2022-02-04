import { ICoreConfig } from '../../../@core/ICoreConfig';
import { catchErrors, sendApiResponse } from '../../../helpers';
import { IRequestUser } from '../../../@core/app.config/interface';

export const createInvoice = (config: ICoreConfig): any =>
    catchErrors(config, async (req, res) => {
        const loggedInUser = req.user as IRequestUser;
        const payload = req.body;

        config.logger.info({ type: 'API request', fn: 'createInvoice', userId: loggedInUser.id });

        const result = await config.service.createInvoice({ data: payload, loggedInUser });

        config.logger.info({ type: 'API Response', fn: 'createInvoice', resp: 'success', userId: loggedInUser.id });
        sendApiResponse(res, 'Invoice has been successfully created', result);
    });
