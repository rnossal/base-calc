const f = require('./functions.js');
const out = document.querySelector('#output');

exports.enterCom = (str) => {
	switch(str) {
		case 'clear':
		case 'cls':
			clear();
			break;
		case 'help':
			help();
			break;
		case 'nom':
			nom();
			break;
		case (str.match(/^bin/) || {}).input:
			str = searchNested(str, '(', ')');
			exec(str);
			break;
		default:
			out.innerHTML += 'Comando não reconhecido.<br />';
	}
	window.scrollTo(0,document.body.scrollHeight);
};
// Converte decimal para binário.
var bin = (num) => {
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
// Exibe comandos disponíveis.
var help = () => {
	out.innerHTML = `\
Opções:

	help:   Exibe essa tela.
	nom:    Tela com a nomenclatura dos números em base.
	clear:  Limpa o console.
	cls:    O mesmo que clear.
	bin():  Converte decimal para binário colocando o número dentro dos parenteses da função
	`;
};
// Exibe uma explicação prática da nomenclatura de números em bases diferentes de decimal.
var nom = () => {
	out.innerHTML = `\
A calculadora funciona como uma linguagem de programação e linguagens de programação podem representar específicamente números não decimais por um sufixo. Dentre os aceitos estão:

	xxx:    Somente números é aceito como decimal.
	0bxxx:  Sufixo 0b representa binário.
	0oxxx:  Sufixo 0o representa octal.
	0xxxx:  Sufixo 0x representa hexadecimal.
	`;
};
// Limpa o console.
var clear = () => {
		out.innerHTML = '';
};
var exec = (str) => {
	if (str === null || str === '') {
		out.innerHTML += 'Parâmetros inválidos na função.<br />';
	} else if (str.match(/^bin/) || str.match(/^oct/) || str.match(/^hex/) || str.match(/^dec/)) {
		alert('Funções internas ainda não foi implementado.', 'Calma ae!');
	} else if (!isNaN(str)) {
		bin(str);
	} else {
		out.innerHTML += 'Parâmetros inválidos na função.<br />';
	}
};
// Devolve o que tem dentro da função desde a abertura até o fechamento final.
var searchNested = (str, start, end) => {
	var	x = new RegExp('\\' + start + '|' + '\\' + end, 'g'),
	l = new RegExp('\\' + start),
	a = null,
	t, s, m;

	do {
		t = 0;
		while (m = x.exec(str)) {
			if (l.test(m[0])) {
				if (!t++) s = x.lastIndex;
			} else if (t) {
				if (!--t) {
					if (a === null) a = str.slice(s, m.index);
				}
			}
		}
	} while (t && (x.lastIndex = s));

	return a;
};
// // Procura por uma função definida (key) e onde qual caracter inicia (start) e termina (end)
// var searchFunc = (str, key, start, end) => {
// 	str = str.substring(str.indexOf(key) + key.length);
// 	return searchNested(str, start, end);
// };
