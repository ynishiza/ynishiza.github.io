import {
	GOL_LIVE,
	GOL_DEAD,
	GOL_NEIGHBOR_INDICES,
	golStat,
	golStep,
	golCreate,
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
		document.querySelector('[name="info_epoc"]').textContent = this.epoc++;
		document.querySelector('[name="info_live"]').textContent = stat.live;
		document.querySelector('[name="info_dead"]').textContent = stat.total - stat.live;
		document.querySelector('[name="info_percent"]').textContent = stat.live / stat.total;
		document.querySelector('[name="info_newborn"]').textContent = stat.newBorn != null ? stat.newBorn : 'NA';
		document.querySelector('[name="info_newdead"]').textContent = stat.newDead != null ? stat.newDead : 'NA';
		document.querySelector('[name="info_survive"]').textContent = stat.survive != null ? stat.survive : 'NA';
		document.querySelector('[name="info_neighborcount"]').textContent = stat.neighborCount != null ? stat.neighborCount / stat.live : 'NA';
	}
}
