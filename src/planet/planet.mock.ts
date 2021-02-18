/**
 * @fileoverview
 * Mock instances and builders for the Planet package. Suitable for testing of
 * other modules.
 */

import {Position} from '../position/position';
import {Builder} from '../testing/builder';
import {Allegience, Planet, TechLevel} from './planet';

export class PlanetBuilder implements Builder<Planet> {
  private name = 'Galactica';
  private position = new Position(0, 0);
  private allegience = Allegience.EMPIRE;
  private techlevel = TechLevel.ADVANCED;
  /** Planet population (in millions) */
  private population = 50;
  // private fleet: Map<Vessle, number> = new Map();
  /** Mapping of Resource generating industry to an allocation percentage */
  // private industry: Map<Resource, number> = new Map();
  // private resources: Map<Resource, number> = new Map();

  public build(): Planet {
    return new Planet(
        this.name, this.position, this.allegience, this.techlevel,
        this.population);
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
}
