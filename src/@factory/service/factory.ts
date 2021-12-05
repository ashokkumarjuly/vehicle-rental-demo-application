import dbFactory from '../repo/factory';
import facade from './facade';
import logger from '../../logger';
import Service from './Service';

export const db = dbFactory();

export default (): Service =>
    facade({
        db,
        logger
    });
