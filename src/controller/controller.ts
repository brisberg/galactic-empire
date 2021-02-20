import {Resource, RESOURCE_COST, ResourceMap} from '../data/industry';
import {Fleet} from '../fleet/fleet';
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
