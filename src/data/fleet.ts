/**
 * @fileoverview
 * Fleet data includes information about fleet state, initial fleets and other
 * things for the base game.
 */

import {Vessle} from '../fleet/ship';
import {Resource, ResourceMap} from './industry';

/** Initial Fleet the player starts with. */
export const FleetDef: {
  ships: {[ship in Vessle]?: number},
  resources: ResourceMap,
} = {
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
