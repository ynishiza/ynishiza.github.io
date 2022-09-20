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
	document.body.querySelector("#main").append(golUI.element);

	const updateIntervalBox = document.querySelector('[name="update_interval"]');
	updateIntervalBox.addEventListener('change', () => {
			if (runner.isStarted()) doStartDraw();
		});
	function doStartDraw() {
		const x = parseInt(updateIntervalBox.value);
		if (x > 0) runner.startDraw(x);
		else alert("Invalid interval");
	}

	document.querySelector('[name="save"]')
		.addEventListener('click', (e) => {
			const gol = golUI.get();
			localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(gol));
      alert("Saved state to local storage");
		});

	document.querySelector('[name="load"]')
		.addEventListener('click', (e) => {
			try {
				let gol = localStorage.getItem(LOCALSTORAGE_KEY);
				gol = JSON.parse(gol);
				golUI.set(gol);
				setTimeout(() => {
					alert("Loaded state from local storage");
				});
			} catch (err) {
				alert("Failed to load GOL:\n" + err.message);
			}
		});

	document.querySelector('[name="start_stop"]')
		.addEventListener('click', (e) => {
			if (runner.isStarted()) {
				e.target.textContent = 'Start';
				runner.stopDraw();
			} else {
				e.target.textContent = 'Stop';
				doStartDraw();
			}
		});

	document.querySelector('[name="clear"]')
		.addEventListener('click', () => {
			runner.reset();
		});

	document.querySelector('[name="random_generate"]')
		.addEventListener('click', () => {
			const p = parseFloat(document.querySelector('[name="random_prob"]').value);
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

main();
// $(document).ready(main);

export default main;
