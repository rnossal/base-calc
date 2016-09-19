var decToBin = (num) => {
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
var octToBin = (num) => {
	let numSplit = `<table><thead><tr><th colspan="2">Separa para dígidos decimais</th></tr><tr><th>Original</th><th>Lista de saída</th></tr></thead><tbody><tr><td>${num}<span class="base">8</span></td><td>`,
		binSplit = [],
		bin = '',
		tables = '';

	for (let i = 0, len = num.length; i < len; i++) {
		let decToBinRet = decToBin(num[i]);

		numSplit += `${num[i]}<span class="base">10</span> `;
		binSplit.push(decToBinRet.binary);
		tables += decToBinRet.table;
		bin += decToBinRet.binary;
	}

	numSplit += '</td></tr></tbody></table>';

	binSplit = `<table><thead><tr><th colspan="2">Junta resultados binários</th></tr></thead><tbody><tr><td>${binSplit.join(' + ')}</td><td>${bin}<span class="base">2</span></td></tr></tbody></table>`;

	return {number: num, binary: bin, tables: tables, octSplit: numSplit, binarySplit: binSplit};
};

exports.decToBin = decToBin;
exports.octToBin = octToBin;
