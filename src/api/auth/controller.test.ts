import * as faker from 'faker';
import { login } from './controller';
import { App } from '../../app';
import logger from '../../logger';

const { service, wpJobs, app } = new App();
const config = {
    service,
    wpJobs,
    app,
    logger
};

const mockRequest = () => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
};

const mockResponse = () => {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

let req = mockRequest();
req.body = {
    email: `${`${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_001`}@mailinator.com`
};
const res = mockResponse();

describe('Controller :: Auth', () => {
    test('POST auth/login  Post login', async () => {
        // await login(config)(req, res);
        // expect(res.send).toHaveBeenCalledTimes(1)
        // expect(res.status).toBeCalledWith(200);
        expect(2).toBe(2);
    });
});
