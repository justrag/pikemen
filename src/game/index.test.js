import { move } from './index';
import { SE } from '../constants/';

describe('Game functions', () => {
  describe('move()', () => {
    it('moves correctly', () => {
      expect(move(4, 4, SE)).toEqual([5, 5]);
    });
  });
});
