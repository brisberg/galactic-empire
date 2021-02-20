import {Resource, RESOURCE_COST, ResourceMap} from '../data/industry';
import {InsufficientResourceError} from '../depot/depot';
import {Fleet} from '../fleet/fleet';
import {Vessle} from '../fleet/ship';
import {Game} from '../game/game';
import {Planet} from '../planet/planet';

/**
 * @fileoverview
 * Controller is the player controller class the player interacts with. All game
 * commands are available here and they will issue the relevent state updates to
 * the Game simulation.
 */
export class PlayerController {
  private fleet: Fleet;

  constructor(
      /** Game instance this controller is controlling */
      private readonly game: Game,
  ) {
    this.fleet = game.playerFleet;
  }

  /** Moves the fleet to a distant planet */
  public embark(planet: Planet): void {
    const supplies = this.fleet.getResource(Resource.SUPPLY);
    const supplyCost = this.fleet.calcSupplyCostTo(planet);
    const fuel = this.fleet.getResource(Resource.FUEL);
    const fuelCost = this.fleet.calcFuelCostTo(planet);

    if (supplies < supplyCost) {
      throw new InsufficientResourceError(
          Resource.SUPPLY, supplies, supplyCost);
    }

    if (fuel < fuelCost) {
      throw new InsufficientResourceError(Resource.FUEL, fuel, fuelCost);
    }

    this.fleet.removeResource(
        Resource.SUPPLY, this.fleet.calcSupplyCostTo(planet));
    this.fleet.removeResource(Resource.FUEL, this.fleet.calcFuelCostTo(planet));

    const dist = this.fleet.planet.distanceTo(planet);
    this.fleet.travelTo(planet);
    this.game.update(dist);
  }

  /** Collect taxes in Credits from a Planet */
  public collectTaxes(): void {
    const taxes = this.fleet.planet.getResource(Resource.CREDIT);
    this.fleet.planet.removeResource(Resource.CREDIT, taxes);
    this.fleet.addResource(Resource.CREDIT, taxes);
    this.game.update(0.5);
  }

  /** Purchase all of a resource from a planet for Credits. */
  public purchaseResource(resource: Resource, amount: number): void {
    this.fleet.removeResource(
        Resource.CREDIT, amount * (RESOURCE_COST[resource] || 0));
    this.fleet.planet.removeResource(resource, amount);
    this.fleet.addResource(resource, amount);
    this.game.update(0.5);
  }

  /** Filled empty Transport ships with troops to produce Manned Transports. */
  public fillTransports(amount: number): void {
    this.fleet.planet.removeResource(Resource.MILITARY, amount);
    this.fleet.removeShips(Vessle.TRANSPORT, amount);
    this.fleet.addShips(Vessle.M_TRANSPORT, amount);
    this.game.update(0.5);
  }

  /**
   * Unloads Transport ships. Returning the troops to the planet and replacing
   * the Manned Transports with empty Transports.
   */
  public unloadTransports(amount: number): void {
    this.fleet.removeShips(Vessle.M_TRANSPORT, amount);
    this.fleet.addShips(Vessle.TRANSPORT, amount);
    this.fleet.planet.addResource(Resource.MILITARY, amount);
    this.game.update(0.5);
  }

  /** Wait for the specified amount of time. Moves the simulation forward. */
  public waitInStatis(waitTime: number): void {
    this.game.update(waitTime);
  }

  /** Update the industry allocation of the current Planet. */
  public setIndustryAllocation(alloc: ResourceMap): void {
    this.fleet.planet.setIndustryAllocation(alloc);
    this.game.update(0.5);
  }
}
