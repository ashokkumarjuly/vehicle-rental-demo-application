import { ExpressHanlder } from '../../@core/lib';
import { ICoreConfig } from '../../@core/ICoreConfig';
import { catchErrors, sendApiResponse } from '../../helpers';

export const login = (config: ICoreConfig): ExpressHanlder =>
    catchErrors(config, async (req, res) => {
        config.logger.info({ type: 'API request', fn: 'login', data: null });

        const { email, password } = req.body;

        const { user, token, refreshToken } = await config.service.login({ email, password });
        config.logger.info({ type: 'API Response', fn: 'login', resp: 'success' });

        sendApiResponse(res, req.t('auth.success.login'), { user, token, refreshToken });
    });
