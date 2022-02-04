/* istanbul ignore file */

import IConfig from '../Config';

export default (config: IConfig): any => config.db.getTransaction;
