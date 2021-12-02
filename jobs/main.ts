import { BigNumber } from '@ethersproject/bignumber'
import { mappingVps } from '../utils/vps'
import { getStatus, getPeers, getValidatorsInfo, getLocation } from '../utils/helpers'
import { IDelegator, INode, IValidator, IValidatorBid, IValidatorStake } from '../types'
import { getPeersFromDB, insertValidatorsToDB } from '../db/methods'

export default async function updateValidators() {
  // get validators info from RPC, parse and validate data
  // add location data from API, update DB
  // if validators info, peers or nodes statuses received from RPC are empty throw error and repeat the job
  const { validatorsWeights, validatorsBids } = await getValidatorsInfo()
  const parsedValidators = await parseValidators(validatorsBids, validatorsWeights)
  // reason: use bulk-perform aggregation to increase speed
  const validatorsWithLocation = await addLocationsToValidators(parsedValidators)
  await insertValidatorsToDB(validatorsWithLocation)
}

async function parseValidators(validators: IValidatorBid[], currentEraValidators: IValidatorStake[]): Promise<IValidator[]> {
  const timestamp = Date.now()
  const nodes = await getNodes()
  const latestVersion = nodes
    .filter(n => n.version)
    .map(n => n.version)
    .sort((a, b) => a! > b! ? -1 : 1)[0]

  return validators.map(v => {
    const public_key = v.public_key
    const delegators = v.bid?.delegators?.map((d: IDelegator) => ({
      staked_amount: d.staked_amount,
      public_key: d.public_key
    }))
    const delegators_stake = delegators?.reduce((acc, d) => {
      return acc.add(d.staked_amount)
    }, BigNumber.from(0))
    const total_stake = delegators_stake.add(v.bid.staked_amount).toString() // sum delegators stake + own stake
    const current_era_stake = getCurrentEraStake(currentEraValidators, public_key)
    const { ip, version } = associateNodeByKey(nodes, public_key)

    return {
      public_key,
      timestamp,
      inactive: v.bid.inactive,
      delegators,
      self_stake: v.bid.staked_amount,
      delegators_stake: delegators_stake.toString(),
      total_stake,
      current_stake: current_era_stake,
      ip,
      version: version ? version : current_era_stake !== null ? latestVersion : null // if validator is active then it has the latest version
    }
  })
}

async function getUniquePeers(): Promise<string[]> {
  const peersFromRpc = await getPeers(process.env.RPC!)
  const peersFromDB = await getPeersFromDB()
  let uniquePeers = new Set([...peersFromRpc, ...peersFromDB])

  if (!uniquePeers?.size) {
    throw new Error('RPC error or peers data is empty')
  }

  return Array.from(uniquePeers)
}

export function getCurrentEraStake(validators: IValidatorStake[], key: string): string | null {
  const validator = validators.filter(v => v.public_key === key)[0]

  return validator ? validator.weight : null
}

async function getNodes(): Promise<INode[]> {
  const peers = await getUniquePeers()
  const nodes = await Promise.all(peers.map(p => getStatus(p)))

  const result = nodes.flat().filter(n => n !== undefined) as INode[]

  if (!result.length) {
    throw new Error('RPC error or nodes data is empty')
  }

  return result
}

export function associateNodeByKey(nodes: INode[], key: string): INode {
  const isExist = nodes.filter(n => n.public_key === key)[0]

  return isExist ?? { ip: null, version: null }
}

async function addLocationsToValidators(validators: IValidator[]): Promise<IValidator[]> {
  const validatorsLocations = await Promise.all(validators.map(v => v.ip ? getLocation(v.ip) : null))

  return validators.map((v, i) => {
    const curLoc = validatorsLocations[i]

    return {
      ...v,
      vps: curLoc?.org ? mappingVps(curLoc!.org) : curLoc?.isp ? mappingVps(curLoc!.isp) : null,
      country: curLoc?.country ?? null,
      latitude: curLoc?.lat ?? null,
      longitude: curLoc?.lon ?? null
    }
  })
}