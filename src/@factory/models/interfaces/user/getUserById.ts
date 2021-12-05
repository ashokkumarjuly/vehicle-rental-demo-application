import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly id?: number;
    readonly uid?: string;
    readonly role_id?: number;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
