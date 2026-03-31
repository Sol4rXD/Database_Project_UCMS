import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '@/components/Card'
import React from 'react'

describe('test_clubs: Club Display System', () => {
  const mockClub = {
    name: 'Board Games Club',
    location: 'Building 1',
    imageSrc: '/test.png',
    isOpen: true,
    description: 'Come play board games!',
    slug: 'board-games'
  }

  it('should render club name (Test 11)', () => {
    render(<Card {...mockClub} />)
    expect(screen.getByText('Board Games Club')).toBeDefined()
  })

  it('should render club location (Test 12)', () => {
    render(<Card {...mockClub} />)
    expect(screen.getByText('Building 1')).toBeDefined()
  })

  it('should show "Open Now" when recruiting (Test 13)', () => {
    render(<Card {...mockClub} isOpen={true} />)
    expect(screen.getByText('Open Now')).toBeDefined()
  })

  it('should show "Closed" when not recruiting (Test 14)', () => {
    render(<Card {...mockClub} isOpen={false} />)
    expect(screen.getByText('Closed')).toBeDefined()
  })

  it('should have a link to club details (Test 15)', () => {
    render(<Card {...mockClub} />)
    expect(screen.getByRole('link')).toHaveProperty('href', expect.stringContaining('/club/board-games'))
  })
})
