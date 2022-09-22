/* eslint-disable */
/*
 * 2015 Yui Nishizawa
 */
var GOL_LIVE = 1,
	GOL_DEAD = 0,
	LOCALSTORAGE_KEY = "GOL",
	GOL_INTERVAL = 1000,
	GOL_NEIGHBOR_INDICES = [
		[-1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
		[1, 0],
		[1, -1],
		[0, -1],
		[-1, -1]
	];

function main() {
	var startDraw = function(interval) {
			if (isStarted()) stopDraw();
			timer = setInterval(function() {
				var gol = golStep(golUI.get());
				golUI.set(gol);
				updateInfo(gol);
			}, interval);
		},
		stopDraw = function() {
			clearInterval(timer);
			timer = null;
		},
		reset = function(gol) {
			epoc = 0;
			if (!gol) gol = golCreate(golUI.m, golUI.n);
			if (!gol.stat) gol.stat = golStat(gol);

			golUI.set(gol);
			updateInfo(gol);
			return gol;
		},
		isStarted = function() { return timer != null; },
		epoc = 0,
		updateInfo = function(gol) {
			var stat = gol.stat || golStat(gol);
			$('[name="info_epoc"]').text(epoc++);
			$('[name="info_live"]').text(stat.live);
			$('[name="info_dead"]').text(stat.total - stat.live);
			$('[name="info_percent"]').text(stat.live / stat.total);
			$('[name="info_newborn"]').text(stat.hasOwnProperty("newBorn") ? stat.newBorn : -1);
			$('[name="info_newdead"]').text(stat.hasOwnProperty("newDead") ? stat.newDead : -1);
			$('[name="info_survive"]').text(stat.hasOwnProperty("survive") ? stat.survive : -1);
			$('[name="info_neighborcount"]').text(stat.hasOwnProperty("neighborCount") ? stat.neighborCount / stat.live : -1);
		},
		timer = null;

	var m = 100,
		n = 100;
	var gol = golCreate(m, n),
		golUI = new GolUI(m, n);

	gol[10][5] = GOL_LIVE;
	gol[10][6] = GOL_LIVE;
	gol[10][7] = GOL_LIVE;
	golUI.set(gol);
	$(golUI.element).appendTo(document.body.querySelector("#main"));

	var updateIntervalBox = $('[name="update_interval"]')
		.change(function() {
			if (isStarted()) doStartDraw();
		});
	var doStartDraw = function() {
		var x = +updateIntervalBox.val();
		if (x > 0) startDraw(x);
		else alert("Invalid interval");
	};

	$('[name="save"]')
		.click(function(e) {
			var gol = golUI.get();
			localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(gol));
		});

	$('[name="load"]')
		.click(function(e) {
			try {
				var gol = localStorage.getItem(LOCALSTORAGE_KEY);
				gol = JSON.parse(gol);
				golUI.set(gol);
			} catch (err) {
				alert("Failed to load GOL:\n" + err.message);
			}
		});

	$('[name="start_stop"]')
		.click(function(e) {
			if (isStarted()) {
				$(this).text("Start");
				stopDraw();
			} else {
				$(this).text("Stop");
				doStartDraw();
			}
		});

	$('[name="clear"]')
		.click(function() {
			reset();
		});

	$('[name="random_generate"]')
		.click(function() {
			var p = +$('[name="random_prob"]').val();
			if (!(p >= 0 && p <= 1)) alert("Invalid probability");

			var gol = golCreate(golUI.m, golUI.n);
			matrixForEach(gol, function(v, i, j) {
				var x = Math.random();
				gol[i][j] = x < p ? GOL_LIVE : GOL_DEAD;
			});

			reset(gol);
		});

	doStartDraw();
}


