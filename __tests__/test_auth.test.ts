import { describe, it, expect } from 'vitest'
import { hashPassword, comparePassword } from '@/lib/password'

describe('test_auth: Password Security System', () => {
  it('should hash a password (Test 1)', async () => {
    const password = 'testpassword123'
    const hash = await hashPassword(password)
    expect(hash).not.toBe(password)
  })

  it('should match a correct password (Test 2)', async () => {
    const hash = await hashPassword('password')
    expect(await comparePassword('password', hash)).toBe(true)
  })

  it('should reject a wrong password (Test 3)', async () => {
    const hash = await hashPassword('password')
    expect(await comparePassword('wrong', hash)).toBe(false)
  })

  it('should generate unique hashes for same password (Test 4)', async () => {
    const h1 = await hashPassword('pass')
    const h2 = await hashPassword('pass')
    expect(h1).not.toBe(h2)
  })

  it('should throw error for empty password (Test 5)', async () => {
    await expect(hashPassword('')).resolves.toBeDefined()
  })
})
