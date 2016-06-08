// Constante do console.
const consol = document.querySelector("#console");
// Requerimentos para o Node.js
const fs = require('fs');
// Funções para processar os valores e passar na saída.
const f = require('./functions.js');

// Executa os comandos do console ou as funções.
var enterCom = (str) => {
	switch(str) {
		case 'clear':
		case 'cls':
			f.clear();
			break;
		case 'help':
			f.help();
			break;
		case 'nom':
			f.nom();
			break;
		case (str.match(/^bin/) || {}).input:
			str = searchNested(str, '(', ')');
			exec(str);
			break;
		case '':
			break;
		default:
			f.sendMessage('Comando não reconhecido.<br />');
	}
	window.scrollTo(0, document.body.scrollHeight);
};

// Tenta executar a função.
var exec = (str) => {
	if (str === null || str === '') {
		f.sendMessage('Parâmetro inválido na função.<br />');
	} else if (str.match(/^bin/) || str.match(/^oct/) || str.match(/^hex/) || str.match(/^dec/)) {
		alert('Funções internas ainda não foi implementado.', 'Calma ae!');
	} else if (!isNaN(str)) {
		f.bin(str);
	} else {
		f.sendMessage('Parâmetro inválido na função.<br />');
	}
};

// Navaga pelo histórico de comandos e escreve a linha selecionada.
// Primeiro parâmetro informar older ou newer. Qualquer outra coisa será ignorado.
// Informar segundo parâmetro quando quiser guardar uma nova linha no histórico.
var histCounter = 0;
var history = (hist, cmd = '') => {
	fs.stat('.calc_history', (err, stat) => {
		if(err === null) {
			if (cmd === '') {
				fs.readFile('.calc_history', 'utf-8', (err, data) => {
					data = data.split('\n').reverse();
					switch (hist) {
						case 'older':
							if (histCounter < data.length - 1) {
								histCounter++;
							}
							break;
						case 'newer':
							if (histCounter > 0) {
								histCounter--;
							}
							break;
					}
					consol.value = data[histCounter];
				});
			} else {
				histCounter = 0;
				fs.appendFileSync('.calc_history', cmd + '\n');
			}
		} else if(err.code == 'ENOENT') {
			fs.writeFile('.calc_history', '');
		}
	});
};

// Lê o apertar de mais de uma tecla e executas funções a partir de combinações definidas.
var isKeyDown = [];
keyUpDown = evt => {
	isKeyDown[evt.keyCode] = evt.type == 'keydown';

	if(isKeyDown[13]) { // Qualdo for apertado ENTER.
		enterCom(consol.value);
		history(null, consol.value);
		consol.value = "";
	}
	if(isKeyDown[17] && isKeyDown[76]) { // Quando for apertado CTRL + L.
		f.clear();
	}
	if(isKeyDown[38]) { // Quando for apertado a seta para cima.
		history('older');
	}
	if(isKeyDown[40]) { // Quando for apertado a seta para baixo.
		history('newer');
	}
};
// Adiciona os eventos de apertar de teclas.
document.addEventListener('keydown', keyUpDown);
document.addEventListener('keyup', keyUpDown);

// Sempre que o console sair de foco, foca de volta.
consol.addEventListener('focusout', evt => {
	consol.focus();
});
// Foca já ao instânciar.
consol.focus();

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
