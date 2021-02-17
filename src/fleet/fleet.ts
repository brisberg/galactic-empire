import {Vessle} from './ship';

/**
 * @fileoverview
 * Fleet class represents a grouping of Ships at a particular location. The
 * player controls a fleet which moves from planet to planet. Most planets also
 * possess a defence fleet. Fleets can fight each other for control of a system.
 * */
export class Fleet {
  private ships: Map<Vessle, number> = new Map();

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
}
