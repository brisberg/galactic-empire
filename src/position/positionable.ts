import {Position} from './position';

/**
 * @fileoverview
 * Positionable is a base class for all objects which have a physical location
 * in game space.
 */
export class Positionable {
  constructor(public readonly position: Position) {}

  /** Calculate the pythagorean distance to another positionable object. */
  distanceTo(dest: Positionable): number {
    return this.position.distanceTo(dest.position);
  }
}
