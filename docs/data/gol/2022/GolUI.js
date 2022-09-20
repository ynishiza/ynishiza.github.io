/* global $ _ */
import {
	GOL_LIVE,
	GOL_DEAD,
	golCreate,
	matrixForEach,
} from './common.js';

export default class GolUI2 {
	constructor(m, n) {
		if (!m || !n) throw new Error("Invalid size");
		this.element = $("<div>")
			.addClass("gol_container")
			.get();
		this.m = m;
		this.n = n;
		this.cells = new Array(m);

		// Initialize
		for (let i = 0; i < m; i++) {
			this.cells[i] = new Array(n);

			const row = $("<div>")
				.addClass("gol_row")
				.appendTo(this.element);
			for (let j = 0; j < n; j++) {
				this.cells[i][j] = $("<span>")
					.text("_")
					.addClass("gol_cell")
					.addClass("unselectable")
					.addClass(GolUI2.GOLUI_DEAD)
					.click(function() {
						GolUI2.toggleState(this);
					})
					.mouseover(function(e) {
						if (e.buttons === 1 && !e.shiftKey) GolUI2.setLive(this);
						if (e.buttons === 1 && e.shiftKey) GolUI2.setDead(this);
					})
					.get();

				this.cells[i][j][0].title = `${i},${j}`;

				row.append(this.cells[i][j]);
			}
		}
	}
	static GOLUI_LIVE = "gol_live";
	static GOLUI_DEAD = "gol_dead";
	cells = null;
	m = 0;
	n = 0;
	element = null;

	set(gol) {
		matrixForEach(gol, (v, i, j) => {
			if (v === GOL_LIVE) GolUI2.setLive(this.cells[i][j]);
			else GolUI2.setDead(this.cells[i][j]);
		});
	}
	get() {
		const nextGol = golCreate(this.m, this.n);

		matrixForEach(this.cells, (cell, i, j) => {
			nextGol[i][j] = $(cell).hasClass(GolUI2.GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
		});

		return nextGol;
	}
	destroy() {
		$(this.element).remove();
	}

	static setLive(cell) {
		$(cell).addClass(GolUI2.GOLUI_LIVE).removeClass(GolUI2.GOLUI_DEAD);
	}
	static setDead(cell) {
		$(cell).addClass(GolUI2.GOLUI_DEAD).removeClass(GolUI2.GOLUI_LIVE);
	}
	static toggleState(cell) {
		if ($(cell).hasClass(GolUI2.GOLUI_DEAD)) GolUI2.setLive(cell);
		else GolUI2.setDead(cell);
	}
}

