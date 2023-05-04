import { useState } from 'react'
import { FormError } from '../models/FormError'

export default function useFormErrors() {
  const [formErrors, setFormErrors] = useState<FormError[]>([])
}
