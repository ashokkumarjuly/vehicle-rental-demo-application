import IConfig from './Config';
import { ModelDbInterface } from '../../Db';
import migrate from '../../commons/migrate/sequelize';
import rollback from '../../commons/rollback/sequelize';
import clearDb from '../../commons/clearDb/sequelize';
import getTransaction from '../../commons/getTransaction/sequelize';

import UserFacade from './_user.facade';
import PermissionFacade from './_permission.facade';
import VehicleFacades from './_vehicle.facade';
import RentalFacades from './_rental.facade';
import InvoiceFacades from './_invoice.facade';
import VariantFacades from './_variant.facade';

export default (config: IConfig): ModelDbInterface => ({
    ...UserFacade(config),
    ...PermissionFacade(config),
    ...VehicleFacades(config),
    ...RentalFacades(config),
    ...InvoiceFacades(config),
    ...VariantFacades(config),

    clearDb: clearDb(config),
    migrate: migrate(config),
    rollback: rollback(config),
    getTransaction: getTransaction(config)
});
