import {Resource, RESOURCE_COST, ResourceMap} from '../data/industry';
import {Fleet} from '../fleet/fleet';
import {Vessle} from '../fleet/ship';
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

  it('should collect taxes', () => {
    fleet.planet.setResource(Resource.CREDIT, 1000);

    controller.collectTaxes();

    expect(fleet.getResource(Resource.CREDIT)).toEqual(1000);
  });

  it('should purchase supplies', () => {
    fleet.addShips(Vessle.SUPPLY, 1);
    fleet.setResource(Resource.CREDIT, 2000);
    fleet.planet.setResource(Resource.SUPPLY, 1000);

    controller.purchaseResource(Resource.SUPPLY, 200);

    const expectedCost = 200 * (RESOURCE_COST[Resource.SUPPLY] || 1);
    expect(fleet.getResource(Resource.CREDIT)).toEqual(2000 - expectedCost);
    expect(fleet.getResource(Resource.SUPPLY)).toEqual(200);
  });

  it('should purchase fuel', () => {
    fleet.addShips(Vessle.FUEL, 1);
    fleet.setResource(Resource.CREDIT, 2000);
    fleet.planet.setResource(Resource.FUEL, 1000);

    controller.purchaseResource(Resource.FUEL, 200);

    const expectedCost = 200 * (RESOURCE_COST[Resource.FUEL] || 1);
    expect(fleet.getResource(Resource.CREDIT)).toEqual(2000 - expectedCost);
    expect(fleet.getResource(Resource.FUEL)).toEqual(200);
  });

  it.todo('should fill transports');

  it.todo('should unload transports');

  it('should wait in statis', () => {
    controller.waitInStatis(100);

    expect(game.stardate).toEqual(100);
  });

  it('should re-allocate industry on a planet', () => {
    fleet.planet.setIndustryAllocation({[Resource.CREDIT]: 100});
    const newAllocation: ResourceMap = {
      [Resource.CREDIT]: 50,
      [Resource.SUPPLY]: 50,
    };

    controller.setIndustryAllocation(newAllocation);

    const expectedAlloc: ResourceMap = {
      [Resource.CREDIT]: 50,
      [Resource.SUPPLY]: 50,
      [Resource.FUEL]: 0,
      [Resource.MILITARY]: 0,
      [Resource.SHIPPARTS]: 0,
    };
    expect(fleet.planet.getIndustryAllocation()).toEqual(expectedAlloc);
  });

  it.todo('should build ships');

  it.todo('should send spy satelites');

  it.todo('should attack a planet');
});
