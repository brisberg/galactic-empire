/**
 * @fileoverview
 * Fleet class represents a grouping of Ships at a particular location. The
 * player controls a fleet which moves from planet to planet. Most planets also
 * possess a defence fleet. Fleets can fight each other for control of a system.
 * */
export class Fleet {
  private ships: Map<string, number> = new Map();

  /** Return an object representing all ships in the fleet. */
  getFleet(): {[ship: string]: number} {
    return {};
  }
}
