import IConfig from './Config';
import Service from './Service';
import { migrate, rollback, clearService, getTransaction } from './utils';
import { AuthFacades } from './auth';
import { PermissionFacades } from './permission';
import { VehicleFacades } from './vehicle';
import { RentalFacades } from './rental';
import { InvoiceFacades } from './invoice';
import { MasterFacades } from './master';

import { UserFacades } from './users';

export default (config: IConfig): Service => ({
    ...MasterFacades(config),
    ...AuthFacades(config),
    ...UserFacades(config),
    ...PermissionFacades(config),
    ...VehicleFacades(config),
    ...RentalFacades(config),
    ...InvoiceFacades(config),

    clearService: clearService(config),
    migrate: migrate(config),
    rollback: rollback(config),
    getTransaction: getTransaction(config)
});
