let decToBin = (num) => {
	let table = `<table><thead><tr><th colspan="3">Conversão para decimal</th></tr><tr><th>Operação</th><th>Resultado</th><th>Resto</th></tr></thead><tbody>`,
		bin = '';

		num = Number(num);

		while (num > 0) {
			table += `<tr><td>${num} / 2</td><td>${num / 2}</td><td>${num % 2}</td></tr>`;
			bin = bin.replace(/^/, num % 2);
			num = parseInt(num / 2);
		}

		table += `<tr><td>Alinha e inverte os restos:</td><td colspan="2">${bin.split('').reverse().join('')} => ${bin}</td></tr></tbody></table>`;

		return {number: num, binary: bin, table: table};
};
let octToBin = (num) => {
	let hasToPrintSplit = false,
		octSplit = '',
		binarySplit = [],
		bin = '',
		tables = '';

	for (let i = 0, len = num.length; i < len; i++) {
		let decToBinRet = decToBin(num[i]);

		if (len > 1)
			hasToPrintSplit = true;

		octSplit += `${num[i]}<span class="base">10</span> `;
		binarySplit.push(decToBinRet.binary);
		tables += decToBinRet.table;
		bin += decToBinRet.binary;
	}

	if (hasToPrintSplit) {
		octSplit = `<table><thead><tr><th colspan="2">Separa para dígidos decimais</th></tr><tr><th>Original</th><th>Lista de saída</th></tr></thead><tbody><tr><td>${num}<span class="base">8</span></td><td>${octSplit}</td></tr></tbody></table>\n`;
		binarySplit = `<table><thead><tr><th colspan="2">Junta resultados binários</th></tr></thead><tbody><tr><td>${binarySplit.join(' + ')}</td><td>${bin}<span class="base">2</span></td></tr></tbody></table>\n`;
	} else {
		octSplit = '';
		binarySplit = '';
	}

	return {number: num, binary: bin, tables: `${tables}\n`, octSplit: octSplit, binarySplit: binarySplit};
};
let hexToBin = (num) => {
	let hasToPrint = {
			hexSplit: false,
			hexSplitDec: false
		},
		hexSplit = '',
		hexSplitDec = '',
		binarySplit = [],
		bin = '',
		tables = '';

	for (let i = 0, len = num.length; i < len; i++) {
		let decToBinRet = decToBin(parseInt(num[i], 16));

		if (len > 1)
			hasToPrint.hexSplit = true;
		if (parseInt(num[i], 16) >= 10 && parseInt(num[i], 16) <= 15)
			hasToPrint.hexSplitDec = true;

		hexSplit += `${num[i]} `;
		hexSplitDec += `${parseInt(num[i], 16)} `;
		binarySplit.push(decToBinRet.binary);
		tables += decToBinRet.table;
		bin += decToBinRet.binary;
	}

	if (hasToPrint.hexSplitDec) {
		hexSplitDec = `<table><thead><tr><th colspan="2">Passa as letras para o aquivalente em decimal</th></tr><tr><th>Anterior</th><th>Saída</th></tr></thead><tbody><tr><td>${hexSplit}</td><td>${hexSplitDec}</td></tr></tbody></table>\n`;
	} else {
		hexSplitDec = '';
	}
	if (hasToPrint.hexSplit) {
		hexSplit = `<table><thead><tr><th colspan="2">Separa os dígitos</th></tr><tr><th>Original</th><th>Lista de saída</th></tr></thead><tbody><tr><td>${num}<span class="base">16</span></td><td>${hexSplit}</td></tr></tbody></table>\n`;
		binarySplit = `<table><thead><tr><th colspan="2">Junta os resultados binários</th></tr></thead><tbody><tr><td>${binarySplit.join(' + ')}</td><td>${bin}<span class="base">2</span></td></tr></tbody></table>\n`;
	} else {
		hexSplit = '';
		binarySplit = '';
	}



	return {number: num, binary: bin, tables: `${tables}\n`, hexSplit: hexSplit, hexSplitDec: hexSplitDec, binarySplit: binarySplit};
};

exports.decToBin = decToBin;
exports.octToBin = octToBin;
exports.hexToBin = hexToBin;
