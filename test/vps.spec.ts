import { mappingVps } from '../utils/vps'

describe('Mapping raw vps', () => {
  test('should return input value', () => {
    const input = 'custom vps'
    expect(mappingVps(input)).toEqual(input)
  })

  test('should return new value', () => {
    const input = 'Vultr Holdings LLC Paris'
    const output = 'Vultr'
    expect(mappingVps(input)).toEqual(output)
  })
})