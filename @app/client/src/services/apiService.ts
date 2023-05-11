import { ApiError } from '@dishcover/shared/types/Errors'
import {
  CreateIngredientQuery,
  CreateRecipeQuery,
  DeleteRecipeQuery,
  LoginQuery,
  RegisterQuery,
  UpdateIngredientQuery,
  UpdateRecipeQuery
} from '@dishcover/shared/types/requests'
import { RecipeDtoType } from '@dishcover/shared/types/resources'
import {
  CreateIngredientResponseBody,
  CreateRecipeResponseBody,
  GetIngredientsResponseBody,
  LoginResponseBody,
  UpdateIngredientResponseBody,
  UpdateRecipeResponseBody
} from '@dishcover/shared/types/responses'
import axios, { AxiosError, AxiosResponse } from 'axios'

import { API_URL, DISHCOVER_API_KEY } from '../configuration'

const instance = axios.create({
  baseURL: `${API_URL}/`,
  headers: {
    'x-api-key': DISHCOVER_API_KEY
  },
  timeout: 5000
})
export async function login(args: LoginQuery) {
  try {
    const { data } = await instance.post('/login/password', args)
    return { data: data as LoginResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data as ApiError<LoginQuery> }
    }
    throw error
  }
}

export async function register(args: RegisterQuery) {
  try {
    const { data } = await instance.post('/register/password', args)
    return { data: data as LoginResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data as ApiError<RegisterQuery> }
    }
    throw error
  }
}

export async function getIngredients() {
  try {
    const { data } = await instance.get('/ingredients')
    return { data: data as GetIngredientsResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}

export async function createIngredient(args: CreateIngredientQuery, token: string) {
  try {
    const { data } = await instance.post('/ingredients', args, {
      headers: { 'x-access-token': token }
    })
    return { data: data as CreateIngredientResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data as ApiError<CreateIngredientQuery> }
    }
    throw error
  }
}

export async function updateIngredient(args: UpdateIngredientQuery, token: string) {
  try {
    const { data } = await instance.patch('/ingredients', args, {
      headers: { 'x-access-token': token }
    })
    return { data: data as UpdateIngredientResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}

export async function deleteIngredient(args: CreateIngredientQuery, token: string) {
  try {
    const { data } = await instance.delete('/ingredients', {
      data: args,
      headers: { 'x-access-token': token }
    })
    return { data: data }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function createRecipe(args: CreateRecipeQuery, token: string) {
  try {
    const { data } = await instance.post('/recipes', args, {
      headers: { 'x-access-token': token }
    })
    return { data: data as CreateRecipeResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data as ApiError<CreateRecipeQuery> }
    }
    throw error
  }
}

export async function updateRecipe(args: UpdateRecipeQuery, token: string) {
  try {
    const { data } = await instance.patch('/recipes', args, {
      headers: { 'x-access-token': token }
    })
    return { data: data as UpdateRecipeResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data as ApiError<UpdateRecipeQuery> }
    }
    throw error
  }
}

export async function deleteRecipe(args: DeleteRecipeQuery, token: string) {
  try {
    const { data } = await instance.delete('/recipes', {
      headers: { 'x-access-token': token },
      data: args
    })
    return { data: data }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}

export async function retrieveUserRecipes(token: string) {
  try {
    const { data }: AxiosResponse = await instance.get('/recipes/personal', {
      headers: { 'x-access-token': token }
    })
    return { data: data as RecipeDtoType[] }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}

export async function retrieveAllRecipes() {
  try {
    const { data } = await instance.get('/recipes/community')
    return { data: data as RecipeDtoType[] }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}
