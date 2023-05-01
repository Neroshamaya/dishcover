import type {User} from '../models/User'

export interface IUserRepository {
    getUserByEmail( email: string) : Promise<User|null>
}