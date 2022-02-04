import { AsyncHandler } from '../../../../lib';

import { IPermissionAttributes } from './permission.attributes';

export interface IOptions {
    readonly userId: number;
}

type ISignature = AsyncHandler<IOptions, IPermissionAttributes[]>;

export default ISignature;
