/* global $ */
const LOCALSTORAGE_KEY = "GOL";
const m = 100;
const n = 100;

import {
  golCreate,
  GOL_LIVE,
  GOL_DEAD,
  matrixForEach,
} from './common.js';
import GolUI2 from './GolUI.js';
import GolRunner from './GolRunner.js';

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

export default main;
