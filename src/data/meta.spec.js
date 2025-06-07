import { teal, grey } from '@mui/material/colors'
import META from './meta'

describe('META', () => {
  it('has the correct structure', () => {
    expect(META).toHaveProperty('appTitle')
    expect(META).toHaveProperty('authorUrl')
    expect(META).toHaveProperty('colors')
    expect(META).toHaveProperty('hostname')
    expect(META).toHaveProperty('repoUrl')
  })

  it('has the correct app title', () => {
    expect(META.appTitle).toBe('Teacher Salary Info')
  })

  it('has the correct author URL', () => {
    expect(META.authorUrl).toBe('https://www.chrisvogt.me')
  })

  it('has the correct hostname', () => {
    expect(META.hostname).toBe('teachersalary.info')
  })

  it('has the correct repo URL', () => {
    expect(META.repoUrl).toBe('https://github.com/chrisvogt/teacher-salaries')
  })

  it('has the correct color values', () => {
    expect(META.colors.primary).toBe(teal[900])
    expect(META.colors.dark).toBe(grey[900])
  })
}) 