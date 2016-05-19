(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const inter = require('./console.js');
const conso = document.querySelector("#console");

conso.addEventListener('keypress', evt => {
	if(evt.which == 13 || evt.keyCode == 13) {
		inter.enterCom(conso.value);
		conso.value = "";
	}
});
conso.addEventListener('focusout', evt => {
	conso.focus();
});
conso.focus();

},{"./console.js":2}],2:[function(require,module,exports){
const out = document.querySelector('#output');

exports.enterCom = (str) => {
	switch(str) {
		case 'clear':
			clear();
			break;
		case 'help':
			help();
			break;
		case (str.match(/^bin/) || {}).input:
			str = searchNested(str, '(', ')');
			if (!Number.isNaN(parseInt(str))) {
				bin(str);
			} else {
				out.innerHTML += 'Parâmetros inválidos na função.<br />';
			}
			break;
		default:
			out.innerHTML += 'Comando não reconhecido.<br />';
	}
	window.scrollTo(0,document.body.scrollHeight);
};
var help = () => {
	out.innerHTML = `
	Opções:<br />
	&emsp;clear: Limpa o console.<br />
	&emsp;help: Exibe essa tela.<br />
	&emsp;bin(): Converte decimal para binário colocando o número dentro dos parenteses da função<br />
	`;
};
// Limpa o console.
var clear = () => {
		out.innerHTML = '';
};
// Converte decimal para binário.
var bin = (num) => {
	var res = '',
		tempNum = parseInt(num);

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

},{}]},{},[1]);
