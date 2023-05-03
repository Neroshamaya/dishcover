import type {IRegistrationStrategy} from '../../domain/types/IRegistrationStrategy'
import UserRepository from '../repositories/UserRepository'
import {User} from '../../domain/models/User'
import bcrypt from 'bcrypt'

export default class EmailRegistrationStrategy implements IRegistrationStrategy {
    constructor(private userRepository: UserRepository){ }
    
    async register(email: string, password: string): Promise<User> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({salt, password: hashedPassword, email})
        const insertedUser = await this.userRepository.createUser(user)
        return insertedUser
    }
}