import { AsyncHandler } from '../../../../lib';
// import { IUserAttributes } from './user.attributes';

export interface IOptions {
    readonly limit?: number;
    readonly page?: number;
    readonly order?: string;
    readonly search?: string;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
