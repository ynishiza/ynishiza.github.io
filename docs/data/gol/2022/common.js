export const GOL_LIVE = 1;
export const GOL_DEAD = 0;
export const GOL_NEIGHBOR_INDICES = [
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1]
];

export function for2d(height, width, callback) {
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			callback(i, j);
		}
	}
}

export function matrixForEach(matrix, callback) {
	if (!matrix.length) return;
	for2d(matrix.length, matrix[0].length, (i, j) => {
		callback(matrix[i][j], i, j, matrix);
	});
}

export function downloadJSON(fileName, data) {
	const a = document.createElement('a');
	const blob = new Blob([JSON.stringify(data)], {
		type: 'application/json',
	});
	a.href = window.URL.createObjectURL(blob);
	a.download = fileName;
	a.click();
}
