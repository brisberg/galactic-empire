import {Position} from './position';

describe('Position', () => {
  it('should calculate the distance between two positions', () => {
    const pos1 = new Position(10, 10);
    const pos2 = new Position(5, 5);

    // Pathagorean Distance of (5,5);
    const expected = Math.sqrt(25 + 25);
    expect(pos1.distanceTo(pos2)).toEqual(expected);
  });
});
