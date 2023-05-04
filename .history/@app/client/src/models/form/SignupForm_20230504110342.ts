import z from 'zod'
const passwordSchema = z.string().min(8, 'Password must have 8 characters')
export const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword', 'password'] // path of error
  })
