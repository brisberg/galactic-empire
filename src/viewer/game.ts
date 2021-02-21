// Galactic Emprie Game
import {PlayerController} from '../engine/controller/controller';
import {initialFleet} from '../engine/data/fleet';
import {Game} from '../engine/game/game';
import {Allegience, Planet, TechLevel} from '../engine/planet/planet';
import {Position} from '../engine/position/position';

const planets: Planet[] = [
  new Planet(
      'galactica', new Position(15, 15), Allegience.EMPIRE, TechLevel.ADVANCED,
      50.5),
  new Planet(
      'foust', new Position(11, 13), Allegience.EMPIRE, TechLevel.SUPERIOR, 25),
  new Planet(
      'winterpine', new Position(22, 18), Allegience.EMPIRE,
      TechLevel.PRIMITIVE, 100.5),
  new Planet(
      'alpha', new Position(4, 9), Allegience.INDEPENDENT, TechLevel.ADVANCED,
      100.5),
  new Planet(
      'beta', new Position(6, 26), Allegience.INDEPENDENT, TechLevel.PRIMITIVE,
      100.5),
  new Planet(
      'gamma', new Position(21, 11), Allegience.INDEPENDENT, TechLevel.SUPERIOR,
      100.5),
];

export const game = new Game(0, planets, initialFleet);
export const controller = new PlayerController(game);
