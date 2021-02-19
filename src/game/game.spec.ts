import {Game} from '../game/game';
import {Allegience, Planet} from '../planet/planet';
import {PlanetBuilder} from '../planet/planet.mock';

function empirePlanet(name: string): Planet {
  return new PlanetBuilder()
      .withName(name)
      .withAllegience(Allegience.EMPIRE)
      .build();
}

function occupiedPlanet(name: string): Planet {
  return new PlanetBuilder()
      .withName(name)
      .withAllegience(Allegience.OCCUPIED)
      .build();
}

function mockPlanet(name: string): Planet {
  const planet = new PlanetBuilder().withName(name).build();
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
