import {Resource, RESOURCE_COST, ResourceMap} from '../data/industry';
import {InsufficientResourceError} from '../depot/depot';
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

  describe('Embark', () => {
    let destination: Planet;

    beforeEach(() => {
      destination = planets[1];
    });

    it('should move the fleet', () => {
      controller.embark(destination);

      expect(fleet.planet).toBe(destination);
      expect(game.stardate).toEqual(planets[0].distanceTo(destination));
    });

    it('should take time equal to the distance', () => {
      controller.embark(destination);

      expect(game.stardate).toEqual(planets[0].distanceTo(destination));
    });

    describe('with Fighters, Supply and Fuel ships', () => {
      beforeEach(() => {
        fleet.addShips(Vessle.FIGHTER, 100);
        fleet.addShips(Vessle.SUPPLY, 10);
        fleet.addShips(Vessle.FUEL, 10);
      });

      it('should deduct supplies and fuel on travel', () => {
        fleet.setResource(Resource.SUPPLY, 10000);
        fleet.setResource(Resource.FUEL, 10000);
        const supplyCost = fleet.supplyCostTo(planets[1]);
        const fuelCost = fleet.fuelCostTo(planets[1]);

        controller.embark(planets[1]);

        expect(fleet.getResource(Resource.SUPPLY)).toEqual(10000 - supplyCost);
        expect(fleet.getResource(Resource.FUEL)).toEqual(10000 - fuelCost);
      });

      it('should refuse to travel without sufficient supplies', () => {
        fleet.setResource(Resource.SUPPLY, 0);
        fleet.setResource(Resource.FUEL, 10000);
        const supplyCost = fleet.supplyCostTo(destination);

        expect(() => controller.embark(destination))
            .toThrowError(
                new InsufficientResourceError(Resource.SUPPLY, 0, supplyCost));
      });

      it('should refuse to travel without sufficient fuel', () => {
        fleet.setResource(Resource.SUPPLY, 10000);
        fleet.setResource(Resource.FUEL, 0);
        const fuelCost = fleet.fuelCostTo(destination);

        expect(() => controller.embark(destination))
            .toThrowError(
                new InsufficientResourceError(Resource.FUEL, 0, fuelCost));
      });
    });
  });

  it('should collect taxes', () => {
    fleet.planet.setResource(Resource.CREDIT, 1000);

    controller.collectTaxes();

    expect(fleet.getResource(Resource.CREDIT)).toEqual(1000);
    expect(game.stardate).toEqual(0.5);
  });

  it('should purchase supplies', () => {
    fleet.addShips(Vessle.SUPPLY, 1);
    fleet.setResource(Resource.CREDIT, 2000);
    fleet.planet.setResource(Resource.SUPPLY, 1000);

    controller.purchaseResource(Resource.SUPPLY, 200);

    const expectedCost = 200 * (RESOURCE_COST[Resource.SUPPLY] || 1);
    expect(fleet.getResource(Resource.CREDIT)).toEqual(2000 - expectedCost);
    expect(fleet.getResource(Resource.SUPPLY)).toEqual(200);
    expect(game.stardate).toEqual(0.5);
  });

  it('should purchase fuel', () => {
    fleet.addShips(Vessle.FUEL, 1);
    fleet.setResource(Resource.CREDIT, 2000);
    fleet.planet.setResource(Resource.FUEL, 1000);

    controller.purchaseResource(Resource.FUEL, 200);

    const expectedCost = 200 * (RESOURCE_COST[Resource.FUEL] || 1);
    expect(fleet.getResource(Resource.CREDIT)).toEqual(2000 - expectedCost);
    expect(fleet.getResource(Resource.FUEL)).toEqual(200);
    expect(game.stardate).toEqual(0.5);
  });

  it('should fill transports', () => {
    fleet.addShips(Vessle.TRANSPORT, 100);
    fleet.planet.setResource(Resource.MILITARY, 300);

    controller.fillTransports(100);

    expect(fleet.planet.getResource(Resource.MILITARY)).toEqual(200);
    expect(fleet.getShips(Vessle.TRANSPORT)).toEqual(0);
    expect(fleet.getShips(Vessle.M_TRANSPORT)).toEqual(100);
    expect(game.stardate).toEqual(0.5);
  });

  it('should unload transports', () => {
    fleet.addShips(Vessle.M_TRANSPORT, 100);

    controller.unloadTransports(100);

    expect(fleet.planet.getResource(Resource.MILITARY)).toEqual(100);
    expect(fleet.getShips(Vessle.TRANSPORT)).toEqual(100);
    expect(fleet.getShips(Vessle.M_TRANSPORT)).toEqual(0);
    expect(game.stardate).toEqual(0.5);
  });

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
    expect(game.stardate).toEqual(0.5);
  });

  it.todo('should build ships');

  it.todo('should send spy satelites');

  it.todo('should attack a planet');
});
