/* istanbul ignore file */

import * as Joi from 'joi';
import * as dotenv from 'dotenv';
// eslint-disable-next-line unicorn/import-style
import * as path from 'path';
import { dbSchema, siteSchema } from './schema';
import { IAppConfig } from './interface';

const appConfig = (): IAppConfig => {
    try {
        let EnvFile = `.env.local`;

        switch (process.env.NODE_ENV) {
            case 'staging':
                EnvFile = `.env.staging`;
                break;
            case 'production':
                EnvFile = `.env.production`;
                break;
            case 'testing':
                EnvFile = `.env.testing`;
                break;
            case 'qa':
                EnvFile = `.env.qa`;
                break;
            case 'development':
                EnvFile = `.env.development`;
                break;
            default:
                EnvFile = `.env.local`;
        }
        dotenv.config({ path: path.join(__dirname, '../../../', EnvFile) });

        // define validation for all the env vars
        const { error, value } = Joi.object({
            ...siteSchema,
            ...dbSchema
        })
            .unknown()
            .required()
            .validate(process.env);

        if (error) {
            throw new Error(`EnvFile: ${EnvFile}, Configuration Missing error...: ${error.message}`);
        }

        const envVars = value; // env variables from dotenv and Joi object

        if (['development', 'local', 'staging', 'production'].includes(process.env.NODE_ENV || envVars.NODE_ENV) === false) {
            throw new Error(`Configuration Error...: Invalid Application mode`);
        }

        return {
            lang: process.env.LANG || envVars.LANG,
            timezone: process.env.TIMEZONE || envVars.TIMEZONE,
            env: process.env.NODE_ENV || envVars.NODE_ENV,
            isLocal:
                process.env.NODE_ENV || envVars.NODE_ENV ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'local' : false,
            isDev:
                process.env.NODE_ENV || envVars.NODE_ENV
                    ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'development'
                    : false,
            isProduction:
                process.env.NODE_ENV || envVars.NODE_ENV
                    ? (process.env.NODE_ENV || envVars.NODE_ENV) === 'production'
                    : false,
            baseURL: process.env.BASE_URL || envVars.BASE_URL,
            apiReleaseVersion: process.env.API_RELEASE_VERSION || envVars.API_RELEASE_VERSION,
            apiBuildVersion: process.env.API_BUILD_VERSION || envVars.API_BUILD_VERSION,

            enableCors:
                process.env.ENABLE_CORS || envVars.ENABLE_CORS
                    ? (process.env.ENABLE_CORS || envVars.ENABLE_CORS) === 'true'
                    : false,
            enableDebug:
                process.env.ENABLE_DEBUG || envVars.ENABLE_DEBUG
                    ? (process.env.ENABLE_DEBUG || envVars.ENABLE_DEBUG) === 'true'
                    : false,
            enableHttps:
                process.env.ENABLE_HTTPS || envVars.ENABLE_HTTPS
                    ? (process.env.ENABLE_HTTPS || envVars.ENABLE_HTTPS) === 'true'
                    : false,
            express: {
                port: process.env.HTTP_PORT || envVars.HTTP_PORT,
                https_port: process.env.HTTPS_PORT || envVars.HTTPS_PORT,
                ViewEngine: process.env.VIEW_ENGINE || envVars.VIEW_ENGINE,
                viewPath: path.join(__dirname, `../../${process.env.APP_PATH_TEMPLATE || envVars.APP_PATH_TEMPLATE}`),
                publicPath: path.join(__dirname, `../../${process.env.APP_PATH_PUBLIC || envVars.APP_PATH_PUBLIC}`)
            },
            jwt: {
                secretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN || envVars.JWT_SECRET_ACCESS_TOKEN,
                secretaccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN || envVars.JWT_ACCESS_TOKEN_EXPIRED_IN,
                algoritm: process.env.JWT_ALGORITHM || envVars.JWT_ALGORITHM,
                secretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN || envVars.JWT_SECRET_REFRESH_TOKEN,
                secretRefreshTokenExpiresIn:
                    process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN || envVars.JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN
            },
            modelDb: {
                DB_ORM_NAME: process.env.DB_ORM_NAME || envVars.DB_ORM_NAME,
                DB_LOG_QUERY: process.env.DB_LOG_QUERY || envVars.DB_LOG_QUERY,
                sequelize: {
                    username: process.env.DB_USERNAME || envVars.DB_USERNAME,
                    password: process.env.DB_PASSWORD || envVars.DB_PASSWORD,
                    database: process.env.DB_NAME || envVars.DB_NAME,
                    connectionOptions: {
                        host: process.env.DB_HOSTNAME || envVars.DB_HOSTNAME,
                        port: process.env.DB_PORT || envVars.DB_PORT,
                        dialect: process.env.DB_DIALECT || envVars.DB_DIALECT,
                        logging: (process.env.DB_LOG_QUERY || envVars.DB_LOG_QUERY) === 'true' ? console.log : false,
                        omitNull: true,
                        timezone: process.env.TIMEZONE || envVars.TIMEZONE,
                        define: {
                            underscored: true,
                            freezeTableName: true,
                            charset: 'utf8',
                            dialectOptions: {
                                collate: 'utf8_general_ci'
                            },
                            timestamp: true,
                            created_at: 'created_at',
                            updated_at: 'updated_at'
                        }
                    },
                    operatorsAliases: process.env.DB_OPERATOR_ALIASES || envVars.DB_OPERATOR_ALIASES
                }
            },
            logging: {
                winstonDirectory: path.join(
                    __dirname,
                    `../../../${process.env.WINSTON_DIRECTORY || envVars.WINSTON_DIRECTORY}`
                ),
                level: process.env.WINSTON_LEVEL || envVars.WINSTON_LEVEL,
                morganDirectory: path.join(
                    __dirname,
                    `../../../${process.env.EXPRESS_MORGAN_DIRECTORY || envVars.EXPRESS_MORGAN_DIRECTORY}`
                ),
                morganLogFormat: process.env.EXPRESS_MORGAN_LOG_FORMAT || envVars.EXPRESS_MORGAN_LOG_FORMAT
            },
            swagger: {
                enable:
                    process.env.SWAGGER_ENABLE || envVars.SWAGGER_ENABLE
                        ? (process.env.SWAGGER_ENABLE || envVars.SWAGGER_ENABLE) === 'true'
                        : false,
                path: path.join(__dirname, `../../../${process.env.SWAGGER_PATH || envVars.SWAGGER_PATH}`),
                url: process.env.SWAGGER_URL || envVars.SWAGGER_URL,
                username: process.env.SWAGGER_USERNAME || envVars.SWAGGER_USERNAME,
                password: process.env.SWAGGER_PASSWORD || envVars.SWAGGER_PASSWORD
            },
            testSuite: {
                enable:
                    process.env.TEST_COVERAGE_ENABLE || envVars.TEST_COVERAGE_ENABLE
                        ? (process.env.TEST_COVERAGE_ENABLE || envVars.TEST_COVERAGE_ENABLE) === 'true'
                        : false,
                coveragePath: path.join(
                    __dirname,
                    `../../../${process.env.TEST_COVERAGE_PATH || envVars.TEST_COVERAGE_PATH}`
                ),
                jestStarePath: path.join(
                    __dirname,
                    `../../../${process.env.TEST_JEST_STARE_PATH || envVars.TEST_JEST_STARE_PATH}`
                )
            },

            locale: {
                isLocaleUrl:
                    process.env.IS_LOCALE_URL || envVars.IS_LOCALE_URL
                        ? (process.env.IS_LOCALE_URL || envVars.IS_LOCALE_URL) === 'true'
                        : false,
                get isLocalePath() {
                    return this.isLocaleUrl === true
                        ? process.env.LOCALE_PATH || envVars.LOCALE_PATH
                        : path.join(__dirname, `../../${process.env.LOCALE_PATH || envVars.LOCALE_PATH}`);
                },
                get isLocaleMissingPath() {
                    return this.isLocaleUrl === true
                        ? process.env.LOCALE_MISSING_PATH || envVars.LOCALE_MISSING_PATH
                        : path.join(__dirname, `../../${process.env.LOCALE_MISSING_PATH || envVars.LOCALE_MISSING_PATH}`);
                }
            }
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default appConfig();
