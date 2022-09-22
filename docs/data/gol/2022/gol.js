import {
	GOL_DEAD,
	GOL_LIVE,
	GOL_NEIGHBOR_INDICES,
	for2d,
	matrixForEach,
} from './common.js';

export const create = golCreate;
export const stat = golStat;
export const step = golStep;
export const size = golSize;
export const random = golRandom;

// m = rows = height
// n = columns = width
function golCreate(m, n) {
	const gol = new Array(m).fill(null)
		.map(() => new Array(n).fill(GOL_DEAD));
	return gol;
}

// note: info of point neighborhood
function golNeighborInfo(i, j, gol) {
	let liveCount = 0;
	let deadCount = 0;
	const size = golSize(gol);
	GOL_NEIGHBOR_INDICES.forEach(ind => {
		const row = i + ind[0];
		// case: row out of bounds
		// i.e. the point is at the top or bottom edge of the boundary so no neighbor
		//
		if (!gol[row]) return;

		const col = j + ind[1];
		// case: column out of bounds
		// i.e. point is at the left or right edge of the boundary so no neighbor.
		if (col < 0 || col >= size.n) {
			return;
		}

		switch(gol[row][col]) {
			case GOL_LIVE:
				liveCount++;
				break;
			case GOL_DEAD:
				deadCount++;
				break;
			default:
				throw new Error('Should never happen');
		}
	});

	return {
		i,
		j,
		isLive: gol[i][j] === GOL_LIVE,
		live: liveCount,
		dead: deadCount
	};
}

// note: generate a random GOL from a seed
// p = probability that a cell is live
function golRandom(gol, p) {
	if (!(p >= 0 && p <= 1)) alert("Invalid live probability");
	matrixForEach(gol, (v, i, j) => {
		const x = Math.random();
		gol[i][j] = x < p ? GOL_LIVE : GOL_DEAD;
	});
	return gol;
}

// note: the main GOL step algorithm
function golStep(gol) {
	const size = golSize(gol);
	const nextGol = golCreate(size.m, size.n);

	let newBorn = 0;
	let newDead = 0;
	let survive = 0;
	let neighborCount = 0;

	// main: compute next step
	matrixForEach(gol, (v, i, j) => {
		const nbrInfo = golNeighborInfo(i, j, gol);
		if (nbrInfo.isLive) {
			if (nbrInfo.live === 2 || nbrInfo.live === 3) {
				// case: unchanged i.e. survive
				nextGol[i][j] = GOL_LIVE;
				survive++;
				neighborCount += nbrInfo.live;
			} else {
				// case: die
				nextGol[i][j] = GOL_DEAD;
				newDead++;
			}
		} else {
			if (nbrInfo.live === 3) {
				// case: new born
				nextGol[i][j] = GOL_LIVE;
				newBorn++;
				neighborCount += nbrInfo.live;
			} else {
				// case: unchanged
				nextGol[i][j] = GOL_DEAD;
			}
		}
	});

	// Info
	const stat = golStat(nextGol);
	stat.newBorn = newBorn;
	stat.newDead = newDead;
	stat.survive = survive;
	stat.neighborCount = neighborCount;

	return {
		gol: nextGol,
		stat,
	};
}

function golSize(gol) {
	return {
		m: gol.length,
		n: gol.length > 0 ? gol[0].length : 0
	};
}

function golStat(gol) {
	const size = golSize(gol);
	const stat = {
		live: 0,
		total: size.m * size.n,
	};
	matrixForEach(gol, (v, i, j) => {
		if (v === GOL_LIVE) stat.live++;
	});
	return stat;
}

