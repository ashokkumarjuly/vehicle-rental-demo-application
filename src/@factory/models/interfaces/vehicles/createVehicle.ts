import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from '../user';

export interface Data {
    readonly sku: string;
    readonly fuel_type_id: number;
    readonly status: number;
    readonly hourly_rent: number;
    readonly daily_rent: number;
    readonly vehicle_type: number;
    readonly model: string;
    readonly make: string;
    readonly vehicle_variant_id: number;
    readonly vehicle_model_id?: number;
}

export interface IOptions {
    readonly data: Data;
    readonly loggedInUser?: IUserAttributes;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
