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
	cell.classList.add(GOLUI_LIVE);
	cell.classList.remove(GOLUI_DEAD);
}
function setDead(cell) {
	cell.classList.remove(GOLUI_LIVE);
	cell.classList.add(GOLUI_DEAD);
}
function toggleState(cell) {
	if (cell.classList.contains(GOLUI_DEAD)) setLive(cell);
	else setDead(cell);
}

export default class GolUI {
	constructor(m, n) {
		if (!m || !n) throw new Error("Invalid size");
		this.element = document.createElement('div');
		this.element.classList.add('gol_container');
		// this.element = $("<div>")
		// 	.addClass("gol_container")
		// 	.get();
		this.m = m;
		this.n = n;
		this.cells = new Array(m);

		// Initialize
		for (let i = 0; i < m; i++) {
			this.cells[i] = new Array(n);

			const row = document.createElement("div");
			row.classList.add('gol_row');
			this.element.append(row);
			for (let j = 0; j < n; j++) {
				const cell = document.createElement('span');
				cell.classList.add('gol_cell', 'unselectable', GOL_DEAD);
				cell.title = `${i},${j}`;
					cell.addEventListener('click', () => toggleState(cell));
					cell.addEventListener('mouseover', (e) => {
						if (e.buttons === 1 && !e.shiftKey) setLive(cell);
						if (e.buttons === 1 && e.shiftKey) setDead(cell);
					});

				// this.cells[i][j][0].title = `${i},${j}`;

				this.cells[i][j] = cell;
				row.append(cell);
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
			nextGol[i][j] = cell.classList.contains(GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
		});

		return nextGol;
	}
	destroy() {
		this.element.remove();
	}
}

