import { Logger } from 'winston';
import Repo from '../repo/Db';

export default interface IConfig {
    // config: any;
    readonly db: Repo;
    readonly logger: Logger;
}
