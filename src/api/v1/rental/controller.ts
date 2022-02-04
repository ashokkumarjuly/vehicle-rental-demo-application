import { ICoreConfig } from '../../../@core/ICoreConfig';
import { catchErrors, sendApiResponse } from '../../../helpers';
import { IRequestUser } from '../../../@core/app.config/interface';

export const createRental = (config: ICoreConfig): any =>
    catchErrors(config, async (req, res) => {
        const loggedInUser = req.user as IRequestUser;
        const payload = req.body;

        config.logger.info({ type: 'API request', fn: 'createRental', userId: loggedInUser.id });

        const result = await config.service.createRental({ data: payload, loggedInUser });

        config.logger.info({ type: 'API Response', fn: 'createRental', resp: 'success', userId: loggedInUser.id });
        sendApiResponse(res, 'Rental has been successfully created', result);
    });
