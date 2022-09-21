import {
	GOL_LIVE,
	GOL_DEAD,
	GOL_NEIGHBOR_INDICES,
} from './common.js';

import * as golUtils from './gol.js';

function updateStatUI(runner, gol) {
	const stat = runner.stat || golUtils.stat(gol);
	runner._statUI.epoc.textContent = runner.epoc;
	runner._statUI.live.textContent = stat.live;
	runner._statUI.dead.textContent = stat.total - stat.live;
	runner._statUI.percent.textContent = stat.live / stat.total;
	runner._statUI.newborn.textContent = stat.newBorn != null ? stat.newBorn : 'NA';
	runner._statUI.newdead.textContent = stat.newDead != null ? stat.newDead : 'NA';
	runner._statUI.survive.textContent = stat.survive != null ? stat.survive : 'NA';
	runner._statUI.neighborCount.textContent = stat.neighborCount != null ? stat.neighborCount / stat.live : 'NA';
}

export default class GolRunner {
	constructor(golUI, statUI) {
		this._golUI = golUI;
		this._statUI = statUI;
		this.reset(golUI.get());
	}
	_timer = null;
	_epoc = 0;
	_golUI = null;
	_stat = null;
	_statUI = null;

	get epoc() { return this._epoc; }
	get golUI() { return this._golUI; }
	get stat() { return this._stat; }
	isStarted() { return !!this._timer; }

	startDraw(interval) {
		if (this.isStarted()) return;
		this._timer = setInterval(() => this.step(), interval);
	}
	step() {
		const { gol, stat } = golUtils.step(this.golUI.get());
		this._epoc += 1;
		this._stat = stat;
		this.golUI.set(gol);
		updateStatUI(this, gol);
	}
	stopDraw() {
		if (!this.isStarted()) return;
		clearInterval(this._timer);
		this._timer = null;
	}

	reset(gol, epoc, stat) {
		if (!gol) gol = golUtils.create(this.golUI.m, this.golUI.n);
		this._epoc = epoc || 0;
		this._stat = stat || golUtils.stat(gol);
		this.golUI.set(gol);
		updateStatUI(this, gol);
		return gol;
	}

	fromJSON(data) {
		this.reset(data.gol, data.epoc, data.stat);
	}
	toJSON() {
		return {
			gol: this.golUI.get(),
			stat: this.stat,
			epoc: this.epoc,
		};
	}
}
