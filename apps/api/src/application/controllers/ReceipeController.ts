import { GetCommunityReceipes } from '../useCases/GetCommunityReceipes'
import { GetPersonalReceipes } from '../useCases/GetPersonalReceipes'
import { CreateReceipe } from '../useCases/CreateReceipe'
import { UpdateReceipe } from '../useCases/UpdateReceipe'
import { DeleteReceipe } from '../useCases/DeleteReceipe'

import type ReceipeRepository from '../repositories/ReceipeRepository'
import type JSONPresenter from '../presenters/JSONPresenter'
import { getPersonalReceipesQuerySchema } from '../useCases/queries/IgetPersonalReceipesQuery'
import { createReceipeQuerySchema } from '../useCases/queries/ICreateReceipeQuery'
import { updateReceipeQuerySchema } from '../useCases/queries/IUpdateReceipeQuery'
import { deleteReceipeQuerySchema } from '../useCases/queries/IDeleteReceipeQuery'

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
    const result = createReceipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new CreateReceipe(this.receipeRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async deleteReceipe(args: unknown) {
    const result = deleteReceipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new DeleteReceipe(this.receipeRepository, this.jsonPresenter)
    await useCase.execute(result.data)
  }

  async updateReceipe(args: unknown) {
    const result = updateReceipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new UpdateReceipe(this.receipeRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }
}
