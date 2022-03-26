import {
	GOL_LIVE,
	GOL_DEAD,
} from '../data/gol/2022/common.js';
import * as golUtils from '../data/gol/2022/gol.js';
const chai = window.chai;

const { expect } = chai;

describe('test', function() {
	describe('gol', function() {
		it('should create a new game', function() {
			const gol = golUtils.create(2, 3);
			expect(gol).to.eql([
				[0, 0, 0],
				[0, 0, 0],
			]);
		});

		it('execute a game step', function() {
			// Basic game: just two states
			const init = [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 1, 1, 1, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			];
			let result;

			result = golUtils.step(init);
			expect(result.gol).to.eql([
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0],
			]);
			expect(result.stat).to.eql({
				live: 3,
				total: 25,
				newBorn: 2,
				newDead: 2,
				survive: 1,
				neighborCount: 8,
			});

			result = golUtils.step(result.gol);
			expect(result.gol).to.eql(init);
			expect(result.stat).to.eql({
				live: 3,
				total: 25,
				newBorn: 2,
				newDead: 2,
				survive: 1,
				neighborCount: 8,
			});
		});
	});
});
