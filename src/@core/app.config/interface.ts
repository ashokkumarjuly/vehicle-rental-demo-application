import { Algorithm } from 'jsonwebtoken';
import { Dialect } from 'sequelize/types';

export interface IAppEmails {
    SITE_EMAIL: string;
    CONTACT_EMAIL: string;
    NO_REPLY_EMAIL: string;
    BCC_EMAIL: string[];
}
export interface IAppConfig {
    lang: string;
    timezone: string;
    env: string;
    isLocal: boolean;
    isDev: boolean;
    isProduction: boolean;
    apiReleaseVersion: string;
    apiBuildVersion: string;
    enableCors: boolean;
    baseURL: string;
    enableDebug: boolean;
    enableHttps: boolean;
    express: {
        port: number;
        https_port: number;
        ViewEngine: string;
        viewPath: string;
        publicPath: string;
    };
    jwt: {
        secretAccessToken: string;
        secretaccessTokenExpiresIn: string;
        algoritm: Algorithm;
        secretRefreshToken: string;
        secretRefreshTokenExpiresIn: number;
    };
    modelDb: {
        DB_ORM_NAME: string;
        DB_LOG_QUERY: boolean;

        sequelize: {
            username: string;
            password: string;
            database: string;
            connectionOptions: {
                host: string;
                port: number;
                dialect: Dialect;
                logging: boolean | any;
                omitNull: boolean;
                timezone: string;
                define: {
                    underscored: boolean;
                    freezeTableName: boolean;
                    charset: string;
                    dialectOptions: {
                        collate: string;
                    };
                    timestamp: boolean;
                    created_at: string;
                    updated_at: string;
                };
            };
            operatorsAliases: string;
        };
    };
    logging: {
        level: string;
        winstonDirectory: string;
        morganDirectory: string;
        morganLogFormat: string;
    };
    swagger: {
        enable: boolean;
        path: string;
        url: string;
        username: string;
        password: string;
    };
    testSuite: {
        enable: boolean;
        coveragePath: string;
        jestStarePath: string;
    };
    locale: {
        isLocaleUrl: boolean;
        isLocalePath: string;
        isLocaleMissingPath: string;
    };
}

export interface IJwtPayload {
    data: {
        uid?: string;
        id?: number;
        account_id?: string;
        otp?: number;
    };
    expiresIn?: string | number;
}
export interface IRequestUser {
    id: number;
    user_id: number;
    uid: string;
    role_id: number;
    email: string;
}
