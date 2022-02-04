import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from '../user';

export interface Data {
    readonly vehicle_id?: number;
    readonly user_id?: number;
    readonly initial_amount?: number;
    readonly rent_type?: number;
    readonly planned_start_date?: string | Date;
    readonly actual_start_date?: string | Date;
    readonly planned_return_date?: string | Date;
    readonly actual_return_date?: string | Date;
    readonly created_by?: number;
}

export interface IOptions {
    readonly data: Data;
    readonly loggedInUser: IUserAttributes;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
