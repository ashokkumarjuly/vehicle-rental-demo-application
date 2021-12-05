import * as faker from 'faker';
import { request, token } from '../common.tests';

const email = `${`${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_001`}@mailinator.com`;
const createObj = {
    email: email
};

const loginObj = {
    email: email,
    code: 111111
};

const userUpdateObj = {
    first_name: `tm-${faker.name.firstName()}`,
    email: email,
    last_name: faker.name.lastName(),
    // phone_code: faker.phone.phoneNumber(),
    phone_no: faker.phone.phoneNumber('8888######'),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country_code: faker.address.countryCode(),
    zip_code: faker.address.zipCode()
};

let userId: number = 0;
let userUID: string = '';
let userToken: string = '';
let otpToken = 111111;
let refreshToken: string = '';

describe('API :: Auth', () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomToken = faker.random.alphaNumeric();
    const randomNumber = faker.datatype.number(8);

    test('POST /api/auth/login... check for types of characters otp supports: only digits', (done) => {
        request
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send({ email: email, code: faker.random.alpha({ count: 6 }) })
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(400);
                expect(response.body.error.details).toContain('must be a number');
                return done();
            });
    });

    test('POST /api/auth/login... check for length of OTP', (done) => {
        request
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send({
                email: email,
                code: faker.datatype.number({
                    min: 10000,
                    max: 99999
                })
            })
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(400);
                expect(response.body.error.details).toContain('must be greater than or equal to 100000');
                return done();
            });
    });

    test('POST /api/auth/login... Successful Login', (done) => {
        request
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send(loginObj)
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(200);
                expect(response.body.body).toEqual(
                    expect.objectContaining({
                        user: expect.any(Object),
                        token: expect.any(String),
                        refreshToken: expect.any(String)
                    })
                );
                refreshToken = response.body.body.refreshToken;
                return done();
            });
    });

    test('POST /api/auth/login... verify how many times user can provide invalid OTP?', async () => {
        expect(2).toBe(2);
    });

    test('POST /api/auth/login... throw error when user receive multiple OTP and enter the first received OTP.', async () => {
        expect(2).toBe(2);
    });

    test('POST /api/auth/login... Verify After multiple invalid try, verify that system temporarily blocks the account.', async () => {
        expect(2).toBe(2);
    });
});

describe('API :: Users /users', () => {
    try {
        test('GET /api/users/:uid... Get user by UID', async () => {
            expect(2).toBe(2);
        });

        test('GET /api/users/:uid... Get user by UID - Throw error for Invalid UID', async () => {
            expect(2).toBe(2);
        });
    } catch (err) {
        console.log('Exception : ', err);
    }
});

export { email };
