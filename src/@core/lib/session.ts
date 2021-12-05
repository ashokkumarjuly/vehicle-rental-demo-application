/* istanbul ignore file */

import { Response, NextFunction, Application } from 'express';

import * as expressSession from 'express-session';
import APP_CONFIG from '../app.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const MemoryStore = require('memorystore')(expressSession);

const sessionConfig: any = {
    secret: APP_CONFIG.jwt.secretAccessToken,
    resave: true,
    saveUninitialized: true
    // store: new MemoryStore({
    //     checkPeriod: 86_400_000 // prune expired entries every 24h
    // })
};

export default (_app: Application): void => {
    sessionConfig.cookie =
        APP_CONFIG.enableHttps === true ? { secure: true } : { secure: false, maxAge: 4 * 60 * 60 * 1000 };

    _app.use(expressSession(sessionConfig));

    _app.use((req, res: Response, next: NextFunction) => {
        res.header('Access-Control-Expose-Headers', 'app-version');
        res.header('app-release-version', APP_CONFIG.apiReleaseVersion);
        res.header('api_build_version', APP_CONFIG.apiBuildVersion);
        next();
    });
};
