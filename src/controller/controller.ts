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

  public embark(planet: Planet): void {
    this.fleet.travelTo(planet);
  }

  // public collectTaxes(): void {
  //   this.fleet.planet.
  // }

  public purchaseSupplies(): void {
    this.fleet.planet.transferSupplies(100, this.fleet);
  }

  public purchaseFuel(): void {
    this.fleet.planet.transferFuel(100, this.fleet);
  }
}
