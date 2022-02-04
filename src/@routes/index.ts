/* istanbul ignore file */

// import * as express from 'express';
// import AppConfig from '../@core/app.config';
import { API_ROUTE, API_ROUTE_V1 } from '../constants';
import { JwtValidateApiRoutes } from '../@core/lib';
// import { rateLimiterAPI } from '../../lib/rateLimiterMiddleware';
import { ICoreConfig } from '../@core/ICoreConfig';
import AuthRoute from '../api/auth/route';

import MasterRoute from '../api/master/route';
import UserRoutes from '../api/v1/user/route';
import VehicleRoutes from '../api/v1/vehicle/route';
import RentalRoutes from '../api/v1/rental/route';
import InvoiceRoutes from '../api/v1/invoice/route';

// const ApiRateLimter = (_app: Application) => {
//     _app.use(`/api/*`, (req: any, res: Response, next: NextFunction) => {
//         const userId = req.user && req.user.id ? req.user.id : null;

//         const key = userId ? +userId : req.ip;
//         const pointsToConsume = userId ? 5 : 1;

//         rateLimiterAPI
//             .consume(key, pointsToConsume)
//             .then(() => {
//                 next();
//             })
//             .catch((_) => {
//                 res.status(429).send('Too Many Requests');
//             });
//     });
// };

export const AuthRoutes = (_config: ICoreConfig): void => {
    // To protect all API routes with JWT
    JwtValidateApiRoutes(_config.app);

    // To rate limit Api calls
    // ApiRateLimter(_config.app);

    _config.app.use(`${API_ROUTE}/auth`, new AuthRoute(_config)._router); // Authentication Routes
    _config.app.use(`${API_ROUTE}/master`, new MasterRoute(_config)._router); // Authentication Routes
};

export const ApiRoutesV1 = (_config: ICoreConfig): void => {
    // To protect all API routes with JWT
    JwtValidateApiRoutes(_config.app);

    _config.app.use(`${API_ROUTE_V1}/users`, new UserRoutes(_config)._router); // User Routes
    _config.app.use(`${API_ROUTE_V1}/vehicles`, new VehicleRoutes(_config)._router); // Vehicle Routes
    _config.app.use(`${API_ROUTE_V1}/rental`, new RentalRoutes(_config)._router); // Rental Routes
    _config.app.use(`${API_ROUTE_V1}/invoice`, new InvoiceRoutes(_config)._router); // Invoice Routes
    // ADD New Routes Here ....
};
