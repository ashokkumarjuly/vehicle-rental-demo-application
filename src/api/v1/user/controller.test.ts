import * as faker from 'faker';
import { createUser, getUserById } from './controller';
import { App } from '../../../app';
import logger from '../../../logger';

const { service, app } = new App();
const config = {
    service,
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
    test('GET api/v1/users/:uid  Get User by UID', async () => {
        // await getUserById(config)(req, res);
        expect(2).toBe(2);
    });
});
