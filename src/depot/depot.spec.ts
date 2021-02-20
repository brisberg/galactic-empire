import {Resource} from '../data/industry';
import {
  Depot,
  InsufficientResourceError,
  ResourceOverCapacityError,
} from './depot';

describe('Depot', () => {
  let depot: Depot;

  beforeEach(() => {
    depot = new Depot();
  });

  it('should have infinite capacity by default', () => {
    expect(depot.getCapacity(Resource.FUEL)).toEqual(Infinity);
  });

  it('should set the max Capacity for a resource', () => {
    depot.setCapacity(Resource.FUEL, 2000);

    expect(depot.getCapacity(Resource.FUEL)).toEqual(2000);
  });

  it('should set a Resource amount within capacity', () => {
    depot.setResource(Resource.FUEL, 1000);

    expect(depot.getResource(Resource.FUEL)).toEqual(1000);
  });

  it('should throw an error when setting a Resource over capacity', () => {
    depot.setCapacity(Resource.FUEL, 2000);

    expect(() => depot.setResource(Resource.FUEL, 2001))
        .toThrowError(new ResourceOverCapacityError(Resource.FUEL, 2001, 2000));
  });

  it('should add a Resource within capacity', () => {
    depot.setResource(Resource.FUEL, 1000);

    depot.addResource(Resource.FUEL, 500);

    expect(depot.getResource(Resource.FUEL)).toEqual(1500);
  });

  it('should throw an error when adding a Resource over capacity', () => {
    depot.setCapacity(Resource.FUEL, 1200);
    depot.setResource(Resource.FUEL, 1000);

    expect(() => depot.addResource(Resource.FUEL, 500))
        .toThrowError(new ResourceOverCapacityError(Resource.FUEL, 1500, 1200));
  });

  it('should remove a Resource', () => {
    depot.setResource(Resource.FUEL, 1000);

    depot.removeResource(Resource.FUEL, 300);

    expect(depot.getResource(Resource.FUEL)).toEqual(700);
  });

  it('should throw an error when removing more resource than in Depot', () => {
    depot.setResource(Resource.FUEL, 1000);

    expect(() => depot.removeResource(Resource.FUEL, 1100))
        .toThrowError(new InsufficientResourceError(Resource.FUEL, 1000, 1100));
  });

  it('should return all resources store in Depot', () => {
    depot.setResource(Resource.FUEL, 1000);
    depot.setResource(Resource.SUPPLY, 2000);

    expect(depot.getAllResources())
        .toEqual({[Resource.FUEL]: 1000, [Resource.SUPPLY]: 2000});
  });
});
