/* global $ */
import {
	GOL_LIVE,
	GOL_DEAD,
	golCreate,
	matrixForEach,
} from './common.js';
export const x = 1;

const GOLUI_LIVE = "gol_live";
const GOLUI_DEAD = "gol_dead";
function setLive(cell) {
	$(cell).addClass(GOLUI_LIVE).removeClass(GOLUI_DEAD);
}
function setDead(cell) {
	$(cell).addClass(GOLUI_DEAD).removeClass(GOLUI_LIVE);
}
function toggleState(cell) {
	if ($(cell).hasClass(GOLUI_DEAD)) setLive(cell);
	else setDead(cell);
}

export default class GolUI {
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
					.addClass(GOLUI_DEAD)
					.click(function() {
						toggleState(this);
					})
					.mouseover(function(e) {
						if (e.buttons === 1 && !e.shiftKey) setLive(this);
						if (e.buttons === 1 && e.shiftKey) setDead(this);
					})
					.get();

				this.cells[i][j][0].title = `${i},${j}`;

				row.append(this.cells[i][j]);
			}
		}
	}
	cells = null;
	m = 0;
	n = 0;
	element = null;

	set(gol) {
		matrixForEach(gol, (v, i, j) => {
			if (v === GOL_LIVE) setLive(this.cells[i][j]);
			else setDead(this.cells[i][j]);
		});
	}
	get() {
		const nextGol = golCreate(this.m, this.n);

		matrixForEach(this.cells, (cell, i, j) => {
			nextGol[i][j] = $(cell).hasClass(GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
		});

		return nextGol;
	}
	destroy() {
		$(this.element).remove();
	}

}

