/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../../@core/ICoreConfig';
import { RoutePayloadValidator } from '../../../helpers';
import { createUser, getUserById } from './controller';
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
         * @api {get} /users/:id Retrieve user
         * @apiName RetrieveUser
         * @apiGroup User
         * @apiPermission public
         * @apiSuccess {Object} user User's data.
         * @apiError 404 User not found.
         */
        this._router.get('/:uid', getUserById(this._config));

        /**
         * @api {post} /users Create user
         * @apiName CreateUser
         * @apiGroup User
         * @apiPermission master
         * @apiParam {String} access_token Master access_token.
         * @apiParam {String} email User's email.
         * @apiParam {String{6..}} password User's password.
         * @apiParam {String} [name] User's name.
         * @apiParam {String=user,admin} [role=user] User's role.
         * @apiSuccess (Sucess 201) {Object} user User's data.
         * @apiError {Object} 400 Some parameters may contain invalid values.
         * @apiError 401 Master access only.
         * @apiError 409 Email already registered.
         */
        this._router.post('/', RoutePayloadValidator(this._config, createSchema, false), createUser(this._config));
    }
}
