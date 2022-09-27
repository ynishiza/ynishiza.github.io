import {
	GOL_LIVE,
	GOL_DEAD,
	for2d,
	matrixForEach,
} from './common.js';
import * as golUtils from './gol.js';

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
		this.m = m;
		this.n = n;
		this.cells = new Array(m);

		// Initialize
		let row;
		for2d((i, j) => {
			if (i === 0) {
				this.cells[i] = new Array(n);
				row = document.createElement("div");
				row.classList.add('gol_row');
				this.element.append(row);
			}

			const cell = document.createElement('span');
			cell.classList.add('gol_cell', 'unselectable', GOL_DEAD);

			cell.title = `${i},${j}`;
			// action: toggle state
			cell.addEventListener('click', () => toggleState(cell));
			// action: draw
			// e.g. press shift and drag to draw
			cell.addEventListener('mouseover', (e) => {
				// note: e.buttons === 1: left click
				if (e.buttons === 1 && !e.shiftKey) setLive(cell);
				if (e.buttons === 1 && e.shiftKey) setDead(cell);
			});

			this.cells[i][j] = cell;
			row.append(cell);
		});
		for (let i = 0; i < m; i++) {
			this.cells[i] = new Array(n);

			const row = document.createElement("div");
			row.classList.add('gol_row');
			this.element.append(row);
			for (let j = 0; j < n; j++) {
				const cell = document.createElement('span');
				cell.classList.add('gol_cell', 'unselectable', GOL_DEAD);

				cell.title = `${i},${j}`;
				// action: toggle state
				cell.addEventListener('click', () => toggleState(cell));
				// action: draw
				// e.g. press shift and drag to draw
				cell.addEventListener('mouseover', (e) => {
					// note: e.buttons === 1: left click
					if (e.buttons === 1 && !e.shiftKey) setLive(cell);
					if (e.buttons === 1 && e.shiftKey) setDead(cell);
				});

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

		// note: adjust size of game board to fit all cells
		const size = golUtils.size(gol);
		const cell = this.cells[0][0];
		this.element.style.width = `${size.n * (cell.offsetWidth + 2) + 2}px`;
	}

	get() {
		const nextGol = golUtils.create(this.m, this.n);
		matrixForEach(this.cells, (cell, i, j) => {
			nextGol[i][j] = cell.classList.contains(GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
		});
		return nextGol;
	}

	destroy() {
		this.element.remove();
	}
}
