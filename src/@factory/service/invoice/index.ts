/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import IConfig from '../Config';

import { createInvoice } from './invoice.service';

// eslint-disable-next-line import/prefer-default-export
export const InvoiceFacades = (config: IConfig) => ({
    createInvoice: createInvoice(config)
});
