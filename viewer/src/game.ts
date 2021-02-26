// Galactic Emprie Game
import {PlayerController} from './engine/controller/controller';
import {initialFleet} from './engine/data/fleet';
import {Resource, ResourceMap} from './engine/data/industry';
import {Game} from './engine/game/game';
import {Allegience, Planet, TechLevel} from './engine/planet/planet';
import {Position} from './engine/position/position';

const ADVANCED_INDUSTRY: ResourceMap = {
  [Resource.CREDIT]: 20,
  [Resource.SUPPLY]: 20,
  [Resource.FUEL]: 20,
  [Resource.MILITARY]: 20,
  [Resource.SHIPPARTS]: 20,
}

const planets: Planet[] = [
  new Planet(
      'Galactica', new Position(15, 15), Allegience.EMPIRE, TechLevel.ADVANCED,
      50.5),
  new Planet(
      'Winterstone', new Position(3, 5), Allegience.EMPIRE, TechLevel.ADVANCED,
      100.5),
  new Planet(
      'Vorex', new Position(11, 2), Allegience.INDEPENDENT, TechLevel.ADVANCED,
      95.5),
  new Planet(
      'Jakle', new Position(24, 8), Allegience.EMPIRE, TechLevel.SUPERIOR,
      34.5),
  new Planet(
      'Bol', new Position(29, 24), Allegience.INDEPENDENT, TechLevel.SUPERIOR,
      78.5),
  new Planet(
      'Ros\' kel', new Position(7, 15), Allegience.INDEPENDENT,
      TechLevel.SUPERIOR, 23.5),
  new Planet(
      'Spurn', new Position(11, 21), Allegience.EMPIRE, TechLevel.LIMITED,
      41.5),
  new Planet(
      'Halifax', new Position(18, 13), Allegience.EMPIRE, TechLevel.LIMITED,
      101.5),
  new Planet(
      'Xil\'kar', new Position(3, 21), Allegience.INDEPENDENT,
      TechLevel.LIMITED, 110.5),
  new Planet(
      'Terranova', new Position(6, 28), Allegience.INDEPENDENT,
      TechLevel.LIMITED, 83.5),
  new Planet(
      'Eventide', new Position(9, 18), Allegience.INDEPENDENT,
      TechLevel.PRIMITIVE, 25.5),
  new Planet(
      'Pak', new Position(14, 9), Allegience.INDEPENDENT, TechLevel.PRIMITIVE,
      15.5),
];

planets.forEach((planet: Planet) => {
  planet.setIndustryAllocation(ADVANCED_INDUSTRY);
});

export const game = new Game(0, planets, initialFleet);
export const controller = new PlayerController(game);
