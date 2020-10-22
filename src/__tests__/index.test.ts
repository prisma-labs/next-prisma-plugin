import withPrismaPlugin from '../index'

describe('withPrismaPlugin', () => {
  it('should keep nextConfig object properties in other phases', () => {
    const nextConfig = { foo: 'bar' }

    const newConfig = withPrismaPlugin(nextConfig)('phase-export', {})
    expect(newConfig).toEqual(nextConfig)
  })

  it('should call nextConfig function in other phases', () => {
    const nextConfig = () => ({ foo: 'bar' })

    const newConfig = withPrismaPlugin(nextConfig)('phase-export', {})
    expect(newConfig).toEqual(nextConfig())
  })

  it('should add webpack property', () => {
    const nextConfig = { foo: 'bar' }

    const newConfig = withPrismaPlugin(nextConfig)('phase-development-server', {})
    expect(newConfig).toHaveProperty('webpack')
  })
})
