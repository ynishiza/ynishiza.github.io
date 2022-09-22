const LOCALSTORAGE_KEY = "GOL";
const m = 100;
const n = 100;

import {
  GOL_LIVE,
  GOL_DEAD,
  matrixForEach,
	downloadJSON,
	readTextFile,
} from './common.js';
import * as golUtils from './gol.js';
import GolUI from './GolUI.js';
import GolRunner from './GolRunner.js';

function main() {

	const statUI = {
		epoc: document.querySelector('#info_epoc'),
		live: document.querySelector('#info_live'),
		dead: document.querySelector('#info_dead'),
		percent: document.querySelector('#info_percent'),
		newborn: document.querySelector('#info_newborn'),
		newdead: document.querySelector('#info_newdead'),
		survive: document.querySelector('#info_survive'),
		neighborCount: document.querySelector('#info_neighborcount'),
	};
	// step: initialize main GOL data
	const gol = golUtils.create(m, n);
	const golUI = new GolUI(m, n);
	const golRunner = new GolRunner(golUI, statUI);
	gol[10][5] = GOL_LIVE;
	gol[10][6] = GOL_LIVE;
	gol[10][7] = GOL_LIVE;
	golUI.set(gol);


	document.body.querySelector("#gol_main").append(golUI.element);

	// step: initialize controls
	const updateIntervalBox = document.querySelector('[name="update_interval"]');
	const startStop = document.querySelector('[name="start_stop"]');
	function _doStartDraw() {
		const x = parseInt(updateIntervalBox.value);
		if (!(x > 0)) {
			alert("Invalid interval");
		}
		golRunner.startDraw(x);
		_syncControls();
	}
	function _syncControls() {
		if (golRunner.isStarted()) {
			startStop.textContent = 'Stop';
		} else {
			startStop.textContent = 'Start';
		}
	}

	updateIntervalBox.addEventListener('change', () => {
			golRunner.stopDraw();
			_doStartDraw();
		});

	document.querySelector('[name="save"]')
		.addEventListener('click', e => {
			golRunner.stopDraw();
			_saveData(golRunner);
		});
	document.querySelector('[name="load"]')
		.addEventListener('click', e => {
			try {
				golRunner.stopDraw();
				_loadData(golRunner);
			} catch (err) {
				alert("Failed to load GOL:\n" + err.message);
			}
		});
	document.querySelector('[name="download"]')
		.addEventListener('click', () => {
			golRunner.stopDraw();
			downloadJSON('gol.json', golRunner.toJSON());
		});

	const uploadInput = document.querySelector('[name="upload_input"]')
	document.querySelector('[name="upload"]')
		.addEventListener('click', () => {
			uploadInput.click();
		});
	uploadInput
		.addEventListener('change', async e => {
			golRunner.stopDraw();
			const file = uploadInput.files[0];
			try {
				const content = await readTextFile(file);
				const data = JSON.parse(content);
				golRunner.fromJSON(data);
			} catch (e) {
				alert(`Failed to load data. ${e.stack}`);
			}
			uploadInput.value = '';
			_syncControls();
		});

	startStop.addEventListener('click', e => {
		if (golRunner.isStarted()) golRunner.stopDraw();
		else golRunner.startDraw();
		});

	document.querySelector('[name="clear"]')
		.addEventListener('click', () => {
			golRunner.reset();
		});
	document.querySelector('[name="random_generate"]')
		.addEventListener('click', () => {
			const p = parseFloat(document.querySelector('[name="random_prob"]').value);
			const gol = golUtils.create(golUI.m, golUI.n);
			golRunner.reset(golUtils.random(gol, p));
		});

	// setup: gol manual change
	golUI.element.addEventListener('click', function() {
		golRunner.stopDraw();
	});

	// setup:
	window.addEventListener('click', e => {
		_syncControls();
	});

	// setup: handle uncaught errors
	let errorNotified;
	window.addEventListener('error', e => {
		console.error(`error: ${e.error.stack || e.message}`, e);

		// case: only alert once.
		// Otherwise, may cause numerous error reports
		if (errorNotified)  return;

		alert('Error occurred. See dev console');
		errorNotified = true;
		golRunner.stopDraw();
	});

	// step:
	_doStartDraw();

}

function _saveData(golRunner) {
	const data = golRunner.toJSON();
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
	alert("Saved state to local storage");
	return data;
}
function _loadData(golRunner) {
	const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
	golRunner.fromJSON(data);
	setTimeout(() => {
		alert("Loaded state from local storage");
	});
	return data;
}

// set on window.main
globalThis.startGOL = main;
