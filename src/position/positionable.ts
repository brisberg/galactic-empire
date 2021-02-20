/**
 * Positionable contains base classes for game objects which have a physical
 * location.
 */

import {Depot} from '../depot/depot';
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

/**
 * PositionableDepot is a base class for all objects which have both a physical
 * location and an inventory.
 *
 * TODO: This should probably be refactored into a component based system, as
 * this is leading towards inheritence hell.
 */
export class PositionableDepot extends Depot {
  constructor(public readonly position: Position) {
    super();
  }

  /** Calculate the pythagorean distance to another positionable object. */
  public distanceTo(dest: Positionable): number {
    return this.position.distanceTo(dest.position);
  }
}
