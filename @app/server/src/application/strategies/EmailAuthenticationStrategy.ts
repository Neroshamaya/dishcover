import type {IAuthenticationStrategy} from '../../domain/types/IAuthenticationStrategy'
import UserRepository from '../repositories/UserRepository'
import {User} from '../../domain/models/User'
import bcrypt from 'bcrypt'
import WrongEmailPasswordComboError from '../errors/WrongEmailPasswordComboError'

export default class EmailAuthenticationStrategy implements IAuthenticationStrategy {
    constructor(private userRepository: UserRepository){ }
    async authenticate(email: string, password: string): Promise<never|User> {
        const user = await this.userRepository.getUserByEmail(email)
        if(!user){
            throw new WrongEmailPasswordComboError(new Error('Wrong email password combination'))
        }

        const passwordsMatch = await bcrypt.compare(password, user.getDto().password)
        if (passwordsMatch) {
            return user
        } else {
            throw new WrongEmailPasswordComboError(new Error('Wrong email password combination'))
        }
            
    }

    // logout(token: string): Promise<void> {
        
    // }
}