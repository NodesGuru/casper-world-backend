import { axios } from './axios'
import { ILocation, INode, IPeer, IValidatorBid, IValidatorStake } from '../types'

/**
 * Casper ports used by the node
 *
 * @see https://github.com/casper-network/casper-node/wiki/Mainnet-Node-Installation-Instructions
 */
enum DefaultPorts {
  RPC = '7777',
  REST = '8888'
}

/**
 * JSON-RPC API methods of a node on the Casper network
 *
 * @see http://casper-rpc-docs.s3-website-us-east-1.amazonaws.com/
 */
enum RPCMethods {
  Auction = 'state_get_auction_info',
  Peers = 'info_get_peers',
  Status = 'info_get_status'
}

/**
 * Perform an asynchronous JSON-RPC Request
 *
 * @param {string} url RPC URL
 * @param {string} method RPC method
 */
async function dataFromNodePost(url: string, method: string) {
  try {
    const { data } = await axios.post(url, {
      id: 1,
      jsonrpc: '2.0',
      method
    })
    return data?.result
  } catch (e) {
    console.error((e as Error).message)
  }
}

/**
 * Perform an asynchronous HTTP Request
 *
 * @param {string} url Node URL
 */
async function dataFromNodeGet(url: string) {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (e) {
    console.error((e as Error).message)
  }
}

/**
 * Returns bids and validators
 *
 * @return {IValidatorBid[], IValidatorStake[]}
 */
export async function getValidatorsInfo(): Promise<{ validatorsBids: IValidatorBid[], validatorsWeights: IValidatorStake[] }> {
  const data = await dataFromNodePost(process.env.RPC!, RPCMethods.Auction)

  const validatorsBids = data?.auction_state?.bids
  const validatorsWeights = data?.auction_state?.era_validators[0]?.validator_weights
  if (validatorsBids?.length > 0 && validatorsWeights?.length > 0) {
    return { validatorsBids, validatorsWeights }
  }

  throw new Error('RPC error or validators data is empty')
}

/**
 * Returns IPs array of peers connected to the node
 *
 * @param {string} url URL of the node
 * @return {string[]} IPs array
 */
export async function getPeers(url: string): Promise<string[]> {
  const data = await dataFromNodePost(url, RPCMethods.Peers)

  return data?.peers?.filter((p: IPeer) => p?.address)
    .map((p: IPeer) => p.address.split(':')[0])
    .filter((ip: string) => validateIp(ip))
}

async function tryGetStatus(url: string) {
  // if node status not available, try get from another rpc endpoint
  let data = await dataFromNodeGet(`http://${url}:${DefaultPorts.REST}/status`)
  if (!data) {
    data = await dataFromNodePost(`http://${url}:${DefaultPorts.RPC}/rpc`, RPCMethods.Status)
  }

  return data
}

/**
 * Returns current status of the node
 *
 * @param {string} ip IP of the node
 * @return {INode} Node IP, public key and version
 */
export async function getStatus(ip: string): Promise<INode | undefined> {
  const data = await tryGetStatus(ip)
  if (data) {
    return { ip: ip, public_key: data.our_public_signing_key, version: data.api_version }
  }
}

/**
 * Returns location data by IP
 *
 * @param {string} ip IP of the node
 * @return {ILocation} Location data of the node
 */
export async function getLocation(ip: string): Promise<Partial<ILocation>> {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`)
    return { org: data.org, isp: data.isp, country: data.country, lat: data.lat, lon: data.lon, ip }
  } catch (e) {
    console.error((e as Error).message)
    return { ip }
  }
}

/**
 * Returns current time plus additional minutes
 *
 * @param {number} minutes Additional minutes
 * @return {string} Current time plus additional minutes in ISO format
 */
export function addMinutesToCurrentDate(minutes: number): string {
  const SECONDS_PER_MINUTE = 60
  const MILLISECONDS_PER_SECOND = 1000
  return new Date(Date.now() + (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * minutes)).toISOString()
}

/**
 * Function to pause execution for a fixed amount of time
 *
 * @param {number} ms sleep time milliseconds
 */
export async function sleep(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

function validateIp(input: string): boolean {
  const ip = input.split('.')
  return ip.length == 4 && ip.every((segment) => validateNum(segment, 0, 255))
}

function validateNum(input: string, min: number, max: number): boolean {
  const num = +input
  return num >= min && num <= max && input === num.toString()
}