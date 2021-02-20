import {PlayerController} from './controller/controller';
import {Resource} from './data/industry';
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

planets[0].setIndustryAllocation({
  [Resource.CREDIT]: 40,
  [Resource.SUPPLY]: 30,
  [Resource.FUEL]: 30,
});
game.update(100);
game.playerFleet.addShips(Vessle.SUPPLY, 1);
game.playerFleet.addShips(Vessle.FUEL, 1);
console.log(game.playerFleet.getAllShips());
console.log(game.playerFleet.getAllResources());
console.log(game.playerFleet.planet);
controller.collectTaxes();
console.log(game.playerFleet.planet);
console.log(game.playerFleet.getResource(Resource.CREDIT));
controller.purchaseResource(Resource.SUPPLY, 1000);
console.log(game.playerFleet.getResource(Resource.CREDIT));
console.log(game.playerFleet.getResource(Resource.SUPPLY));
controller.purchaseResource(Resource.FUEL, 1000);
console.log(game.playerFleet.getResource(Resource.CREDIT));
console.log(game.playerFleet.getResource(Resource.FUEL));
console.log(game.playerFleet.calcSupplyCostTo(planets[1]));
console.log(game.playerFleet.calcFuelCostTo(planets[1]));
controller.embark(planets[1]);
console.log(game.playerFleet.planet);
console.log(game.playerFleet.getResource(Resource.SUPPLY));
console.log(game.playerFleet.getResource(Resource.FUEL));
