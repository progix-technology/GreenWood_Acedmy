import { z } from 'zod'

/* ==========================================================================
   1. CONTACT FORM SCHEMA
   ========================================================================== */
export const contactSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Contact phone must be at least 10 digits').optional().or(z.literal('')),
  department: z.string().min(1, 'Please select an enquiry category'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
})

/* ==========================================================================
   2. LOGIN FORM SCHEMA
   ========================================================================== */
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid admin email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

/* ==========================================================================
   3. ADMISSION APPLICATION FORM SCHEMAS (Multi-Step Validation)
   ========================================================================== */
export const step1Schema = z.object({
  name: z.string().min(2, 'Student full name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Please select gender'),
  grade: z.string().min(1, 'Please select target grade'),
})

export const step2Schema = z.object({
  parentName: z.string().min(2, 'Parent / Guardian name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(10, 'Valid 10-digit mobile number is required'),
  address: z.string().min(5, 'Residential address is required'),
})

export const step3Schema = z.object({
  previousSchool: z.string().min(2, 'Previous school name is required'),
  lastClass: z.string().optional(),
  lastScore: z.string().optional(),
})

export const step4Schema = z.object({
  declaration: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the declaration to submit the application',
  }),
})

export const fullApplySchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema)
