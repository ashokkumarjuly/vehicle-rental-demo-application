import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from '../user/user.attributes';

export interface Data {
    readonly sku: string;
    readonly fuel_type_id: number;
    readonly vehicle_model_id: number;
    readonly vehicle_variant_id: number;
    readonly status: number;
    readonly hourly_rent: number;
    readonly daily_rent: number;
}

export interface IOptions {
    readonly id?: number;
    readonly uid?: string;
    readonly data: Data;
    readonly loggedInUser?: IUserAttributes;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
