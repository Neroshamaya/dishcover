import type {Receipe} from '../models/Receipe'

export default interface IReceipeRepository {
    retrieveAllFromUser( userId: string) : Promise<Receipe[]>
    retrieveAllExceptFromUser( userId: string) : Promise<Receipe[]>
}