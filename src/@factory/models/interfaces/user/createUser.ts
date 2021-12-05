import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface Data {
    readonly first_name?: string;
    readonly last_name?: string;
    readonly email: string;
    readonly password?: string;
    readonly role_id: number;
    readonly customer_preferred_size?: number;
    readonly address?: string;
    readonly city?: string;
    readonly state?: string;
    readonly zip_code?: string;
    readonly country?: string;
    readonly phone_code?: string;
    readonly phone_no?: string;
    readonly wallet_amount?: number;
}

export interface IOptions {
    readonly data: Data;
    readonly loggedInUser?: IUserAttributes;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
