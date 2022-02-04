import { ICoreConfig } from '../../../@core/ICoreConfig';
import { catchErrors, sendApiResponse } from '../../../helpers';
import { IRequestUser } from '../../../@core/app.config/interface';

export const createVehicle = (config: ICoreConfig): any =>
    catchErrors(config, async (req, res) => {
        const loggedInUser = req.user as IRequestUser;
        const payload = req.body;

        config.logger.info({ type: 'API request', fn: 'createVehicle', userId: loggedInUser.id });

        const result = await config.service.createVehicle({ data: payload, loggedInUser });

        config.logger.info({ type: 'API Response', fn: 'createVehicle', resp: 'success', userId: loggedInUser.id });
        sendApiResponse(res, 'Vehicle has been successfully created', result);
    });

export const updateVehicle = (config: ICoreConfig): any =>
    catchErrors(config, async (req, res) => {
        const loggedInUser = req.user as IRequestUser;
        const payload = req.body;
        const { uid } = req.params;

        config.logger.info({ type: 'API request', fn: 'createVehicle', userId: loggedInUser.id });

        const result = await config.service.updateVehicle({ uid, data: payload, loggedInUser });

        config.logger.info({ type: 'API Response', fn: 'createVehicle', resp: 'success', userId: loggedInUser.id });
        sendApiResponse(res, 'Vehicle has been successfully created', result);
    });

export const getVehicles = (config: ICoreConfig): any =>
    catchErrors(config, async (req, res) => {
        const loggedInUser = req.user as IRequestUser;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { limit, page }: any = req.query;

        config.logger.info({ type: 'API request', fn: 'getVehicles', userId: loggedInUser.id, query: req.query });

        const result = await config.service.getVehicles({
            ...req.query,
            limit: +limit,
            page: +page
        });

        config.logger.info({
            type: 'API Response',
            fn: 'getVehicles',
            resp: 'success',
            userId: loggedInUser.id,
            data: result ? result.length : 0
        });

        sendApiResponse(res, req.t('general.success.list'), result);
    });
