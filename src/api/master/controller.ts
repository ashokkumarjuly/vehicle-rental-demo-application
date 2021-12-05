import { ICoreConfig } from '../../@core/ICoreConfig';
import { catchErrors, sendApiResponse } from '../../helpers';

export const index = (config: ICoreConfig): any =>
    catchErrors(config, async (req, res) => {
        config.logger.info({ type: 'API request', fn: 'master->index', query: req.query });

        const result = await config.service.getMasterDropdowns();

        config.logger.info({
            type: 'API Response',
            fn: 'master->index',
            resp: 'success'
        });

        sendApiResponse(res, req.t('general.success.list'), result);
    });
