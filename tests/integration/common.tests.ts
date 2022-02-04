import * as supertest from 'supertest';
import APP_CONFIG from '../../src/@core/app.config';
import app from '../../src/server';
const request = supertest(app);

beforeAll(async () => {
    if (
        (process.env.NODE_ENV && ['development', 'testing'].indexOf(process.env.NODE_ENV) === 0) ||
        (APP_CONFIG.env && ['development', 'testing'].indexOf(APP_CONFIG.env) === 0)
    ) {
        throw new Error('Testing is not allowed');
    }
});

let token: string = '';
let refreshToken: string = '';
test('API LOGIN :: POST api/auth/login', (done) => {
    request
        .post(`/api/auth/login`)
        .expect('Content-Type', /json/)
        .send({
            email: 'admin@mailinator.com',
            password: ''
        })
        .expect(200)
        .end(function (err, response) {
            console.log(err);
            if (err) return done(err);
            expect(response.body.success).toBe(true);
            expect(response.body.error).toBeUndefined();
            expect(response.body.body).toEqual(
                expect.objectContaining({
                    token: expect.any(String),
                    refreshToken: expect.any(String)
                })
            );
            token = response.body.body.token; //to save the login token for further requests
            return done();
        });
});

// After all tests have finished, close the connection
afterAll(async () => {
    app.close();
});

export {
    request,
    token, // export if token is generated
    refreshToken
};
