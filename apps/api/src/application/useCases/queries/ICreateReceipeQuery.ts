import { z } from 'zod'
import {receipeSchema} from '../../../domain/models/Receipe'
export const createReceipeQuerySchema = receipeSchema
export type ICreateReceipeQuery = z.infer<typeof createReceipeQuerySchema>