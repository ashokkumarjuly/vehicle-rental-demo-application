import IConfig from '../Config';
import APP_CONFIG from '../../../@core/app.config';
import { IUserAttributes, ILoginSignature } from '../../models/interfaces';
import generateToken from '../../../@core/jwt/generateToken';
import { ValidateIsActiveUserAccount } from '../../../@core/utils';
import { InvalidCredentialsError } from '../../../@core/helpers/errors';
import { ComparePassword } from '../../../@core/lib';

export const login =
    (config: IConfig): ILoginSignature =>
    async ({ email, password }) => {
        try {
            const userRow: IUserAttributes = await config.db.getUserByEmail({ email });

            await ValidateIsActiveUserAccount(userRow);

            const match: boolean = await ComparePassword(password, userRow.password);

            if (!match) throw new InvalidCredentialsError();

            const uid = userRow?.uid as string;

            const token: string = await generateToken({
                data: { uid },
                expiresIn: APP_CONFIG.jwt.secretaccessTokenExpiresIn
            });
            const refreshToken: string = await generateToken({
                data: { uid },
                expiresIn: APP_CONFIG.jwt.secretRefreshTokenExpiresIn
            });

            const user: IUserAttributes = await config.db.getUserById({ uid });

            delete user.password;

            return { user, token, refreshToken };
        } catch (error) {
            config.logger.error({ fn: 'verifyLoginOtp', type: 'Service output', resp: 'error', err: error });

            throw error;
        }
    };
