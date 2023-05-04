import { useState } from 'react'
import { FormError } from '../models/FormError'

export default function useFormErrors() {
  const [formErrors, setFormErrors] = useState<FormError[]>([])
  const getError = (fieldName: string) => {
    const foundError = formErrors.find((formError) => formError.label === 'fieldName')
    return
  }
}
