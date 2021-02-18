import {Resource, ResourceMap} from 'data/industry';
import {Position} from 'position/position';
import {POPULATION_GROWTH_RATE} from './planet';
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

  it.todo('should reject industry allocation that does not sum to 100');

  describe('Update', () => {
    it('should grow population when updated', () => {
      const startingPop = 10;
      const planet = new PlanetBuilder().withPopulation(startingPop).build();

      planet.update(1);

      const expectedPop = startingPop * (1 + POPULATION_GROWTH_RATE);
      expect(planet.population).toEqual(expectedPop);
    });

    it.todo('should produced resources when updated');

    it.todo('should replace fleet when updated and hostile');
  });

  it.todo('should lose population when attacked');

  it.todo('should become occupied when attacked successfully');

  it.todo('should fight off occupying fleet when occupied and updated');

  it.todo('should join the empire when occupied long enough');
});
