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
