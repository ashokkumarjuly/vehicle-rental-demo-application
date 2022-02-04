/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../@core/ICoreConfig';
import { login } from './controller';
import { RoutePayloadValidator } from '../../helpers';
import { loginSchema } from './route.validate';

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
         * @api {post} /login
         * @apiName Login
         * @apiGroup Auth
         * @apiPermission master
         * @apiParam {String} email User's email.
         * @apiParam {String} email token.
         * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
         * @apiSuccess (Success 201) {Object} user Current user's data.
         * @apiError 401 Invalid credentials.
         * */
        this._router.post('/login', RoutePayloadValidator(this._config, loginSchema, false), login(this._config));

        // router.post('./logut', authController.logout)
    }
}
