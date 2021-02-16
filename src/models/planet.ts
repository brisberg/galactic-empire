/**
 * @fileoverview
 * planet.ts includes all the classes and interface definitions for defining
 * Planets.
 */

import {Position} from './position';
import {Vessel} from './ship';

/**
 * Planet class represents a planet in the galaxy. The Planet includes all the
 * fields needed to define it's state and has some utility functions for
 * manipulating it.
 */
export class Planet {
  private resources: Map<Resource, number> = new Map();
  private fleet: Map<Vessel, number> = new Map();
  /** Mapping of Resource generating industry to an allocation percentage */
  private industry: Map<Resource, number> = new Map();

  constructor(
      public name: string,
      public readonly position: Position,
      public allegience: Allegience,
      public readonly techlevel: TechLevel,
      /** Planet population (in millions) */
      public population: number,
  ) {}
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

/** Resource represents the various resources a planet can manufacture. */
export enum Resource {
  CREDIT = 'credit',
  SUPPLY = 'supply',
  FUEL = 'fuel',
  MILITARY = 'military',
  SHIPPARTS = 'ship-parts',
}
