import { GetCommunityReceipes } from '../useCases/GetCommunityReceipes'
import { GetPersonalReceipes } from '../useCases/GetPersonalReceipes'
import { CreateReceipe } from '../useCases/CreateReceipe'
import { UpdateReceipe } from '../useCases/UpdateReceipe'
import { DeleteReceipe } from '../useCases/DeleteReceipe'

import type ReceipeRepository from '../repositories/ReceipeRepository'
import type JSONPresenter from '../presenters/JSONPresenter'
import { getPersonalReceipesQuerySchema } from '../useCases/queries/IGetPersonalRecipesQuery'
import { CreateReceipeQuerySchema } from '../useCases/queries/ICreateRecipeQuery'
import { UpdateRecipeQuerySchema } from '../useCases/queries/IUpdateRecipeQuery'
import { DeleteRecipeQuerySchema } from '../useCases/queries/IDeleteRecipeQuery'

import ValidationError from '../errors/ValidationError'

export default class ReceipeController {
  constructor(private receipeRepository: ReceipeRepository, private jsonPresenter: JSONPresenter) {}

  async retrieveAllFromUser(args: unknown) {
    const result = getPersonalReceipesQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new GetPersonalReceipes(this.receipeRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async retrieveAllExceptFromUser(args: unknown) {
    const result = getPersonalReceipesQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new GetCommunityReceipes(this.receipeRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async createReceipe(args: unknown) {
    const result = CreateReceipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new CreateReceipe(this.receipeRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async deleteReceipe(args: unknown) {
    const result = DeleteRecipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new DeleteReceipe(this.receipeRepository, this.jsonPresenter)
    await useCase.execute(result.data)
  }

  async updateReceipe(args: unknown) {
    const result = UpdateRecipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new UpdateReceipe(this.receipeRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }
}
