/**
 * @fileoverview
 * Mock instances and builders for the Planet package. Suitable for testing of
 * other modules.
 */

import {Resource, ResourceMap} from '../data/industry';
import {Position} from '../position/position';
import {Builder} from '../testing/builder';
import {Allegience, Planet, TechLevel} from './planet';

const DEFAULT_INDUSTRY_ALLOC: ResourceMap = {
  [Resource.CREDIT]: 20,
  [Resource.SUPPLY]: 20,
  [Resource.FUEL]: 20,
  [Resource.MILITARY]: 20,
  [Resource.SHIPPARTS]: 20,
};

export class PlanetBuilder implements Builder<Planet> {
  private name = 'Galactica';
  private position = new Position(0, 0);
  private allegience = Allegience.EMPIRE;
  private techlevel = TechLevel.ADVANCED;
  /** Planet population (in millions) */
  private population = 50;
  // private fleet: Map<Vessle, number> = new Map();
  /** Mapping of Resource generating industry to an allocation percentage */
  private industry: ResourceMap = DEFAULT_INDUSTRY_ALLOC;
  private resources: Map<Resource, number> = new Map();

  public build(): Planet {
    const planet = new Planet(
        this.name, this.position, this.allegience, this.techlevel,
        this.population);
    planet.setIndustryAllocation(this.industry);
    this.resources.forEach((amount: number, res: Resource) => {
      planet.addResource(res, amount);
    });
    return planet;
  }

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public atPosition(pos: Position): this {
    this.position = pos;
    return this;
  }

  public withAllegience(allegience: Allegience): this {
    this.allegience = allegience;
    return this;
  }

  public withTechnology(tech: TechLevel): this {
    this.techlevel = tech;
    return this;
  }

  public withPopulation(population: number): this {
    this.population = population;
    return this;
  }

  public withIndustryAlloc(alloc: ResourceMap): this {
    this.industry = alloc;
    return this;
  }

  public withResource(resource: Resource, amount: number): this {
    this.resources.set(resource, amount);
    return this;
  }
}
