import {Game} from 'game';
import {Allegience, Planet, TechLevel} from 'models/planet';
import {Position} from 'models/position';

// const planets = [
//   new Planet(
//       'alpha', new Position(0, 0), Allegience.EMPIRE,
//       TechLevel.ADVANCED, 50.5),
//   new Planet(
//       'beta', new Position(5, 0), Allegience.INDEPENDENT, TechLevel.LIMITED,
//       70.5),
//   new Planet(
//       'gamma', new Position(0, 5), Allegience.INDEPENDENT,
//       TechLevel.SUPERIOR, 25.5),
// ];

function empirePlanet(name: string): Planet {
  return new Planet(
      name, new Position(0, 0), Allegience.EMPIRE, TechLevel.ADVANCED, 10);
}

function occupiedPlanet(name: string): Planet {
  return new Planet(
      name, new Position(0, 0), Allegience.OCCUPIED, TechLevel.ADVANCED, 10);
}

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(0, []);
  });

  it('should initialize at Stardate 0', () => {
    expect(game.stardate).toEqual(0);
  });

  it.todo('should initialize with 19 independent planets and one home');

  it('should advance the Stardate when update is called', () => {
    const initialDate = game.stardate;

    game.update(5);

    expect(game.stardate).toEqual(initialDate + 5);
  });

  it.todo('should update all planets when time advances to the next Stardate');

  it('should end in a loss when Star Date passes 1200', () => {
    const result = game.update(1201);

    expect(result).toEqual(false);
  });

  it('should end in victory when all planets are Occupied or Empire', () => {
    game = new Game(0, [empirePlanet('alpha'), occupiedPlanet('beta')]);

    const result = game.update(1);

    expect(result).toEqual(true);
  });
});
