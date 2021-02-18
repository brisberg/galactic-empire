import {PRODUCTION_RATE, Resource, ResourceMap} from 'data/industry';
import {Position} from 'position/position';
import {InvalidIndustryAllocError, POPULATION_GROWTH_RATE} from './planet';
import {PlanetBuilder} from './planet.mock';

describe('Planet', () => {
  it('should calculate the distance to another planet', () => {
    const planet1 = new PlanetBuilder().atPosition(new Position(0, 0)).build();
    const planet2 = new PlanetBuilder().atPosition(new Position(10, 5)).build();

    expect(planet1.distanceTo(planet2)).toEqual(Math.hypot(10, 5));
  });

  it('should set industry allocation', () => {
    const planet = new PlanetBuilder().build();
    const newAlloc: ResourceMap = {
      [Resource.CREDIT]: 10,
      [Resource.SUPPLY]: 30,
      [Resource.FUEL]: 40,
      [Resource.MILITARY]: 10,
      [Resource.SHIPPARTS]: 10,
    };

    planet.setIndustryAllocation(newAlloc);

    expect(planet.getIndustryAllocation()).toEqual(newAlloc);
  });

  it('should reject industry allocation that does not sum to 100', () => {
    const planet = new PlanetBuilder().build();
    const invalidAlloc: ResourceMap = {
      [Resource.CREDIT]: 50,
      [Resource.SUPPLY]: 50,
      [Resource.FUEL]: 50,
      [Resource.MILITARY]: 50,
      [Resource.SHIPPARTS]: 50,
    };

    expect(() => planet.setIndustryAllocation(invalidAlloc))
        .toThrowError(new InvalidIndustryAllocError(invalidAlloc));
  });

  describe('on Update', () => {
    it('should grow population', () => {
      const startingPop = 10;
      const planet = new PlanetBuilder().withPopulation(startingPop).build();

      planet.update(1);

      const expectedPop = startingPop * (1 + POPULATION_GROWTH_RATE);
      expect(planet.population).toEqual(expectedPop);
    });

    it('should produce resources', () => {
      const planet = new PlanetBuilder()
                         .withPopulation(50)
                         .withIndustryAlloc({
                           [Resource.CREDIT]: 20,
                           [Resource.SUPPLY]: 20,
                           [Resource.FUEL]: 20,
                           [Resource.MILITARY]: 20,
                           [Resource.SHIPPARTS]: 20,
                         })
                         .build();
      const expectedResources: ResourceMap = {
        [Resource.CREDIT]:
            Math.floor(50 * 20 / 100 * PRODUCTION_RATE[Resource.CREDIT]),
        [Resource.SUPPLY]:
            Math.floor(50 * 20 / 100 * PRODUCTION_RATE[Resource.SUPPLY]),
        [Resource.FUEL]:
            Math.floor(50 * 20 / 100 * PRODUCTION_RATE[Resource.FUEL]),
        [Resource.MILITARY]:
            Math.floor(50 * 20 / 100 * PRODUCTION_RATE[Resource.MILITARY]),
        [Resource.SHIPPARTS]:
            Math.floor(50 * 20 / 100 * PRODUCTION_RATE[Resource.SHIPPARTS]),
      };

      planet.update(1);

      expect(planet.getResource(Resource.CREDIT))
          .toEqual(expectedResources[Resource.CREDIT]);
      expect(planet.getResource(Resource.SUPPLY))
          .toEqual(expectedResources[Resource.SUPPLY]);
      expect(planet.getResource(Resource.FUEL))
          .toEqual(expectedResources[Resource.FUEL]);
      expect(planet.getResource(Resource.MILITARY))
          .toEqual(expectedResources[Resource.MILITARY]);
      expect(planet.getResource(Resource.SHIPPARTS))
          .toEqual(expectedResources[Resource.SHIPPARTS]);
    });

    it.todo('should replace fleet when hostile');
  });

  it.todo('should lose population when attacked');

  it.todo('should become occupied when attacked successfully');

  it.todo('should fight off occupying fleet when occupied and updated');

  it.todo('should join the empire when occupied long enough');
});
