import { z } from 'zod'
import { IDomainModel} from '../types/IDomainModel'
import { ObjectId } from 'bson'

export const userSchema = z.object({
    id: z.string().refine((id => ObjectId.isValid(id))).optional(),
    email: z.string().email(),
    salt: z.string(),
    password: z.string(),
    created: z.date().optional().nullable(),
    updated: z.date().optional().nullable()
})

export type UserDtoType = z.infer<typeof userSchema>

export class User implements IDomainModel<UserDtoType> {
    constructor(private readonly userInfos: UserDtoType) {
        this.validate()
    }

    getDto(): UserDtoType {
        return {
            id: this.userInfos.id,
            email: this.userInfos.email,
            salt: this.userInfos.salt,
            password: this.userInfos.password,
            created: this.userInfos.created,
            updated: this.userInfos.updated
        }
    }
    validate() {
        userSchema.parse(this.userInfos)
    }
}
