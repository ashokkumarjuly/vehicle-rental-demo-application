import { AsyncHandler } from '../../../../lib';

export interface IOptions {
    readonly limit?: number;
    readonly page?: number;
    readonly term?: string;
    readonly sort?: {
        vehicle_no?: string;
    };
    readonly filter?: {
        readonly variant_value?: string;
        readonly status?: number;
        readonly rented_user_id?: number;
        readonly is_overdue?: boolean;
    };
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
