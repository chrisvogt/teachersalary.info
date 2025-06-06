import '@testing-library/jest-dom'

// Suppress React deprecation warnings from Material-UI v0.20.2
const originalError = console.error
const originalWarn = console.warn
beforeAll(() => {
  console.error = (...args) => {
    if (args[0].includes('Warning: componentWillReceiveProps has been renamed')) return
    originalError.call(console, ...args)
  }
  console.warn = (...args) => {
    if (args[0].includes('Warning: React.createFactory()')) return
    originalWarn.call(console, ...args)
  }
})
afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Mock CSS modules
Object.defineProperty(window, 'CSS', { value: { supports: () => false } })

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock TextEncoder/TextDecoder if they don't exist
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('node:util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0)
global.cancelAnimationFrame = (id) => clearTimeout(id)


