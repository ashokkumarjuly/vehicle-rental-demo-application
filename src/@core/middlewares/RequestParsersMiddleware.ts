/* istanbul ignore file */

import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
// import i18nextMiddleware from 'i18next-http-middleware';
import { ICoreConfig } from '../ICoreConfig';
import { EmptyStringsToNull } from '../helpers';
// import { i18next } from '../lib';

export const handleCookieParser = (_config: ICoreConfig): void => {
    _config.app.use(cookieParser());
};

export const handleMethodOveride = (_config: ICoreConfig): void => {
    _config.app.use(methodOverride('X-HTTP-Method')); //          Microsoft
    _config.app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
    _config.app.use(methodOverride('X-Method-Override')); //      IBM
};

export const handleBodyRequestParsing = (_config: ICoreConfig): void => {
    _config.app.use(bodyParser.urlencoded({ extended: true }));
    _config.app.use(bodyParser.json());
};

export const handleCompression = (_config: ICoreConfig): void => {
    _config.app.use(compression());
};

export const handleEmptryStringInRequest = (_config: ICoreConfig): void => {
    _config.app.use(EmptyStringsToNull);
};

export const handleHelmet = (_config: ICoreConfig): void => {
    _config.app.use(helmet());
};

export const handleCors = (_config: ICoreConfig): void => {
    _config.app.use(
        cors({
            origin: '*',
            preflightContinue: false
        })
    );
};
