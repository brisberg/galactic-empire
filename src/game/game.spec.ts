import {Game} from 'game/game';
import {Position} from 'models/position';
import {Allegience, Planet, TechLevel} from 'planet/planet';

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

function mockPlanet(name: string): Planet {
  const planet = new Planet(
      name, new Position(0, 0), Allegience.EMPIRE, TechLevel.ADVANCED, 10);
  jest.spyOn(planet, 'update');
  return planet;
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

  describe('Update', () => {
    it('should advance the Stardate when update is called', () => {
      const initialDate = game.stardate;

      game.update(5);

      expect(game.stardate).toEqual(initialDate + 5);
    });

    it('should end in a loss when Star Date passes 1200', () => {
      const result = game.update(1201);

      expect(result).toEqual(false);
    });

    it('should end in victory when all planets are Occupied or Empire', () => {
      game = new Game(0, [empirePlanet('alpha'), occupiedPlanet('beta')]);

      const result = game.update(1);

      expect(result).toEqual(true);
    });

    describe('with mock planets', () => {
      let planets: Planet[];

      beforeEach(() => {
        planets = [mockPlanet('alpha'), mockPlanet('beta')];
        game = new Game(0, planets);
      });

      it('should update all planets when time advances to next Stardate',
         () => {
           game.update(5);

           planets.forEach((planet: Planet) => {
             expect(planet.update).toHaveBeenCalledWith(5);
           });
         });

      it('should not update planets for fractional Stardates', () => {
        game.update(0.5);

        planets.forEach((planet: Planet) => {
          expect(planet.update).not.toHaveBeenCalled();
        });
      });
    });
  });
});
