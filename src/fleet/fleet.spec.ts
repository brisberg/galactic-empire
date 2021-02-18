import {FUEL_COST, SUPPLY_COST} from '../data/travelCosts';
import {Planet} from '../planet/planet';
import {PlanetBuilder} from '../planet/planet.mock';
import {Position} from '../position/position';

import {
  Fleet,
  InsufficientResourceError,
  InvalidFleetLocationError,
  NotEnoughShipsError,
} from './fleet';
import {FleetBuilder} from './fleet.mock';
import {Vessle} from './ship';

describe('Fleet', () => {
  let fleet: Fleet;
  let planet: Planet;

  beforeEach(() => {
    planet = new PlanetBuilder().atPosition(new Position(0, 0)).build();
    fleet = new FleetBuilder().atLocation(planet).build();
  });

  it('should initialize with no ships', () => {
    expect(fleet.getShips()).toEqual({});
  });

  it('should add ships', () => {
    fleet.addShips(Vessle.FIGHTER, 10);

    expect(fleet.getShips()).toEqual({
      [Vessle.FIGHTER]: 10,
    });
  });

  it('should remove ships', () => {
    fleet = new FleetBuilder().withShips(Vessle.FIGHTER, 10).build();

    fleet.removeShips(Vessle.FIGHTER, 5);

    expect(fleet.getShips()).toEqual({
      [Vessle.FIGHTER]: 5,
    });
  });

  it('should throw an error when removing more ships than exist', () => {
    fleet = new FleetBuilder().withShips(Vessle.FIGHTER, 5).build();

    expect(() => fleet.removeShips(Vessle.FIGHTER, 10))
        .toThrowError(new NotEnoughShipsError(Vessle.FIGHTER, 10, 5));
  });

  describe('Transfer', () => {
    it('should transfer ships to another fleet', () => {
      const sourceFleet = new FleetBuilder()
                              .atLocation(planet)
                              .withShips(Vessle.FIGHTER, 10)
                              .build();

      sourceFleet.transferTo(Vessle.FIGHTER, 3, fleet);

      expect(fleet.getShips()).toEqual({[Vessle.FIGHTER]: 3});
      expect(sourceFleet.getShips()).toEqual({[Vessle.FIGHTER]: 7});
    });

    it('should throw an error when transfering more ships than exist', () => {
      const sourceFleet = new FleetBuilder()
                              .atLocation(planet)
                              .withShips(Vessle.FIGHTER, 10)
                              .build();

      expect(() => sourceFleet.transferTo(Vessle.FIGHTER, 15, fleet))
          .toThrowError(new NotEnoughShipsError(Vessle.FIGHTER, 15, 10));
    });

    it('should throw an error if the fleets are on different planets', () => {
      const otherPlanet = new PlanetBuilder().build();
      const sourceFleet = new FleetBuilder().atLocation(otherPlanet).build();

      expect(() => sourceFleet.transferTo(Vessle.FIGHTER, 10, fleet))
          .toThrowError(
              new InvalidFleetLocationError(sourceFleet.planet, fleet.planet));
    });
  });

  describe('TravelTo', () => {
    let destination: Planet;

    beforeEach(() => {
      destination = new PlanetBuilder().atPosition(new Position(10, 0)).build();
      fleet.addShips(Vessle.FIGHTER, 100);
      fleet.addShips(Vessle.M_TRANSPORT, 150);
    });

    it('should calculate supply and fuel costs of travel', () => {
      const fighterSupplyCost = 100 * SUPPLY_COST[Vessle.FIGHTER];
      const fighterFuelCost = 100 * FUEL_COST[Vessle.FIGHTER];
      const transportSupplyCost = 150 * SUPPLY_COST[Vessle.M_TRANSPORT];
      const transportFuelCost = 150 * FUEL_COST[Vessle.M_TRANSPORT];
      const distance = planet.distanceTo(destination);

      const expectedSupplyCost =
          (fighterSupplyCost + transportSupplyCost) * distance;
      const expectedFuelCost = (fighterFuelCost + transportFuelCost) * distance;

      expect(fleet.calcSupplyCostTo(destination)).toEqual(expectedSupplyCost);
      expect(fleet.calcFuelCostTo(destination)).toEqual(expectedFuelCost);
    });

    it('should move the fleet to destinatio when traveling', () => {
      fleet.addSupply(10000);
      fleet.addFuel(10000);

      fleet.travelTo(destination);

      expect(fleet.planet).toBe(destination);
    });

    it('should deduct supplies and fuel on travel', () => {
      fleet.addSupply(10000);
      fleet.addFuel(10000);
      const supplyCost = fleet.calcSupplyCostTo(destination);
      const fuelCost = fleet.calcFuelCostTo(destination);

      fleet.travelTo(destination);

      expect(fleet.supplies).toEqual(10000 - supplyCost);
      expect(fleet.fuel).toEqual(10000 - fuelCost);
    });

    it('should refuse to travel without sufficient supplies', () => {
      fleet.addSupply(0);
      fleet.addFuel(10000);
      const supplyCost = fleet.calcSupplyCostTo(destination);

      expect(() => fleet.travelTo(destination))
          .toThrowError(new InsufficientResourceError('supply', 0, supplyCost));
    });

    it('should refuse to travel without sufficient fuel', () => {
      fleet.addSupply(10000);
      fleet.addFuel(0);
      const fuelCost = fleet.calcFuelCostTo(destination);

      expect(() => fleet.travelTo(destination))
          .toThrowError(new InsufficientResourceError('fuel', 0, fuelCost));
    });

    it.todo('should travel to new location after travel time');
  });

  it('should calculate supply storage limit', () => {
    fleet.addShips(Vessle.SUPPLY, 2);

    expect(fleet.supplyCapacity).toEqual(2000);
  });

  it('should calculate fuel storage limit', () => {
    fleet.addShips(Vessle.FUEL, 3);

    expect(fleet.fuelCapacity).toEqual(3000);
  });
});
