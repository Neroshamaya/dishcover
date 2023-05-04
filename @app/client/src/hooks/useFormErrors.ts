import { useState } from 'react'
import { FormError } from '../models/FormError'

export default function useFormErrors() {
  const [formErrors, setFormErrors] = useState<FormError[]>([])
  const getError = (fieldName: string) =>
    formErrors.find((formError) => formError.name === fieldName)?.message || ''

  return { formErrors, setFormErrors, getError }
}
