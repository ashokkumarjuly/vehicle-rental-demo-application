import * as faker from 'faker';
import { db } from '../factory';
import { createUser, getUserByEmail, getUserById } from './user.service';
import logger from '../../../logger';

const config = { db, logger };

describe('Service->User::', () => {
    const userObj = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role_id: Math.floor(Math.random() * (3 - 1) + 1)
    };
    const userUpdateObj = {
        first_name: `test-${faker.name.firstName()}`,
        last_name: faker.name.lastName(),
        // phone_code: faker.phone.phoneNumber(),
        phone_no: faker.phone.phoneNumber('8888######'),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.countryCode(),
        zip_code: faker.address.zipCode()
    };
    let uid = '';
    let emailToken: string = '';

    test('createUser... expect to be user object', async () => {
        const data = await createUser(config)({ data: userObj });
        if (data.uid) {
            uid = data.uid;
        }

        expect(data).toEqual(
            expect.objectContaining({
                email: userObj.email
            })
        );
    });

    test('getUserByEmail...  expect to be user object', async () => {
        const data = await getUserByEmail(config)({ email: userObj.email });
        expect(data).toEqual(
            expect.objectContaining({
                email: userObj.email
            })
        );
    });
    test('getUserById...  expect to be user object', async () => {
        const data = await getUserById(config)({ uid });
        expect(data).toEqual(
            expect.objectContaining({
                email: userObj.email,
                uid
            })
        );
    });
});
