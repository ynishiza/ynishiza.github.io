/* global $ */
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
