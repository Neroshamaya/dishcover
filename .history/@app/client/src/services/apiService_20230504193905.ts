import axios, { isCancel, AxiosError, AxiosResponse } from 'axios'
import { API_URL } from '../configuration'
import {
  CreateIngredientQuery,
  LoginQuery,
  LoginResponseBody,
  CreateIngredientResponseBody,
  CreateRecipeQuery,
  CreateRecipeResponseBody,
  RecipeDtoType
} from '@dishcover/shared'
const instance = axios.create({
  baseURL: `${API_URL}/`,
  timeout: 1000
})
export async function login(args: LoginQuery) {
  try {
    const { data } = await instance.post('/login/password', args)
    return { data: data as LoginResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function register(args: LoginQuery) {
  try {
    const { data } = await instance.post('/register/password', args)
    return { data: data as LoginResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function createIngredient(args: CreateIngredientQuery, token: string) {
  try {
    const { data } = await instance.post('/ingredients', {
      headers: { Authorization: `Bearer ${token}` },
      data: args
    })
    return { data: data as CreateIngredientResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function updateIngredient(args: CreateIngredientQuery, token: string) {
  try {
    const { data } = await instance.patch('/ingredients', {
      headers: { Authorization: `Bearer ${token}` },
      data: args
    })
    return { data: data as CreateIngredientResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}

export async function deleteIngredient(args: CreateIngredientQuery, token: string) {
  try {
    const { data } = await instance.delete('/ingredients', {
      data: args,
      headers: { Authorization: `Bearer ${token}` }
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
    const { data } = await instance.post('/login/password', {
      data: args,
      headers: { Authorization: `Bearer ${token}` }
    })
    return { data: data as CreateRecipeResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}

export async function updateRecipe(args: CreateRecipeQuery, token: string) {
  try {
    const { data } = await instance.post('/register/password', {
      headers: { Authorization: `Bearer ${args.token}` }
    })
    return { data: data as CreateRecipeResponseBody }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
    throw error
  }
}

export async function deleteRecipe(args: CreateIngredientQuery, token: string) {
  try {
    const { data } = await instance.post('/register/password', {
      headers: { Authorization: `Bearer ${token}` }
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
      headers: { Authorization: `Bearer ${token}` }
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
    const { data } = await instance.get('/recipes/personal')
    return { data: data as RecipeDtoType[] }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data }
    }
  }
}
