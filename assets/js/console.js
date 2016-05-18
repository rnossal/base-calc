const out = document.querySelector('#output');

exports.enterCom = (str) => {
	bin(str);
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
var searchNested = (str, left, right) => {
	var	x = new RegExp('\\' + left + '|' + '\\' + right, 'g'),
	l = new RegExp('\\' + left),
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
// Procura por uma função definida (key) e onde qual caracter inicia (start) e termina (end)
var searchFunc = (str, key, start, end) => {
	str = str.substring(str.indexOf(key) + key.length);
	return searchNested(str, start, end);
};
