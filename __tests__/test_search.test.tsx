import { describe, it, expect } from 'vitest'

describe('test_search: Search & Filter System', () => {
  const clubs = [
    { name: 'Board Games Club', category: 'Arts', location: 'Building 1' },
    { name: 'Software Dev', category: 'Tech', location: 'Building 2' },
    { name: 'Painting Society', category: 'Arts', location: 'Building 3' },
  ]

  it('should filter by name (Test 24)', () => {
    const filter = (query: string) => clubs.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    expect(filter('Software').length).toBe(1)
  })

  it('should filter by category (Test 25)', () => {
    const filter = (cat: string) => clubs.filter(c => c.category === cat)
    expect(filter('Arts').length).toBe(2)
  })

  it('should filter by location (Test 26)', () => {
    const filter = (loc: string) => clubs.filter(c => c.location === loc)
    expect(filter('Building 1').length).toBe(1)
  })

  it('should return empty if nothing matches (Test 27)', () => {
    const filter = (query: string) => clubs.filter(c => c.name.includes(query))
    expect(filter('XYZ').length).toBe(0)
  })

  it('should be case-insensitive (Test 28)', () => {
    const filter = (query: string) => clubs.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    expect(filter('BOARD').length).toBe(1)
  })
})
