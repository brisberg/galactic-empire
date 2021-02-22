/**
 * @fileoverview
 * position.ts includes class surrounding planet positions.
 */

/** Position represents a point in two dimensional space. */
export class Position {
  constructor(public readonly x: number, public readonly y: number) {}

  public distanceTo(pos: Position): number {
    return Math.hypot(this.x - pos.x, this.y - pos.y);
  }
}
