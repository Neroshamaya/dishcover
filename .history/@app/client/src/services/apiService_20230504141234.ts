import axios, { isCancel, AxiosError, AxiosResponse } from 'axios'
import { API_URL } from '../configuration'
import {
  CreateIngredientQuery,
  LoginQuery,
  LoginResponseBody,
  CreateIngredientResponseBody,
  CreateRecipeQuery,
  CreateRecipeResponseBody
} from '@dishcover/shared'
const instance = axios.create({
  baseURL: `${API_URL}/`,
  timeout: 1000
})
export async function login(args: LoginQuery) {
  try {
    const { data }: AxiosResponse = await instance.post('/login/password', args)
    return { data: data as LoginResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function register(args: LoginQuery) {
  try {
    const { data }: AxiosResponse = await instance.post('/register/password', args)
    return { data: data as LoginResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function createIngredient(args: CreateIngredientQuery) {
  try {
    const { data }: AxiosResponse = await instance.post('/ingredients', args)
    return { data: data as CreateIngredientResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function updateIngredient(args: CreateIngredientQuery) {
  try {
    const { data }: AxiosResponse = await instance.patch('/ingredients', args)
    return { data: data as CreateIngredientResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function deleteIngredient(args: CreateIngredientQuery) {
  try {
    const { data }: AxiosResponse = await instance.delete('/ingredients', {
      data: args
    })
    return { data: data }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function createRecipe(args: CreateRecipeQuery) {
  try {
    const { data }: AxiosResponse = await instance.post('/login/password', args)
    return { data: data as CreateRecipeResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function updateRecipe(args: CreateRecipeQuery) {
  try {
    const { data }: AxiosResponse = await instance.post('/register/password', args)
    return { data: data as CreateRecipeResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function deleteRecipe(args: CreateIngredientQuery) {
  try {
    const { data }: AxiosResponse = await instance.post('/register/password', args)
    return { data: data }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}
