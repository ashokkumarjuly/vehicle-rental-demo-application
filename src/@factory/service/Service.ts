import { ILoginSignature } from '../models/interfaces/auth';

import { IGetUserByIdSignature, IGetUserByEmailSignature, ICreateUserSignature } from '../models/interfaces/user';

import { IGetUserPermissionsSignature } from '../models/interfaces/permissions';

import ICommonServiceSignature from './utils/CommonServiceSignature';
import {
    ICreateVehicletSignature,
    IUpdateVehicleSignature,
    IGetVehiclesSignature,
    ICreateRentalSignature,
    ICreateInvoiceSignature
} from '../models/interfaces';

export default interface Service {
    // Master
    readonly getMasterDropdowns: <T>() => Promise<T>;

    // Auth Services
    readonly login: ILoginSignature;

    // User Services
    readonly getUserById: IGetUserByIdSignature;
    readonly getUserByEmail: IGetUserByEmailSignature;
    readonly createUser: ICreateUserSignature;

    readonly getUserPermissions: IGetUserPermissionsSignature;

    // Vehicle
    readonly createVehicle: ICreateVehicletSignature;
    readonly updateVehicle: IUpdateVehicleSignature;
    readonly getVehicles: IGetVehiclesSignature;

    // Rental
    readonly createRental: ICreateRentalSignature;

    // Inventory
    readonly createInvoice: ICreateInvoiceSignature;

    // DB Migration Services
    readonly clearService: ICommonServiceSignature;
    readonly migrate: ICommonServiceSignature;
    readonly rollback: ICommonServiceSignature;
    readonly getTransaction: <T>() => Promise<T>;
}
