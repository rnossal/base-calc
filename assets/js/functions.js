const out = document.querySelector('#output');

// Converte decimal para binário.
exports.bin = (num) => {
	var res = '',
		tempNum = Number(num);

	while (tempNum > 0) {
		out.innerHTML += 'O original é: ' + tempNum + '<br />';
		out.innerHTML += 'Eu divido por 2' + '<br />';
		out.innerHTML += 'A quantidade que eu tô tirando do original é ' + parseInt(tempNum / 2) * 2 + '<br />';
		out.innerHTML += 'O que sobra para dividir é ' + parseInt(tempNum / 2) + '<br />';
		out.innerHTML += 'Vai um ' + tempNum % 2 + ' no binário.' + '<br />';
		res = res.replace(/^/, tempNum % 2);
		tempNum = parseInt(tempNum / 2);
	}
	out.innerHTML += '----------<br />' + num + '<span class="base">10</span> = ' + res + '<span class="base">2</span><br />';
};
// Limpa o console.
exports.clear = () => {
		out.innerHTML = '';
};
// Exibe comandos disponíveis.
exports.help = () => {
	out.innerHTML += `\
Opções:

	help:   Exibe essa tela.
	nom:    Tela com a nomenclatura dos números em base.
	clear:  Limpa o console.
	cls:    O mesmo que clear.
	bin():  Converte decimal para binário colocando o número dentro dos parenteses da função
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
exports.sendMessage = (message) => {
	out.innerHTML += message;
};
