import { AsyncHandler } from '../../../../lib';
import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly email: string;
    readonly domainURL?: string;
}

type ISignature = AsyncHandler<IOptions, IUserAttributes>;

export default ISignature;
