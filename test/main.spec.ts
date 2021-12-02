import { associateNodeByKey, getCurrentEraStake } from '../jobs/main'
import { INode, IValidatorStake } from '../types'

describe('Associate node by key', () => {
  let input: INode[]

  beforeEach(() => {
    input = [
      { ip: '127.0.0.0', public_key: '0444b9020e3a4214929dds938a83123csd2', version: '1.4.1' },
      { ip: '127.0.0.1', public_key: '0222656b9020e3a4214929d438a83123454', version: '1.4.0' }
    ]
  })

  test('should return correct object', () => {
    const result = associateNodeByKey(input, '0444b9020e3a4214929dds938a83123csd2')
    const output = { ip: '127.0.0.0', version: '1.4.1' }
    expect(result).toMatchObject(output)
  })

  test('should return correct object', () => {
    const result = associateNodeByKey(input, 'asdas21321312')
    const output = { ip: null, version: null }
    expect(result).toMatchObject(output)
  })
})

describe('Validator stake by key', () => {
  let input: IValidatorStake[]

  beforeEach(() => {
    input = [
      {
        public_key: '01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80',
        weight: '176679679178989272'
      },
      {
        public_key: '01031cdce87d5fe53246492f9262932f9eb7421ea54b30da1eca06874fd2a7df60',
        weight: '8956953150808134'
      }
    ]
  })

  test('should return correct value', () => {
    const result = getCurrentEraStake(input, '01026ca707c348ed8012ac6a1f28db031fadd6eb67203501a353b867a08c8b9a80')
    expect(result).toEqual('176679679178989272')
  })

  test('should return null', () => {
    const result = getCurrentEraStake(input, 'asdas21321312')
    expect(result).toBeNull()
  })
})