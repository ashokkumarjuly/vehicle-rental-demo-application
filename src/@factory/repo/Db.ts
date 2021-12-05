import { ICreateUserSignature, IGetUserByIdSignature, IGetUserByEmailSignature } from '../models/interfaces/user';
import { IGetUserPermissionsSignature } from '../models/interfaces/permissions';
import {
    ICreateInvoiceSignature,
    ICreateRentalSignature,
    ICreateVehicletSignature,
    IGetVehiclesSignature,
    IUpdateVehicleSignature
} from '../models/interfaces';

export interface ModelDbInterface {
    // users
    readonly createUser: ICreateUserSignature;
    readonly getUserById: IGetUserByIdSignature;
    readonly getUserByEmail: IGetUserByEmailSignature;

    readonly getUserPermissions: IGetUserPermissionsSignature;

    // Vehicle
    readonly createVehicle: ICreateVehicletSignature;
    readonly updateVehicle: IUpdateVehicleSignature;
    readonly getVehicles: IGetVehiclesSignature;

    readonly getFuelTypes: <T>() => Promise<T>;
    readonly getVehicleTypes: <T>() => Promise<T>;
    readonly getVariants: <T>() => Promise<T>;

    // Rental
    readonly createRental: ICreateRentalSignature;

    // Inventory
    readonly createInvoice: ICreateInvoiceSignature;

    // Migration and Seeding
    readonly clearDb: () => Promise<void>;
    readonly migrate: () => Promise<void>;
    readonly rollback: () => Promise<void>;
    readonly getTransaction: <T>() => Promise<T>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Db extends ModelDbInterface {}
