import {Fleet} from '../fleet/fleet';
import {Game} from '../game/game';
import {Allegience, Planet, TechLevel} from '../planet/planet';
import {PlanetBuilder} from '../planet/planet.mock';
import {Position} from '../position/position';
import {PlayerController} from './controller';

describe('Controller', () => {
  let planets: Planet[];
  let game: Game;
  let fleet: Fleet;
  let controller: PlayerController;

  beforeEach(() => {
    planets = [
      new PlanetBuilder()
          .withName('galactica')
          .atPosition(new Position(0, 0))
          .withAllegience(Allegience.EMPIRE)
          .withTechnology(TechLevel.ADVANCED)
          .build(),
      new PlanetBuilder()
          .withName('alpha')
          .atPosition(new Position(5, 5))
          .withAllegience(Allegience.INDEPENDENT)
          .withTechnology(TechLevel.ADVANCED)
          .build(),
    ];
    game = new Game(0, planets);
    fleet = game.playerFleet;
    controller = new PlayerController(game);
  });

  it('should move the fleet', () => {
    controller.embark(planets[1]);

    expect(fleet.planet).toBe(planets[1]);
  });

  it.todo('should attack a planet');

  it('should collect taxes', () => {
    return;
  });

  it.todo('should purchase supplies');

  it.todo('should purchase fuel');

  it.todo('should fill transports');

  it.todo('should unload transports');

  it.todo('should wait in statis');

  it.todo('should re-allocate a planet');

  it.todo('should build ships');

  it.todo('should send spy satelites');
});
