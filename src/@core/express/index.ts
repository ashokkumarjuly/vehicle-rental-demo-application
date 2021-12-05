/* istanbul ignore file */

import { Router } from 'express';
import * as passport from 'passport';

import {
    handleMethodOveride,
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleEmptryStringInRequest,
    handleCookieParser,
    handleHelmet
} from '../middlewares';

import { AuthRoutes, ApiRoutesV1 } from '../../@routes';

import { LogRotate, SwaggerEnable, ExpressSession, EnableTranslation } from '../lib';
import { JwtStrategy } from '../passport/strategies';
import { ICoreConfig } from '../ICoreConfig';

export default class {
    public _router: Router;

    public _config: ICoreConfig;

    constructor(config: ICoreConfig) {
        this._router = Router();
        // this._api_router = Router();
        this._config = config;

        this.enableRouteMiddleware();

        ExpressSession(this._config.app); // To enable express session and cookies

        this.enablePassport();

        EnableTranslation(this._config.app); // To enable i18next Translation

        // Initate Routes here ...
        AuthRoutes(this._config); // Auth API Routes
        ApiRoutesV1(this._config); // API Routes V1

        // Documentation
        SwaggerEnable(this._config.app); // Enable Swagger
    }

    public enableRouteMiddleware(): void {
        handleMethodOveride(this._config);
        handleCors(this._config);
        handleBodyRequestParsing(this._config);
        handleCompression(this._config);
        handleEmptryStringInRequest(this._config);
        handleCookieParser(this._config);
        handleHelmet(this._config);
        LogRotate(this._config.app); // To enable daily log file rotation
    }

    /**
     * To enable passport and strategies for authorization and authentication
     * Social authentication is enabled based on env configuration
     */
    public enablePassport(): void {
        this._config.app.use(passport.initialize());

        // Authenticatoin via JWT Strategy
        new JwtStrategy({
            service: this._config.service,
            logger: this._config.logger
        })._init();

        passport.serializeUser((user: Express.User, cb) => cb(null, user));
        passport.deserializeUser((obj: Express.User | false | null, cb) => cb(null, obj));
    }
}
