/**
 * @fileoverview
 * planet.ts includes all the classes and interface definitions for defining
 * Planets.
 */

import {Resource, ResourceMap} from 'data/industry';
import {Positionable} from 'position/positionable';
import {StringToNumMapping} from 'types';
import {Vessle} from '../fleet/ship';
import {Position} from '../position/position';

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
export class Planet extends Positionable {
  private resources: Map<Resource, number> = new Map();
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

  /** Returns the current amount of the given Resource on this Planet */
  getResource(resource: Resource): number {
    return this.resources.get(resource) || 0;
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
    for (const res of Object.values(Resource)) {
      this.industry.set(res, alloc[res]);
    }
  }

  update(deltatime: number): void {
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
