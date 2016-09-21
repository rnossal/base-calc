// Constante do console.
const consol = document.querySelector("#console");
// Requerimentos para o Node.js
const fs = require('fs');
// Funções para processar os valores e passar na saída.
const f = require('./functions.js');

// Executa os comandos do console ou as funções.
let ans = 0;
let enterCom = (str) => {
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
		case 'history':
			f.history(fs);
			break;
		case 'ans':
			f.sendMessage(ans);
			break;
		case (str.match(/^bin/) || {}).input:
			str = searchNested(str, '(', ')');
			ans = exec(str, 'b');
			break;
		case (str.match(/^oct/) || {}).input:
			str = searchNested(str, '(', ')');
			ans = exec(str, 'o');
			break;
		case (str.match(/^hex/) || {}).input:
			str = searchNested(str, '(', ')');
			ans = exec(str, 'h');
			break;
		case (str.match(/^dec/) || {}).input:
			str = searchNested(str, '(', ')');
			ans = exec(str, 'd');
			break;
		case '':
			break;
		default:
			f.sendMessage('Comando não reconhecido.\n');
	}

	window.scrollTo(0, document.body.scrollHeight);

	return ans;
};

// Tenta executar a função.
let exec = (str, type) => {
	if (str === null || str === '') {
		f.sendMessage('Parâmetro inválido na função.\n');
	} else if (str.match(/^bin/) || str.match(/^oct/) || str.match(/^hex/) || str.match(/^dec/)) {
		alert('Funções internas ainda não foi implementado.', 'Calma ae!');
	} else if (!isNaN(str)) {
		switch(type) {
			case 'b':
				return f.bin(str);
			case 'o':
				f.sendMessage('Função ainda não implementada.\n');
				break;
			case 'h':
				f.sendMessage('Função ainda não implementada.\n');
				break;
			case 'd':
				f.sendMessage('Função ainda não implementada.\n');
				break;
		}
	} else {
		f.sendMessage('Parâmetro inválido na função.\n');
	}
	return 0;
};

// Navaga pelo histórico de comandos e escreve a linha selecionada.
// Primeiro parâmetro informar older ou newer. Qualquer outra coisa será ignorado.
// Informar segundo parâmetro quando quiser guardar uma nova linha no histórico.
let histCounter = 0;
let history = (hist, cmd = '') => {
	fs.stat('.calc_history', (err, stat) => {
		if(err == null) {
			if (cmd == '') {
				fs.readFile('.calc_history', 'utf-8', (err, data) => {
					data = data.split('\n').reverse();
					switch (hist) {
						case 'older':
							if (histCounter < data.length - 1)
								histCounter++;

							break;
						case 'newer':
							if (histCounter > 0)
								histCounter--;

							break;
					}
					consol.value = data[histCounter];
				});
			} else {
				histCounter = 0;
				fs.readFile('.calc_history', 'utf-8', (err, data) => {
					data = data.split('\n').reverse();
					if (data[1] != cmd)
						fs.appendFileSync('.calc_history', `${cmd}\n`);
				});
			}
		} else if(err.code == 'ENOENT') {
			if (cmd != null) {
				fs.writeFile('.calc_history', `${cmd}\n`);
			} else{
				fs.writeFile('.calc_history', '');
			}
		}
	});
};

// Lê o apertar de mais de uma tecla e executas funções a partir de combinações definidas.
let isKeyDown = [];
keyUpDown = evt => {
	isKeyDown[evt.keyCode] = evt.type == 'keydown';

	if(isKeyDown[13]) { // Qualdo for apertado ENTER.
		enterCom(consol.value.trim());
		history(null, consol.value.trim());
		consol.value = '';
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
let searchNested = (str, start, end) => {
	let	x = new RegExp('\\' + start + '|' + '\\' + end, 'g'),
		l = new RegExp('\\' + start),
		a = null,
		t,
		s,
		m;

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
