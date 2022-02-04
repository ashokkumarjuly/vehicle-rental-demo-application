// import moment from 'moment';
// eslint-disable-next-line unicorn/import-style
import * as winston from 'winston';
// import * as DailyRotateFile from 'winston-daily-rotate-file';
import APP_CONFIG from './@core/app.config';

//
// Replaces the previous transports with those in the
// new configuration wholesale.
//

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    level: APP_CONFIG.logging.level,
    // format: winston.format.json(),
    format,
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
            filename: `${APP_CONFIG.logging.winstonDirectory}/error.log`,
            level: 'error'
        }),
        new winston.transports.File({
            filename: `${APP_CONFIG.logging.winstonDirectory}/combined.log`
        })
    ]
});

// logger.configure({
//     level: 'verbose',
//     transports: [
//         new DailyRotateFile({
//             filename: `${logDirectory}/app-%DATE%.log`,
//             datePattern: 'YYYY-MM-DD-HH',
//             zippedArchive: true,
//             maxSize: '5M', // 5MB
//             maxFiles: '1d'
//         })
//     ]
// });

if (APP_CONFIG.enableDebug === true) {
    logger.add(new winston.transports.Console());
}

export default logger;
