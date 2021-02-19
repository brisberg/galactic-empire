import {PlayerController} from './controller/controller';
import {Vessle} from './fleet/ship';
import {Game} from './game/game';
import {Allegience, Planet, TechLevel} from './planet/planet';
import {Position} from './position/position';

const planets: Planet[] = [
  new Planet(
      'galactica', new Position(0, 0), Allegience.EMPIRE, TechLevel.ADVANCED,
      50.5),
  new Planet(
      'alpha', new Position(5, 4), Allegience.INDEPENDENT, TechLevel.SUPERIOR,
      25),
  new Planet(
      'beta', new Position(-2, 4), Allegience.INDEPENDENT, TechLevel.PRIMITIVE,
      100.5),
];

const game: Game = new Game(0, planets);

const controller = new PlayerController(game);

game.playerFleet.addShips(Vessle.FIGHTER, 100);
console.log(game.playerFleet.planet);
controller.purchaseSupplies();
console.log(game.playerFleet.supplies);
controller.purchaseFuel();
console.log(game.playerFleet.fuel);
console.log(game.playerFleet.calcSupplyCostTo(planets[1]));
console.log(game.playerFleet.calcFuelCostTo(planets[1]));
controller.embark(planets[1]);
console.log(game.playerFleet.planet);
console.log(game.playerFleet.supplies);
console.log(game.playerFleet.fuel);
