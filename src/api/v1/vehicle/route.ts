/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../../@core/ICoreConfig';
import { RoutePayloadValidator } from '../../../helpers';
import { getVehicles, createVehicle, updateVehicle } from './controller';
import { createSchema, updateSchema } from './route.validate';

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
         * @api {get} /vehicles/:id Retrieve user
         * @apiName RetrieveVehicles
         * @apiGroup Vehicle
         * @apiPermission public
         * @apiSuccess {Object} Vehicle data.
         * @apiError 404 Vehicles not found.
         */
        this._router.get('/', getVehicles(this._config));

        /**
         * @api {put} /vehicles Create vehicle
         * @apiName CreateVehicle
         * @apiGroup Vehicle
         * @apiPermission vehicle
         * @apiParam {String} access_token Vehicle access_token.
         * @apiSuccess {Object} Vehicle's data.
         * @apiError {Object} 400 Some parameters may contain invalid values.
         * @apiError 401 admin access only.
         */
        this._router.post('/', RoutePayloadValidator(this._config, createSchema, false), createVehicle(this._config));

        /**
         * @api {put} /vehicles/:uid Update vehicle
         * @apiName UpdateVehicle
         * @apiGroup Vehicle
         * @apiPermission vehicle
         * @apiParam {String} access_token Vehicle access_token.
         * @apiParam {String} [name] Vehicle's name.
         * @apiSuccess {Object} Vehicle's data.
         * @apiError {Object} 400 Some parameters may contain invalid values.
         * @apiError 401 admin access only.
         * @apiError 404 Vehicle not found.
         */
        this._router.put('/:uid', RoutePayloadValidator(this._config, updateSchema, false), updateVehicle(this._config));
    }
}
