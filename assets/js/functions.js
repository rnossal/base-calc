const out = document.querySelector('#output');
const fHelp = require('./functionHelpers');

// Converte decimal para binário.
exports.bin = (num) => {
	let res = '',
		base;

	out.innerHTML += `> bin(${num})\n`;

	if (Number(num) == 0) {
		out.innerHTML += `0 em qualquer base é 0.\n`;
		return 0;
	} else if (num.match(/^0b/i) != null) {
		base = 2;
		out.innerHTML += `O número já é binário. Não é necessário fazer conversão.\n`;
		res = num.substring(2);
	} else if (num.match(/^0o/i) != null) {
		let octToBinRet = fHelp.octToBin(num.substring(2));

		base = 8;

		out.innerHTML += `${octToBinRet.octSplit}${octToBinRet.tables}${octToBinRet.binarySplit}`;

		res = octToBinRet.binary;
	} else if (num.match(/^0x/i) != null) {
		let hexToBinRet = fHelp.hexToBin(num.substring(2));

		base = 16;

		out.innerHTML += `${hexToBinRet.hexSplit}${hexToBinRet.hexSplitDec}${hexToBinRet.tables}${hexToBinRet.binarySplit}`;

		res = hexToBinRet.binary;
	} else {
		let decToBinRet = fHelp.decToBin(num);

		base = 10;

		out.innerHTML += decToBinRet.table;

		res = decToBinRet.binary;
	}

	out.innerHTML += `<table><thead><tr><th colspan="2">Resultado</th></tr><tr><th>Entrada</th><th>Saída</th></tr></thead><tbody><tr><td>${base === 10 ? num : num.substring(2)}<span class="base">${base}</span></td><td>${res}<span class="base">2</span></td></tr></tbody></table>`;

	return res;
};
// Limpa o console.
exports.clear = () => {
		out.innerHTML = '';
};
// Exibe comandos disponíveis.
exports.help = () => {
	out.innerHTML += `\
Opções:

	help:    Exibe essa tela.
	nom:     Tela com a nomenclatura dos números em base.
	history: Histórico de comandos.
	clear:   Limpa o console.
	cls:     O mesmo que clear.
	ans:     Resultado anterior.
	bin():   Converte decimal para binário colocando o número dentro dos parenteses da função
`;
};
// Exibe uma explicação prática da nomenclatura de números em bases diferentes de decimal.
exports.nom = () => {
	out.innerHTML += `\
A calculadora funciona como uma linguagem de programação e linguagens de programação podem representar específicamente números não decimais por um sufixo. Dentre os aceitos estão:

	xxx:    Somente números é aceito como decimal.
	0bxxx:  Sufixo 0b representa binário.
	0oxxx:  Sufixo 0o representa octal.
	0xxxx:  Sufixo 0x representa hexadecimal.
`;
};
exports.history = (fs) => {
	try {
		out.innerHTML += fs.readFileSync('.calc_history', 'utf-8');
	} catch(ex) {
		out.innerHTML += 'Erro ao localizar aquivo de histórico de comandos';
	}
};
exports.sendMessage = (message) => {
	out.innerHTML += `${message}\n`;
};
