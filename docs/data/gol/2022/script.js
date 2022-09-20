/* global $ _ */
// const GOL_LIVE = 1;
// const GOL_DEAD = 0;
const LOCALSTORAGE_KEY = "GOL";
// const GOL_NEIGHBOR_INDICES = [
//   [-1, 0],
//   [-1, 1],
//   [0, 1],
//   [1, 1],
//   [1, 0],
//   [1, -1],
//   [0, -1],
//   [-1, -1]
// ];

const m = 100;
const n = 100;

// const GOLUI_LIVE = "gol_live";
// const GOLUI_DEAD = "gol_dead";

import {
  golCreate,
  GOL_LIVE,
  GOL_DEAD,
  matrixForEach,
} from './common.js';
import GolUI2 from './GolUI.js';
import GolRunner from './GolRunner.js';


// class GolUI2 {
//   constructor(m, n) {
// 		if (!m || !n) throw new Error("Invalid size");
// 		this.element = $("<div>")
// 			.addClass("gol_container")
// 			.get();
// 		this.m = m;
// 		this.n = n;
// 		this.cells = new Array(m);

// 		// Initialize
// 		for (let i = 0; i < m; i++) {
// 			this.cells[i] = new Array(n);

// 			const row = $("<div>")
// 				.addClass("gol_row")
// 				.appendTo(this.element);
// 			for (let j = 0; j < n; j++) {
// 				this.cells[i][j] = $("<span>")
// 					.text("_")
// 					.addClass("gol_cell")
// 					.addClass("unselectable")
// 					.addClass(GOLUI_DEAD)
// 					.click(function() {
// 						GolUI2.toggleState(this);
// 					})
// 					.mouseover(function(e) {
// 						if (e.buttons === 1 && !e.shiftKey) GolUI2.setLive(this);
// 						if (e.buttons === 1 && e.shiftKey) GolUI2.setDead(this);
// 					})
// 					.get();

//         this.cells[i][j][0].title = `${i},${j}`;

// 				row.append(this.cells[i][j]);
// 			}
// 		}
//   }
//   static GOLUI_LIVE = "gol_live";
//   static GOLUI_DEAD = "gol_dead";
//   cells = null;
//   m = 0;
//   n = 0;
//   element = null;

//   set(gol) {
// 		matrixForEach(gol, (v, i, j) => {
// 			if (v === GOL_LIVE) GolUI2.setLive(this.cells[i][j]);
// 			else GolUI2.setDead(this.cells[i][j]);
// 		});
//   }
//   get() {
// 		const nextGol = golCreate(this.m, this.n);

// 		matrixForEach(this.cells, (cell, i, j) => {
// 			nextGol[i][j] = $(cell).hasClass(GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
// 		});

// 		return nextGol;
//   }
//   destroy() {
// 		$(this.element).remove();
//   }

//   static setLive(cell) {
//     $(cell).addClass(GolUI2.GOLUI_LIVE).removeClass(GolUI2.GOLUI_DEAD);
//   }
//   static setDead(cell) {
//     $(cell).addClass(GolUI2.GOLUI_DEAD).removeClass(GolUI2.GOLUI_LIVE);
//   }
//   static toggleState(cell) {
//     if ($(cell).hasClass(GolUI2.GOLUI_DEAD)) GolUI2.setLive(cell);
//     else GolUI2.setDead(cell);
//   }
// }

//var GolUI = (function() {
//	var GOLUI_LIVE = "gol_live",
//		GOLUI_DEAD = "gol_dead";

//	var setDead = function(cell) {
//			$(cell).addClass(GOLUI_DEAD).removeClass(GOLUI_LIVE);
//		},
//		setLive = function(cell) {
//			$(cell).addClass(GOLUI_LIVE).removeClass(GOLUI_DEAD);
//		},
//		toggleState = function(cell) {
//			if ($(cell).hasClass(GOLUI_DEAD)) setLive(cell);
//			else setDead(cell);
//		};

//	var GolUI = function(m, n) {
//		if (!m || !n) throw new Error("Invalid size");
//		this.element = $("<div>")
//			.addClass("gol_container")
//			.get();
//		this.m = m;
//		this.n = n;
//		this.cells = new Array(m);

//		// Initialize
//		var i, j;
//		for (i = 0; i < m; i++) {
//			this.cells[i] = new Array(n);

//			var row = $("<div>")
//				.addClass("gol_row")
//				.appendTo(this.element);
//			for (j = 0; j < n; j++) {

