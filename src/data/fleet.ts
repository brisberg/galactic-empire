/**
 * @fileoverview
 * Fleet data includes information about fleet state, initial fleets and other
 * things for the base game.
 */

import {Vessle} from '../fleet/ship';
import {Resource, ResourceMap} from './industry';

export interface FleetDef {
  ships: {[ship in Vessle]?: number}, resources: ResourceMap,
}

/** Initial Fleet the player starts with. */
export const initialFleet: FleetDef = {
  ships: {
    [Vessle.FIGHTER]: 160,
    [Vessle.TRANSPORT]: 100,
    [Vessle.SUPPLY]: 3,
    [Vessle.FUEL]: 2,
  },
  resources: {
    [Resource.CREDIT]: 10000,
    [Resource.SUPPLY]: 3000,
    [Resource.FUEL]: 2000,
  },
};

/** Construction costs of all Ships */
export const SHIP_COST: {[ship in Vessle]: ResourceMap} = {
  [Vessle.FIGHTER]: {
    [Resource.CREDIT]: 40,
    [Resource.SHIPPARTS]: 5,
  },
  [Vessle.TRANSPORT]: {
    [Resource.CREDIT]: 6,
    [Resource.SHIPPARTS]: 8,
  },
  [Vessle.M_TRANSPORT]: {
    [Resource.CREDIT]: 6,
    [Resource.SHIPPARTS]: 8,
    [Resource.MILITARY]: 1,
  },
  [Vessle.SUPPLY]: {
    [Resource.CREDIT]: 3000,
    [Resource.SHIPPARTS]: 500,
  },
  [Vessle.FUEL]: {
    [Resource.CREDIT]: 3000,
    [Resource.SHIPPARTS]: 500,
  },
};
