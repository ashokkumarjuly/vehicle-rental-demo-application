/* istanbul ignore file */

import { Request } from 'express';
import * as url from 'url';
import { AUTH_HEADER_NAME, AUTH_BODY_FIELD_NAME, AUTH_PARAM_NAME, AUTH_SCHEME_NAME } from '../../constants';
import { MissingJwtTokenError } from '../helpers/errors';

export type Extractor = (req: Request) => string | null;

export interface FromHeaderExtractorOptions {
    headerName: string;
}

export const createFromHeaderExtractor =
    (options: FromHeaderExtractorOptions) =>
    (req: Request): string | null => {
        if (typeof req.headers[options.headerName] === 'string') {
            return (req.headers as any)[options.headerName] || null;
        }
        return null;
    };

export interface FromBodyFieldExtractorOptions {
    fieldName: string;
}

export const createFromBodyFieldExtractor =
    (options: FromBodyFieldExtractorOptions) =>
    (req: Request): string | null => {
        if (req.body && typeof req.body[options.fieldName] === 'string') {
            return req.body[options.fieldName];
        }
        return null;
    };

export interface FromQueryParamExtractorOptions {
    paramName: string;
}

export const createFromUrlQueryParameter =
    (options: FromQueryParamExtractorOptions) =>
    (req: Request): string | null => {
        const parsedUrl = url.parse(req.url, true);
        if (parsedUrl && parsedUrl.query && typeof (parsedUrl.query as any)[options.paramName] === 'string') {
            return (parsedUrl.query as any)[options.paramName];
        }
        return null;
    };

export interface AuthSchemeExtractorOptions {
    authSchemeName: string;
}

export const createFromAuthScheme =
    (options: AuthSchemeExtractorOptions) =>
    (req: Request): string | null => {
        const authScheme: string = options.authSchemeName.toLowerCase();
        const header: any = req.headers[AUTH_HEADER_NAME];

        if (typeof header === 'string') {
            const matches: any = header.match(/(\S+)\s+(\S+)/);
            if (
                matches &&
                matches[1] &&
                matches[2] &&
                matches[1].toLowerCase() === authScheme &&
                typeof matches[2] === 'string'
            ) {
                return matches[2];
            }
            return header;
        }
        return null;
    };

export type ExtractTokenFromRequestSignature = (options: IOptions) => string;

export interface IConfig {
    extractors: Extractor[];
}

export interface IOptions {
    req: Request;
}

const defaultConfig = {
    extractors: [
        createFromBodyFieldExtractor({ fieldName: AUTH_BODY_FIELD_NAME }),
        createFromUrlQueryParameter({ paramName: AUTH_PARAM_NAME }),
        createFromAuthScheme({ authSchemeName: AUTH_SCHEME_NAME })
    ]
};

export const createExtractTokenFromRequest =
    (config: IConfig = defaultConfig) =>
    (options: IOptions): string => {
        if (config.extractors.length === 0) {
            throw new MissingJwtTokenError();
        }
        // eslint-disable-next-line unicorn/no-array-reduce
        const token = config.extractors.reduce(
            (accumulator: any, extractor: any) => accumulator || extractor(options.req) || null,
            null
        );

        if (token === null) throw new MissingJwtTokenError();
        return token;
    };
