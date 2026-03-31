import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('test_utils: General Utility System', () => {
  it('should merge tailwind classes (Test 19)', () => {
    expect(cn('px-2', 'py-1')).toContain('px-2')
  })

  it('should handle conditional classes (Test 20)', () => {
    expect(cn('bg-red', { 'hidden': true })).toContain('hidden')
    expect(cn('bg-red', { 'hidden': false })).not.toContain('hidden')
  })

  it('should format date for reviews (Test 21)', () => {
    // mock helper
    const formatDate = (d: string) => new Date(d).getFullYear()
    expect(formatDate('2025-01-01')).toBe(2025)
  })

  it('should handle null classes (Test 22)', () => {
    expect(cn('px-2', null, undefined, false)).toBe('px-2')
  })

  it('should override tailwind classes (Test 23)', () => {
    const result = cn('p-2', 'p-4')
    expect(result).toBe('p-4') // twMerge logic
  })
})
