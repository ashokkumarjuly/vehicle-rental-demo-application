import IConfig from './Config';

import createInvoice from '../../invoice/createInvoice';

export default (config: IConfig): any => ({
    createInvoice: createInvoice(config)
});