//				this.cells[i][j] = $("<span>")
//					//.text("_")
//					.addClass("gol_cell")
//					.addClass("unselectable")
//					.addClass(GOLUI_DEAD)
//					.click(function() {
//						toggleState(this);
//					})
//					.mouseover(function(e) {
//						if (e.buttons === 1 && !e.shiftKey) setLive(this);
//						if (e.buttons === 1 && e.shiftKey) setDead(this);
//					})
//					.get();

//				row.append(this.cells[i][j]);
//			}
//		}
//	};

//	GolUI.prototype.set = function(gol) {
//		matrixForEach(gol, (v, i, j) => {
//			if (v === GOL_LIVE) setLive(this.cells[i][j]);
//			else setDead(this.cells[i][j]);
//		});
//	};
//	GolUI.prototype.get = function() {
//		var nextGol = golCreate(this.m, this.n);

//		matrixForEach(this.cells, (cell, i, j) => {
//			nextGol[i][j] = $(cell).hasClass(GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
//		});

//		return nextGol;
//	};

//	GolUI.prototype.destroy = function() {
//		$(this.element).remove();
//	};
//	return GolUI;
//}) ();


// class GolRunner {
//   constructor(golUI) {
//     this.golUI = golUI;
//   }
//   epoc = 0
//   timer = null
//   startDraw(interval) {
//     if (this.isStarted()) this.stopDraw();
//     this.timer = setInterval(() => {
//       const gol = golStep(this.golUI.get());
//       this.golUI.set(gol);
//       this.updateInfo(gol);
//     }, interval);
//   }
//   stopDraw() {
//     clearInterval(this.timer);
//     this.timer = null;
//   }
//   reset(gol) {
//     this.epoc = 0;
//     if (!gol) gol = golCreate(this.golUI.m, this.golUI.n);
//     if (!gol.stat) gol.stat = golStat(gol);

//     this.golUI.set(gol);
//     this.updateInfo(gol);
//     return gol;
//   }
//   isStarted() { return !!this.timer; }
//   updateInfo(gol) {
//     const stat = gol.stat || golStat(gol);
//     $('[name="info_epoc"]').text(this.epoc++);
//     $('[name="info_live"]').text(stat.live);
//     $('[name="info_dead"]').text(stat.total - stat.live);
//     $('[name="info_percent"]').text(stat.live / stat.total);
//     $('[name="info_newborn"]').text(stat.newBorn != null ? stat.newBorn : 'NA');
//     $('[name="info_newdead"]').text(stat.newDead != null ? stat.newDead : 'NA');
//     $('[name="info_survive"]').text(stat.survive != null ? stat.survive : 'NA');
//     $('[name="info_neighborcount"]').text(stat.neighborCount != null ? stat.neighborCount / stat.live : 'NA');
//   }
// }

function main() {
	const gol = golCreate(m, n);
	const golUI = new GolUI2(m, n);

  const runner = new GolRunner(golUI);

	gol[10][5] = GOL_LIVE;
	gol[10][6] = GOL_LIVE;
	gol[10][7] = GOL_LIVE;
	golUI.set(gol);
	$(golUI.element).appendTo(document.body.querySelector("#main"));

	const updateIntervalBox = $('[name="update_interval"]')
		.change(function() {
			if (runner.isStarted()) doStartDraw();
		});
	function doStartDraw() {
		const x = +updateIntervalBox.val();
		if (x > 0) runner.startDraw(x);
		else alert("Invalid interval");
	}

	$('[name="save"]')
		.click(function(e) {
			const gol = golUI.get();
			localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(gol));
      alert("Saved local");
		});

	$('[name="load"]')
		.click(function(e) {
			try {
				let gol = localStorage.getItem(LOCALSTORAGE_KEY);
				gol = JSON.parse(gol);
				golUI.set(gol);
			} catch (err) {
				alert("Failed to load GOL:\n" + err.message);
			}
		});

	$('[name="start_stop"]')
		.click(function(e) {
			if (runner.isStarted()) {
				$(this).text("Start");
				runner.stopDraw();
			} else {
				$(this).text("Stop");
				doStartDraw();
			}
		});

	$('[name="clear"]')
		.click(function() {
			runner.reset();
		});

	$('[name="random_generate"]')
		.click(function() {
			const p = +$('[name="random_prob"]').val();
			if (!(p >= 0 && p <= 1)) alert("Invalid probability");

			const gol = golCreate(golUI.m, golUI.n);
			matrixForEach(gol, (v, i, j) => {
				const x = Math.random();
				gol[i][j] = x < p ? GOL_LIVE : GOL_DEAD;
			});

			runner.reset(gol);
		});

	doStartDraw();
}

$(document).ready(main);
