/**
 * @fileoverview
 * Mock instances and builders for the Depot package. Suitable for testing of
 * other modules.
 */

import {Builder} from '../builder';
import {Resource} from '../data/industry';

import {Depot} from './depot';

export class DepotBuilder implements Builder<Depot> {
  private resources: Map<Resource, number> = new Map();
  private capacity: Map<Resource, number> = new Map();

  public build(): Depot {
    const depot = new Depot();
    this.capacity.forEach((count: number, res: Resource) => {
      depot.setCapacity(res, count);
    });
    this.resources.forEach((count: number, res: Resource) => {
      depot.setResource(res, count);
    });
    return depot;
  }

  public withResource(res: Resource, count: number): this {
    this.resources.set(res, count);
    return this;
  }

  public withResourceCapacity(res: Resource, count: number): this {
    this.capacity.set(res, count);
    return this;
  }
}
