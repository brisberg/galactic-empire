/**
 * @fileoverview
 * Depot package contains base classes and utilities for game entities which can
 * store a variety of resources. These stores may or may not have storage
 * limits.
 */

import {Resource, ResourceMap} from '../data/industry';

/** Depot is a base class for any entity which can store or trade resources. */
export class Depot {
  private resources: Map<Resource, number> = new Map();
  private capacity: Map<Resource, number> = new Map();

  /** Total storage capacity of a Resource in this depot */
  getCapacity(resource: Resource): number {
    return this.capacity.get(resource) || Infinity;
  }

  /**
   * Sets a max storage limit for a type of resource.
   * Note: Does not check if the Depot already has more resource than the new
   * capacity.
   */
  setCapacity(resource: Resource, capacity: number): void {
    this.capacity.set(resource, capacity);
  }

  /** Returns the current amount of the given Resource on this Planet */
  getResource(resource: Resource): number {
    return this.resources.get(resource) || 0;
  }

  /** Returns counts of all Resources stored in the Depot */
  getAllResources(): ResourceMap {
    const resources: ResourceMap = {};
    this.resources.forEach((amount: number, res: Resource) => {
      resources[res] = amount;
    });
    return resources;
  }

  /**
   * Adds the given amount of a resource to the Depot.
   * Throws an error if the Depot does not have enough capacity to store it.
   */
  addResource(resource: Resource, amount: number): void {
    const newTotal = this.getResource(resource) + amount;
    this.setResource(resource, newTotal);
  }

  /**
   * Removes the given number of a resource from the Depot.
   * Throws an error if the Depot does not have enough.
   */
  removeResource(resource: Resource, amount: number): void {
    const curAmount = this.getResource(resource);
    if (curAmount < amount) {
      throw new InsufficientResourceError(resource, curAmount, amount);
    }

    this.setResource(resource, curAmount - amount);
  }

  /**
   * Sets the amount of a given resource in the Depot.
   * Throws an error if the Depot does not have enough capacity to store it.
   */
  setResource(resource: Resource, amount: number): void {
    if (amount > this.getCapacity(resource)) {
      throw new ResourceOverCapacityError(
          resource, amount, this.getCapacity(resource));
    }

    this.resources.set(resource, amount);
  }
}

/**
 * Error for attempting to remove more resources than those possessed by this
 * depot.
 */
export class InsufficientResourceError extends Error {
  constructor(
      public readonly resource: Resource,
      public readonly have: number,
      public readonly need: number,
  ) {
    super(
        `Insufficient ${resource}. Needs ${need} but depot only has ${have}.`);
    this.name = 'InsufficientResourceError';
  }
}

/**
 * Error for attempting to remove more resources than those possessed by this
 * depot.
 */
export class ResourceOverCapacityError extends Error {
  constructor(
      public readonly resource: Resource,
      public readonly amount: number,
      public readonly capacity: number,
  ) {
    super(`Depot cannot store ${amount} of ${resource}, only ${
        capacity} capacity is available.`);
    this.name = 'ResourceOverCapacityError';
  }
}
