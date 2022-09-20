/* global $ _ */
import {
	GOL_LIVE,
	GOL_DEAD,
	GOL_NEIGHBOR_INDICES,
} from './common.js';

export default class GolRunner {
	constructor(golUI) {
		this.golUI = golUI;
	}

	epoc = 0
	timer = null
	startDraw(interval) {
		if (this.isStarted()) this.stopDraw();
		this.timer = setInterval(() => {
			const gol = golStep(this.golUI.get());
			this.golUI.set(gol);
			this.updateInfo(gol);
		}, interval);
	}
	stopDraw() {
		clearInterval(this.timer);
		this.timer = null;
	}
	reset(gol) {
		this.epoc = 0;
		if (!gol) gol = golCreate(this.golUI.m, this.golUI.n);
		if (!gol.stat) gol.stat = golStat(gol);

		this.golUI.set(gol);
		this.updateInfo(gol);
		return gol;
	}
	isStarted() { return !!this.timer; }
	updateInfo(gol) {
		const stat = gol.stat || golStat(gol);
		$('[name="info_epoc"]').text(this.epoc++);
		$('[name="info_live"]').text(stat.live);
		$('[name="info_dead"]').text(stat.total - stat.live);
		$('[name="info_percent"]').text(stat.live / stat.total);
		$('[name="info_newborn"]').text(stat.newBorn != null ? stat.newBorn : 'NA');
		$('[name="info_newdead"]').text(stat.newDead != null ? stat.newDead : 'NA');
		$('[name="info_survive"]').text(stat.survive != null ? stat.survive : 'NA');
		$('[name="info_neighborcount"]').text(stat.neighborCount != null ? stat.neighborCount / stat.live : 'NA');
	}
}

function drawGol(element, gol) {
	const elem = $(element);
	const width = gol.length;
	const height = gol[0].length;

	elem.empty();
	for (let i = 0; i < height; i++) {
		let rowHtml = "";
		for (let j = 0; j < width; j++) {
			rowHtml += "<span>" + (gol[i][j] === GOL_LIVE ? "1" : "0") + "</span>";
		}
		elem.append($("<div>").html(rowHtml));
	}
}

function golStat(gol) {
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

function golStep(gol) {
	const size = golSize(gol);
	const nextGol = golCreate(size.m, size.n);

	function golPosInfo(i, j, gol) {
		let liveCount = 0;
		let deadCount = 0;

		_.forEach(GOL_NEIGHBOR_INDICES, function(ind) {
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

function golSize(gol) {
	return {
		m: gol.length,
		n: gol.length > 0 ? gol[0].length : 0
	};
}

function golCreate(m, n) {
	let gol = new Array(m);
	for (let i = 0; i < m; i++) {
		gol[i] = new Array(n);
		for (let j = 0; j < n; j++) gol[i][j] = GOL_DEAD;
	}
	return gol;
}

function matrixForEach(matrix, callback) {
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