var GolUI = (function() {
	var GOLUI_LIVE = "gol_live",
		GOLUI_DEAD = "gol_dead";

	var setDead = function(cell) {
			$(cell).addClass(GOLUI_DEAD).removeClass(GOLUI_LIVE);
		},
		setLive = function(cell) {
			$(cell).addClass(GOLUI_LIVE).removeClass(GOLUI_DEAD);
		},
		toggleState = function(cell) {
			if ($(cell).hasClass(GOLUI_DEAD)) setLive(cell);
			else setDead(cell);
		};

	var GolUI = function(m, n) {
		if (!m || !n) throw new Error("Invalid size");
		this.element = $("<div>")
			.addClass("gol_container")
			.get();
		this.m = m;
		this.n = n;
		this.cells = new Array(m);

		// Initialize
		var i, j;
		for (i = 0; i < m; i++) {
			this.cells[i] = new Array(n);

			var row = $("<div>")
				.addClass("gol_row")
				.appendTo(this.element);
			for (j = 0; j < n; j++) {

				this.cells[i][j] = $("<span>")
					//.text("_")
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

				row.append(this.cells[i][j]);
			}
		}
	};

	GolUI.prototype.set = function(gol) {
		matrixForEach(gol, function(v, i, j) {
			if (v === GOL_LIVE) setLive(this.cells[i][j]);
			else setDead(this.cells[i][j]);
		}, this);
	};
	GolUI.prototype.get = function() {
		var nextGol = golCreate(this.m, this.n);

		matrixForEach(this.cells, function(cell, i, j) {
			nextGol[i][j] = $(cell).hasClass(GOLUI_LIVE) ? GOL_LIVE : GOL_DEAD;
		}, this);

		return nextGol;
	};

	GolUI.prototype.destroy = function() {
		$(this.element).remove();
	};
	return GolUI;
}) ();

function drawGol(element, gol) {
	var elem = $(element);
	var width = gol.length,
		height = gol[0].length;

	var i, j;
	elem.empty();
	for (i = 0; i < height; i++) {
		var rowHtml = "";
		for (j = 0; j < width; j++) {
			rowHtml += "<span>" + (gol[i][j] === GOL_LIVE ? "1" : "0") + "</span>";
		}
		elem.append($("<div>").html(rowHtml));
	}
}

function golStat(gol) {
	var size = golSize(gol);

	var total = size.m * size.n,
		live = 0;

	matrixForEach(gol, function(v, i, j) {
		if (v === GOL_LIVE) live++;
	});

	return {
		live: live,
		total: total
	};
}

function golStep(gol) {
	var size = golSize(gol),
		nextGol = golCreate(size.m, size.n);

	var golPosInfo = function(i, j, gol) {
		var liveCount = 0,
			deadCount = 0;

		_.forEach(GOL_NEIGHBOR_INDICES, function(ind) {
			if (!gol[i + ind[0]]) return;
			switch(gol[i + ind[0]][j + ind[1]]) {
				case GOL_LIVE:
					liveCount++;
					break;
				case GOL_DEAD:
					deadCount++;
					break;
			}
		});

		return {
			isLive: gol[i][j] === GOL_LIVE,
			live: liveCount,
			dead: deadCount
		};
	};

	var newBorn = 0, newDead = 0, survive = 0, neighborCount = 0;
	matrixForEach(gol, function(v, i, j) {
		var info = golPosInfo(i, j, gol);

		if (info.isLive) {
			if (info.live === 2 || info.live === 3) {
				nextGol[i][j] = GOL_LIVE;
				survive++;
				neighborCount += info.live;
			} else {
				nextGol[i][j] = GOL_DEAD;
				newDead++;
			}
		} else {
			if (info.live === 3) {
				nextGol[i][j] = GOL_LIVE;
				newBorn++;
				neighborCount += info.live;
			} else {
				nextGol[i][j] = GOL_DEAD;
			}
		}
	});

	// Info
	var info = golStat(nextGol);
	info.newBorn = newBorn;
	info.newDead = newDead;
	info.survive = survive;
	info.neighborCount = neighborCount;
	nextGol.stat = info;

	return nextGol;
}

function golSize(gol) {
	return {
		m: gol.length,
		n: gol.length > 0 ? gol[0].length : 0
	};
}

function golCreate(m, n) {
	var gol = new Array(m);

	var i, j;
	for (i = 0; i < m; i++) {
		gol[i] = new Array(n);
		for (j = 0; j < n; j++) gol[i][j] = GOL_DEAD;
	}

	return gol;
}

function matrixForEach(matrix, callback, thisArg) {
	if (!matrix.length) return;

	var height = matrix.length,
		width = matrix[0].length;

	for (i = 0; i < height; i++) {
		for (j = 0; j < width; j++) {
			// From top, clockwise.
			callback.call(thisArg, matrix[i][j], i, j, matrix);
		}
	}
}

$(document).ready(main);
