export const GOL_LIVE = 1;
export const GOL_DEAD = 0;
export const GOL_NEIGHBOR_INDICES = [
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1]
];

export function golStat(gol) {
	const size = golSize(gol);

	const total = size.m * size.n;
	let live = 0;

	matrixForEach(gol, (v, i, j) => {
		if (v === GOL_LIVE) live++;
	});

	return {
		live: live,
		total: total
	};
}

export function golStep(gol) {
	const size = golSize(gol);
	const nextGol = golCreate(size.m, size.n);

	function golPosInfo(i, j, gol) {
		let liveCount = 0;
		let deadCount = 0;

		GOL_NEIGHBOR_INDICES.forEach((ind) => {
			if (!gol[i + ind[0]]) return;
			switch(gol[i + ind[0]][j + ind[1]]) {
				case GOL_LIVE:
					liveCount++;
					break;
				case GOL_DEAD:
					deadCount++;
					break;
			}
		});

		return {
			isLive: gol[i][j] === GOL_LIVE,
			live: liveCount,
			dead: deadCount
		};
	}

	let newBorn = 0;
	let newDead = 0;
	let survive = 0;
	let neighborCount = 0;
	matrixForEach(gol, (v, i, j) => {
		const info = golPosInfo(i, j, gol);

		if (info.isLive) {
			if (info.live === 2 || info.live === 3) {
				nextGol[i][j] = GOL_LIVE;
				survive++;
				neighborCount += info.live;
			} else {
				nextGol[i][j] = GOL_DEAD;
				newDead++;
			}
		} else {
			if (info.live === 3) {
				nextGol[i][j] = GOL_LIVE;
				newBorn++;
				neighborCount += info.live;
			} else {
				nextGol[i][j] = GOL_DEAD;
			}
		}
	});

	// Info
	const info = golStat(nextGol);
	info.newBorn = newBorn;
	info.newDead = newDead;
	info.survive = survive;
	info.neighborCount = neighborCount;
	nextGol.stat = info;

	return nextGol;
}

export function golSize(gol) {
	return {
		m: gol.length,
		n: gol.length > 0 ? gol[0].length : 0
	};
}

export function golCreate(m, n) {
	let gol = new Array(m);
	for (let i = 0; i < m; i++) {
		gol[i] = new Array(n);
		for (let j = 0; j < n; j++) gol[i][j] = GOL_DEAD;
	}
	return gol;
}

export function matrixForEach(matrix, callback) {
	if (!matrix.length) return;

	const height = matrix.length;
	const width = matrix[0].length;

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			// From top, clockwise.
			// callback.call(thisArg, matrix[i][j], i, j, matrix);
			callback(matrix[i][j], i, j, matrix);
		}
	}
}
