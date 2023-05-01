import type {User} from '../models/User'

export interface IRegistrationStrategy {
    register(username: string, password: string): Promise<User|never>;
}