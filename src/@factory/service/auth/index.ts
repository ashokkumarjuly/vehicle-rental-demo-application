import IConfig from '../Config';
import { login } from './auth.service';

export const AuthFacades = (config: IConfig) => ({
    login: login(config)
});
