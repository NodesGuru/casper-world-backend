import * as MockData from './mock/data'
import { axios } from '../utils/axios'
import { getLocation, getPeers, getStatus, getValidatorsInfo } from '../utils/helpers'

jest.mock('../utils/axios')
const ip = '127.0.0.0'

describe('Get validator info', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('validators data should be correct', async () => {
    axios.post = jest.fn().mockResolvedValue({ ...MockData.auctionInfo })

    const { validatorsWeights, validatorsBids } = await getValidatorsInfo()
    expect(validatorsWeights.length).toEqual(3)
    expect(validatorsBids.length).toEqual(2)
  })

  test('should be throw error', async () => {
    console.error = jest.fn()

    await expect(getValidatorsInfo).rejects.toThrow('RPC error or validators data is empty')
  })
})

describe('Get node peers', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return IPs array', async () => {
    axios.post = jest.fn().mockResolvedValue({ ...MockData.peers })

    const output = ['54.238.212.246', '45.76.251.225', '88.99.95.7']
    const result = await getPeers(ip)
    expect(result).toEqual(output)
  })

  test('should return undefined', async () => {
    console.error = jest.fn()

    const result = await getPeers(ip)
    expect(console.error).toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})

describe('Get node status', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('status should be correct', async () => {
    axios.get = jest.fn().mockResolvedValue({ ...MockData.status })

    const output = {
      ip,
      public_key: '0111b98cd68f6d3950def8ec94f2859434d823fddd020e3a929dd938a8a5e71f33',
      version: '1.4.1'
    }
    const data = await getStatus(ip)
    expect(data).toMatchObject(output)
  })

  test('should return undefined', async () => {
    console.error = jest.fn()

    const data = await getStatus(ip)
    expect(console.error).toHaveBeenCalled()
    expect(data).toBeUndefined()
  })
})

describe('Get node locations', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('location data should be correct', async () => {
    axios.get = jest.fn().mockResolvedValue({ ...MockData.location })

    const data = await getLocation(ip)
    expect(data).toMatchObject(MockData.location.data)
  })

  test('should return undefined', async () => {
    console.error = jest.fn()

    const data = await getLocation(ip)
    expect(console.error).toHaveBeenCalled()
    expect(data).toBeUndefined()
  })
})
