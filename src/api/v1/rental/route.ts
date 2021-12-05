/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../../@core/ICoreConfig';
import { RoutePayloadValidator } from '../../../helpers';
import { createRental } from './controller';
import { createSchema } from './route.validate';

export default class {
    public _router: Router;

    public _config: ICoreConfig;

    constructor(config: ICoreConfig) {
        this._router = Router();
        this._config = config;
        this._routes();
    }

    public _routes(): void {
        /**
         * @api {post} /artists Create rental
         * @apiName CreateArtist
         * @apiGroup Rental
         * @apiPermission Rental
         * @apiParam {String} access_token Master access_token.
         * @apiSuccess (Sucess 201) {Object} Rental's data.
         * @apiError {Object} 400 Some parameters may contain invalid values.
         * @apiError 401 Master access only.
         */
        this._router.post('/', RoutePayloadValidator(this._config, createSchema, false), createRental(this._config));
    }
}
