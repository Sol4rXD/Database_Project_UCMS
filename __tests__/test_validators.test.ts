import { describe, it, expect } from 'vitest'

// Helper function for Student ID (Numeric check)
const validateStudentId = (id: string) => /^\d+$/.test(id)
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

describe('test_validators: Data Validation System', () => {
  it('should accept a numeric student ID (Test 6)', () => {
    expect(validateStudentId('1234567890')).toBe(true)
  })

  it('should reject a non-numeric student ID (Test 7)', () => {
    expect(validateStudentId('123abc456')).toBe(false)
  })

  it('should accept a valid email (Test 8)', () => {
    expect(validateEmail('test@email.com')).toBe(true)
  })

  it('should reject an invalid email without @ (Test 9)', () => {
    expect(validateEmail('testemail.com')).toBe(false)
  })

  it('should reject an email without domain (Test 10)', () => {
    expect(validateEmail('test@email')).toBe(false)
  })
})
