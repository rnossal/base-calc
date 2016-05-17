const com = require('./console.js');
const con = document.querySelector("#console");

con.addEventListener('keypress', evt => {
	if(evt.which == 13 || evt.keyCode == 13) {
		console.log(com);
		for (x in com) {
			// Correr o objeto
		}
		com.enterCom(con.value);
		con.value = "";
	}
});
