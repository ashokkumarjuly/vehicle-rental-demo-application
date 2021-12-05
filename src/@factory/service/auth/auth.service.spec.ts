import * as faker from 'faker';
import { db } from '../factory';
import { login } from './auth.service';
import logger from '../../../logger';

const config = { db, logger };

describe('Service->Auth::', () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomToken = faker.random.alphaNumeric();
    const randomNumber = faker.datatype.number(8);
    let refreshToken: string = '';

    test('login... Verify the object returned user, token, refreshToken', async () => {
        const data = await login(config)({ email: randomEmail, password: 'password' });
        expect(data).toEqual(
            expect.objectContaining({
                user: expect.any(Object),
                token: expect.any(String),
                refreshToken: expect.any(String)
            })
        );

        if (data && data.refreshToken) {
            refreshToken = data.refreshToken;
        }
    });

    test('login... should throw error for invalid Password', async () => {
        await expect(login(config)({ email: randomEmail, password: `${randomNumber}` })).rejects.toEqual(
            expect.objectContaining({
                lang_key: 'auth.error.invalidVerificationCode'
            })
        );
    });
});
