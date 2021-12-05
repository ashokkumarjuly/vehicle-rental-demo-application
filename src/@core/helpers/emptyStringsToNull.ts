/* istanbul ignore file */

import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(req.body)) {
            if (req.body[key] === '') {
                req.body[key] = null;
            }
        }
    }
    next();
};
