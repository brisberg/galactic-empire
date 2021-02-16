import {Game} from 'game';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it('should initialize at Stardate 0', () => {
    expect(game.stardate).toEqual(0);
  });

  it.todo('should initialize with 19 independent planets and one home');

  it('should advance the Stardate when update is called', () => {
    const initialDate = game.stardate;

    game.update(5);

    expect(game.stardate).toEqual(initialDate + 5);
  });

  it.todo('should update all planets when time advances to the next Stardate');

  it.todo('should end in a loss when Star Date passes 1200');

  it.todo('should end in victory when all planets are Occupied or Empire');
});
