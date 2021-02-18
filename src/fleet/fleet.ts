import {FUEL_COST, SUPPLY_COST} from 'data/travelCosts';
import {Planet} from 'planet/planet';
import {Vessle} from './ship';

/**
 * @fileoverview
 * Fleet class represents a grouping of Ships at a particular location. The
 * player controls a fleet which moves from planet to planet. Most planets also
 * possess a defence fleet. Fleets can fight each other for control of a system.
 * */
export class Fleet {
  private location: Planet;
  private state: FleetState = FleetState.ORBIT;
  /** Fleet is in statis until this Stardate */
  private stasisUntil = 0;
  private ships: Map<Vessle, number> = new Map();
  private _supplies = 0;
  private _fuel = 0;

  constructor(planet: Planet) {
    this.location = planet;
  }

  /** Return an object representing all ships in the fleet. */
  getShips(): {[ship: string]: number} {
    const ships: {[ship: string]: number} = {};
    this.ships.forEach((count: number, ship: Vessle) => {
      ships[ship] = count;
    });
    return ships;
  }

  /** Adds the given number of ships to the fleet. */
  addShips(ship: Vessle, count: number): void {
    this.ships.set(ship, (this.ships.get(ship) || 0) + count);
    return;
  }

  /**
   * Removes the given number of ships to the fleet.
   * Throws an error if the fleet does not have enough ships.
   */
  removeShips(ship: Vessle, count: number): void {
    const haveShips = this.ships.get(ship) || 0;
    if ((haveShips - count) < 0) {
      throw new NotEnoughShipsError(ship, count, haveShips);
    }
    this.ships.set(ship, haveShips - count);
    return;
  }

  /** Transfers the given number of ships to another fleet. */
  transferTo(ship: Vessle, count: number, dest: Fleet): void {
    if (dest === this) return;

    this.removeShips(ship, count);
    dest.addShips(ship, count);
    return;
  }

  /** Moves the fleet to a distant planet */
  travelTo(dest: Planet): void {
    this.removeSupply(this.calcSupplyCostTo(dest));
    this.removeFuel(this.calcFuelCostTo(dest));
    this.location = dest;
    return;
  }

  /**
   * Calculates the amount of supplies required to move the fleet to the
   * destination.
   */
  calcSupplyCostTo(dest: Planet): number {
    let cost = 0;
    this.ships.forEach((count: number, ship: Vessle) => {
      cost += count * SUPPLY_COST[ship];
    });
    return cost * this.location.distanceTo(dest);
  }

  /**
   * Calculates the amount of fuel required to move the fleet to the
   * destination.
   */
  calcFuelCostTo(dest: Planet): number {
    let cost = 0;
    this.ships.forEach((count: number, ship: Vessle) => {
      cost += count * FUEL_COST[ship];
    });
    return cost * this.location.distanceTo(dest);
  }

  get planet(): Planet {
    return this.location;
  }

  /** Total supply capacity of all ships in the fleet */
  get supplyCapacity(): number {
    return (this.ships.get(Vessle.SUPPLY) || 0) * 1000;
  }

  /** Total fuel capacity of all ships in the fleet */
  get fuelCapacity(): number {
    return (this.ships.get(Vessle.FUEL) || 0) * 1000;
  }

  /** Supplies carried by the fleet. */
  get supplies(): number {
    return this._supplies;
  }

  addSupply(supplies: number): void {
    this._supplies += supplies;
  }

  removeSupply(supplies: number): void {
    this._supplies -= supplies;
  }

  /** Fuel carried by the fleet. */
  get fuel(): number {
    return this._fuel;
  }

  addFuel(fuel: number): void {
    this._fuel += fuel;
  }

  removeFuel(fuel: number): void {
    this._fuel -= fuel;
  }
}

/** Possible States a Fleet can be in */
export enum FleetState {
  /** Assigned to defend or occupy a planet. */
  DEFENCE = 'defence',
  /** Asigned to orbit a Planet. May be re-deployed */
  ORBIT = 'orbit',
  /** Currently in transit to another star system */
  TRANSIT = 'transit',
}

/** Error for attempting to remove more ships than the fleet posesses. */
export class NotEnoughShipsError extends Error {
  constructor(
      public readonly ship: Vessle,
      public readonly removed: number,
      public readonly have: number,
  ) {
    super(`Cannot remove ${removed} '${ship}'. Fleet only possesses ${have}.`);
    this.name = 'NotEnoughShipsError';
  }
}
