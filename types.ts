/**
 * Interface for validator.
 *
 * @interface
 */
export interface IValidator {
  public_key: string;
  timestamp: number;
  inactive: boolean;
  delegators: IDelegator[];
  total_stake: string;
  self_stake: string;
  current_stake: string | null;
  delegators_stake: string;
  version: string | null;
  ip: string | null;
  vps?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

/**
 * Interface for logger.
 *
 * @interface
 */
export interface ILogger {
  name: string;
  failCount: number;
  failedAt: string;
  nextRunAt: string | null;
  failReason: string;
}

/**
 * Interface for delegator.
 *
 * @interface
 */
export interface IDelegator {
  staked_amount: string;
  public_key: string;
  bonding_purse?: string;
  delegatee?: string;
}

/**
 * Interface for validator bid.
 *
 * @interface
 */
export interface IBid {
  bonding_purse: string;
  staked_amount: string;
  delegation_rate: number;
  reward: string;
  inactive: boolean;
  delegators: IDelegator[];
}

/**
 * Interface for validator bid.
 *
 * @interface
 */
export interface IValidatorBid {
  public_key: string;
  bid: IBid;
}

/**
 * Interface for validator stake.
 *
 * @interface
 */
export interface IValidatorStake {
  public_key: string;
  weight: string; // stake
}

/**
 * Interface for node.
 *
 * @interface
 */
export interface INode {
  ip: string | null;
  public_key: string | null;
  version: string | null;
}

/**
 * Interface for peer.
 *
 * @interface
 */
export interface IPeer {
  node_id: string;
  address: string;
}

/**
 * Interface for validator location.
 *
 * @interface
 */
export interface ILocation {
  org: string;
  isp: string;
  country: string;
  lat: number;
  lon: number;
  ip: string;
}