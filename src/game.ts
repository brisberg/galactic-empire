import {Fleet} from 'models/fleet';
import {Allegience, Planet, TechLevel} from 'models/planet';
import {Position} from 'models/position';

/**
 * @fileoverview
 * Game class represents a single game played by the player. The Game instance
 * holds all the information about the world and advances the simulation. The
 * game also checks for win/loss conditions.
 */
export class Game {
  private _stardate = 0;
  private planets: Map<string, Planet> = new Map();
  private fleet: Fleet;

  constructor() {
    // TODO: Initialize the player fleet from initial fleet definition
    this.fleet = new Fleet();

    // TODO: Initialize Planets
    this.registerPlanet(new Planet(
        'alpha', new Position(0, 0), Allegience.EMPIRE, TechLevel.ADVANCED,
        50.5));
    this.registerPlanet(new Planet(
        'beta', new Position(5, 0), Allegience.INDEPENDENT, TechLevel.LIMITED,
        70.5));
    this.registerPlanet(new Planet(
        'gamma', new Position(0, 5), Allegience.INDEPENDENT, TechLevel.SUPERIOR,
        25.5));
  }

  /** The current Stardate */
  public get stardate(): number {
    return this._stardate;
  }

  /** Advances the simulation by the given number of Stardates. */
  public update(deltatime: number): void {
    this._stardate += deltatime;
    return;
  }

  /** Registers a Planet into the Planets map */
  private registerPlanet(planet: Planet): void {
    this.planets.set(planet.name, planet);
  }
}
