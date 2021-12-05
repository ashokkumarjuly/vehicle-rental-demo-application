import { AsyncHandler } from '../../../../lib';

interface IOptions {
    readonly email: string;
    readonly password: string;
}

type ISignature = AsyncHandler<IOptions, any>;

export default ISignature;
