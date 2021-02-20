/**
 * @fileoverview
 * Contains enums and constants surrounding Resources and Planetary Industries.
 */

/** Resource represents the various resources a planet can manufacture. */
export enum Resource {
  CREDIT = 'credit',
  SUPPLY = 'supply',
  FUEL = 'fuel',
  MILITARY = 'military',
  SHIPPARTS = 'ship-parts',
}

/** Mapping of Resource constants to a number */
export type ResourceMap = {
  [res in Resource]?: number;
};

/** Production rates of varous industries per million population assigned. */
// TODO: Use the real numbers from the game
export const PRODUCTION_RATE: ResourceMap = {
  [Resource.CREDIT]: 21,
  [Resource.SUPPLY]: 14,
  [Resource.FUEL]: 5,
  [Resource.MILITARY]: 3,
  [Resource.SHIPPARTS]: 10,
};
