/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../@core/ICoreConfig';
import { index } from './controller';

export default class {
    public _router: Router;

    public _config: ICoreConfig;

    constructor(config: ICoreConfig) {
        this._router = Router();
        this._config = config;
        this._routes();
    }

    public _routes(): void {
        /*
         * @api {get} / Retrieve masters
         * @apiName Retrievemasters
         * @apiGroup master
         * @apiPermission admin
         * @apiParam {String} access_token master access_token.
         * @apiUse listParams
         * @apiSuccess {Object[]} masters List of masters.
         * @apiError {Object} 400 Some parameters may contain invalid values.
         * @apiError 401 Admin access only.
         */
        this._router.get('/', index(this._config));
    }
}
