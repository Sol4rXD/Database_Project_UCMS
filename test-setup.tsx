import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock matchMedia if needed for components like Framer Motion or Swiper
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// Mock AuthProvider
vi.mock('@/components/AuthProvider', () => ({
  useAuth: () => ({ 
    user: { id: '1', fullname: 'Test User', role: 'STUDENT' }, 
    loading: false,
    logout: vi.fn()
  }),
  AuthProvider: ({ children }: any) => <div>{children}</div>
}))

// Mock Radix/UI stuff if needed
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;
window.PointerEvent = class PointerEvent extends Event {} as any;
