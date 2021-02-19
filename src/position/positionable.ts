import {Position} from './position';

/**
 * Positionable is a base class for all objects which have a physical location
 * in game space.
 * @fileoverview
 */
export class Positionable {
  constructor(public readonly position: Position) {}

  /** Calculate the pythagorean distance to another positionable object. */
  public distanceTo(dest: Positionable): number {
    return this.position.distanceTo(dest.position);
  }
}
