import { z } from 'zod'
import {receipeSchema} from '../../../domain/models/Receipe'
export const updateReceipeQuerySchema = receipeSchema
export type IUpdateReceipeQuery = z.infer<typeof updateReceipeQuerySchema>