import * as Joi from 'joi';
import { ONE_HOUR } from '../../../constants';

// SERVER Configurations
export default {
    NODE_ENV: Joi.string().allow('development', 'production', 'staging', 'local', 'qa').default('development'),
    LANG: Joi.string().allow('en', 'es').default('en'),
    TIMEZONE: Joi.string().default('+00:00'),
    API_RELEASE_VERSION: [Joi.string(), Joi.number()],
    API_BUILD_VERSION: [Joi.string(), Joi.number()],
    ENABLE_CORS: Joi.boolean().default(false),
    ENABLE_HTTPS: Joi.boolean().default(false),
    HTTP_PORT: [Joi.string(), Joi.number()],

    WINSTON_DIRECTORY: Joi.string().required(),
    WINSTON_LEVEL: Joi.string().allow('error', 'warn', 'info', 'verbose', 'debug', 'silly').default('info'),
    EXPRESS_MORGAN_DIRECTORY: Joi.string().required(),
    EXPRESS_MORGAN_LOG_FORMAT: Joi.string().default(':method :url :remote-addr :referrer :date :status'),

    MODEL_DB_NAME: Joi.string().default('sequelize'),

    // JWT Configurations
    JWT_ALGORITHM: Joi.string().default('HS256'),
    JWT_SECRET_ACCESS_TOKEN: Joi.string().required().description('JWT Secret required'),
    JWT_ACCESS_TOKEN_EXPIRED_IN: Joi.number().default(ONE_HOUR),
    JWT_SECRET_REFRESH_TOKEN: Joi.string().required().description('JWT Refresh Secret required'),
    JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN: Joi.number().default(ONE_HOUR),

    ENABLE_DEBUG: Joi.boolean().default(false),
    RATE_LIMITER: Joi.boolean().default(false).description('Rate limiter option should be boolean'),

    IS_LOCALE_URL: Joi.boolean().default(true),
    LOCALE_PATH: Joi.string(),
    LOCALE_MISSING_PATH: Joi.string(),
    TEST_COVERAGE_ENABLE: Joi.boolean().default(false),
    TEST_COVERAGE_PATH: Joi.string().default('coverage'),
    TEST_JEST_STARE_PATH: Joi.string().default('jest-stare')
};
