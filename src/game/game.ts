import {FleetDef} from '../data/fleet';
import {Resource} from '../data/industry';
import {Fleet} from '../fleet/fleet';
import {Vessle} from '../fleet/ship';
import {Allegience, Planet} from '../planet/planet';

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

  constructor(
      stardate: number, planets: Planet[],
      initialFleet: FleetDef = {ships: {}, resources: {}}) {
    this._stardate = stardate;

    planets.forEach((planet: Planet) => {
      this.registerPlanet(planet);
    });

    // Player Fleet (initialized from FleetDef)
    this.fleet = new Fleet(planets[0]);
    Object.keys(initialFleet.ships).forEach((ship: string) => {
      this.fleet.addShips(
          ship as Vessle, initialFleet.ships[ship as Vessle] || 0);
    });
    Object.keys(initialFleet.resources).forEach((res: string) => {
      this.fleet.addResource(
          res as Resource, initialFleet.resources[res as Resource] || 0);
    });
  }

  /** The current Stardate */
  public get stardate(): number {
    return this._stardate;
  }

  /**
   * Returns a handle to the player controller fleet.
   * TODO: Test this and put it into the contract.
   */
  public get playerFleet(): Fleet {
    return this.fleet;
  }

  /**
   * Advances the simulation by the given number of Stardates.
   *
   * Returns true/false is the game ends in a Victory or Defeat.
   * Returns void otherwise.
   */
  public update(deltatime: number): boolean|void {
    const initialStardate = Math.floor(this._stardate);
    this._stardate += deltatime;
    const newStardate = Math.floor(this._stardate);

    // Update all planets
    if (newStardate - initialStardate > 0) {
      this.planets.forEach((planet: Planet) => {
        planet.update(newStardate - initialStardate);
      });
    }

    if (this.checkLossCondition()) {
      // Game Over
      return false;
    }

    if (this.checkWinCondition()) {
      // Game Win
      return true;
    }

    return;
  }

  /** Returns true if the player has won */
  private checkWinCondition(): boolean {
    let galaxyConqured = true;
    this.planets.forEach((planet: Planet) => {
      if (planet.allegience === Allegience.INDEPENDENT) {
        galaxyConqured = false;
      }
    });

    return galaxyConqured;
  }

  /** Returns true if the player has lost */
  private checkLossCondition(): boolean {
    if (this.stardate > 1200) {
      return true;
    }
    return false;
  }

  /** Registers a Planet into the Planets map */
  private registerPlanet(planet: Planet): void {
    this.planets.set(planet.name, planet);
  }
}
