/**
 * @fileoverview
 * Mock instances and builders for the Fleet package. Suitable for testing of
 * other modules.
 */

import {Builder} from '../builder';
import {Resource} from '../data/industry';
import {Planet} from '../planet/planet';
import {PlanetBuilder} from '../planet/planet.mock';

import {Fleet, FleetState} from './fleet';
import {Vessle} from './ship';

export class FleetBuilder implements Builder<Fleet> {
  private location = new PlanetBuilder().build();
  private state: FleetState = FleetState.ORBIT;
  /** Fleet is in statis until this Stardate */
  private stasisUntil = 0;
  private ships: Map<Vessle, number> = new Map();
  private supplies = 0;
  private fuel = 0;

  public build(): Fleet {
    const fleet = new Fleet(this.location);
    this.ships.forEach((count: number, ship: Vessle) => {
      fleet.addShips(ship, count);
    });
    fleet.addResource(Resource.SUPPLY, this.supplies);
    fleet.addResource(Resource.FUEL, this.fuel);
    return fleet;
  }

  public atLocation(planet: Planet): this {
    this.location = planet;
    return this;
  }

  /** TODO: Not implemented */
  public withState(state: FleetState): this {
    this.state = state;
    return this;
  }

  /** TODO: Not implemented */
  public withStatisUntil(until: number): this {
    this.stasisUntil = until;
    return this;
  }

  public withShips(ship: Vessle, count: number): this {
    this.ships.set(ship, count);
    return this;
  }

  public withSupplies(supply: number): this {
    this.supplies = supply;
    return this;
  }

  public withFuel(fuel: number): this {
    this.fuel = fuel;
    return this;
  }
}
