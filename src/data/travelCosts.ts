/** Costs of each ship per parsec traveled */

import {Vessle} from '../fleet/ship';

type CostMap = {
  [ship in Vessle]: number
};

/** Mapping of ship type to fuel cost per parsec */
export const FUEL_COST: CostMap = {
  [Vessle.FIGHTER]: 0.1,
  [Vessle.M_TRANSPORT]: 0.1,
  [Vessle.SUPPLY]: 0.1,
  [Vessle.FUEL]: 0.1,
};

/** Mapping of ship type to supply cost per parsec */
export const SUPPLY_COST: CostMap = {
  [Vessle.FIGHTER]: 0.1,
  [Vessle.M_TRANSPORT]: 0.5,
  [Vessle.SUPPLY]: 0,
  [Vessle.FUEL]: 0,
};
