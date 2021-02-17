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
}

/** Error for attempting to remove more ships than the fleet posesses. */
export class NotEnoughShipsError extends Error {
  constructor(
      public readonly ship: Vessle, public readonly removed: number,
      public readonly have: number) {
    super(`Cannot remove ${removed} '${ship}'. Fleet only possesses ${have}.`);
    this.name = 'NotEnoughShipsError';
  }
}
