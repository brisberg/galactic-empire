import {Fleet, NotEnoughShipsError} from './fleet';
import {Vessle} from './ship';

describe('Fleet', () => {
  let fleet: Fleet;

  beforeEach(() => {
    fleet = new Fleet();
  });

  it('should initialize with no ships', () => {
    expect(fleet.getShips()).toEqual({});
  });

  it.todo('should transfer ships to another fleet');

  it('should add ships', () => {
    fleet.addShips(Vessle.FIGHTER, 10);

    expect(fleet.getShips()).toEqual({
      [Vessle.FIGHTER]: 10,
    });
  });

  it('should remove ships', () => {
    fleet.addShips(Vessle.FIGHTER, 10);

    fleet.removeShips(Vessle.FIGHTER, 5);

    expect(fleet.getShips()).toEqual({
      [Vessle.FIGHTER]: 5,
    });
  });

  it('should throw an error when removing more ships than exist', () => {
    fleet.addShips(Vessle.FIGHTER, 5);

    expect(() => fleet.removeShips(Vessle.FIGHTER, 10))
        .toThrowError(new NotEnoughShipsError(Vessle.FIGHTER, 10, 5));
  });

  describe('Travel', () => {
    it.todo('should calculate supply and fuel costs of travel');

    it.todo('should deduct supplies and fuel on travel');

    it.todo('should refuse to travel without sufficient supplies');

    it.todo('should refuse to travel without sufficient fuel');

    it.todo('should travel to new location after travel time');
  });

  it.todo('should calculate supply storage limit');

  it.todo('should calculate fuel storage limit');
});
