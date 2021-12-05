export const MAX_PAGINATION_LIMIT = 500;
export const DEFAULT_PAGINATION_LIMIT = 20;
export const DEFAULT_PAGINATION_OFFSET = 0;
export const DEFAULT_HOME_PAGINATION_LIMIT = 10;
export const DEFAULT_SORT_ORDER = [['created_at', 'desc']];
export const ONE_HOUR = 3600; // seconds
export const TWO_HOURS = 7200; // seconds

export const API_ROUTE = '/api';
export const API_ROUTE_V1 = '/api/v1';
export const AUTH_HEADER_NAME = 'authorization';
export const AUTH_BODY_FIELD_NAME = 'auth_token';
export const AUTH_PARAM_NAME = 'auth_token';
export const AUTH_SCHEME_NAME = 'JWT';

export const SITE = {
    Name: 'Vehicle Rental'
};
export const APP_PATHS = {
    JWT_EXCLUDED: [`${API_ROUTE_V1}/auth/login`]
};

export const PAYMENT_STATUS = {
    PAID: 1,
    PENDING: 2
};

export const RENT_TYPE = {
    HOURLY: 1,
    DAILY: 2
};

export const TIME_OUT = {
    RATE_LIMITER_DURATION: 1,
    RESET_PASSWORD_EXPIRES_IN: 3600
};

export const LOGGER = {
    CLEANUP_ON_LOGIN: 0, // change to 0 when cron job is configured
    CLEANUP_OLDER_LOGS: 30 // clean logs older than 30 days
};
