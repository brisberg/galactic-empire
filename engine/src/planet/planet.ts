/**
 * @fileoverview
 * planet.ts includes all the classes and interface definitions for defining
 * Planets.
 */

import {PRODUCTION_RATE, Resource, ResourceMap} from '../data/industry';
import {Vessle} from '../fleet/ship';
import {Position} from '../position/position';
import {PositionableDepot} from '../position/positionable';
import {StringToNumMapping} from '../types';

/**
 * Growth rate of planet population each Stardate.
 * TODO: Validate this in the original game
 */
export const POPULATION_GROWTH_RATE = 0.01;

/**
 * Planet class represents a planet in the galaxy. The Planet includes all the
 * fields needed to define it's state and has some utility functions for
 * manipulating it.
 */
export class Planet extends PositionableDepot {
  private fleet: Map<Vessle, number> = new Map();
  /** Mapping of Resource generating industry to an allocation percentage */
  private industry: Map<Resource, number> = new Map();

  constructor(
      public name: string,
      position: Position,
      public allegience: Allegience,
      public readonly techlevel: TechLevel,
      /** Planet population (in millions) */
      public population: number,
  ) {
    super(position);
  }

  /** Returns the number of the given vessle  */
  getFleet(ship: Vessle): number {
    return this.fleet.get(ship) || 0;
  }

  /** Returns the current population distribution by industry */
  getIndustryAllocation(): StringToNumMapping {
    const alloc: StringToNumMapping = {};
    this.industry.forEach((value: number, resource: Resource) => {
      alloc[resource] = value;
    });
    return alloc;
  }

  /**
   * Sets the planet industry allocation.
   *
   * Throws an error if the allocation is not valid.
   */
  setIndustryAllocation(alloc: ResourceMap): void {
    const total = Object.values(alloc).reduce(
        (sum: number, value: number|undefined) => sum + (value || 0), 0);
    if (total !== 100) {
      throw new InvalidIndustryAllocError(alloc);
    }

    for (const res of Object.values(Resource)) {
      this.industry.set(res, alloc[res] || 0);
    }
  }

  update(deltatime: number): void {
    // Produce resources for all industries
    this.industry.forEach((alloc: number, res: Resource) => {
      const activePop = this.population * (alloc / 100);
      const product = activePop * (PRODUCTION_RATE[res] || 1) * deltatime;
      this.addResource(res, product);
    });

    // Grow Population
    this.population *= Math.pow(1 + POPULATION_GROWTH_RATE, deltatime);
    return;
  }
}

/** Allegience represents the political state of a planet. */
export enum Allegience {
  INDEPENDENT = 'independent',
  OCCUPIED = 'occupied',
  EMPIRE = 'empire',
}

/**
 * TechLevel represents the overall technology level of a planet. Affects
 * planet productivity, industry capability, military effectiveness and more.
 */
export enum TechLevel {
  PRIMITIVE = 'primitive',
  LIMITED = 'limited',
  ADVANCED = 'advanced',
  SUPERIOR = 'superior',
}


/** Error for attempting to set an invalid industry allocation. */
export class InvalidIndustryAllocError extends Error {
  constructor(
      public readonly alloc: ResourceMap,
  ) {
    super(`Invalid Industry Allocation '${alloc}. Allocation must sum to 100%`);
    this.name = 'InvalidIndustryAllocError';
  }
}
