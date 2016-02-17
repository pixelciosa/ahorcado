var palabra = "Tamarindo";
var hombre;
var fondo = {
	x:0,
	y:0,
	location: "images/fondo.png"
};
var cabeza = {
	x:200,
	y:150,
	location: "images/cabeza.png"
};
var torso = {
	x:222,
	y:262,
	location: "images/tronco.png"
}
;
var brazos = {
	x:151,
	y:263,
	location: "images/brazos.png"
}
;
var piernas = {
	x:195,
	y:391,
	location: "images/piernas.png"
};
var muerto = {
	x:200,
	y:150,
	location: "images/cabeza-muerto.png"
};


var Ahorcado = function (con) {
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;
	this.dibujar();
}
Ahorcado.prototype.dibujar = function () {
	var dibujo = this.contexto; 
	
//Dibujando el fondo
	fondo.imagen = new Image();
	fondo.imagen.onload = function() {
		dibujo.drawImage(fondo.imagen, fondo.x,fondo.y);
	};
	fondo.imagen.src = fondo.location;

	alert("fondo creado");

	if(this.intentos > 0) {
		//intentos = 1 --> rostro
		cabeza.imagen = new Image();
		cabeza.imagen.onload = function() {
			dibujo.drawImage(cabeza.imagen, cabeza.x,cabeza.y);
	};
		cabeza.imagen.src = cabeza.location;

		alert("cabeza creado");

		if(this.intentos > 1) {
		// intentos = 2 --> torso
			torso.imagen = new Image();
			torso.imagen.onload = function() {
				dibujo.drawImage(torso.imagen, torso.x,torso.y);
		};
			torso.imagen.src = torso.location;

			if(this.intentos > 2) {
			// intentos = 3 --> brazos
				brazos.imagen = new Image();
				brazos.imagen.onload = function() {
					dibujo.drawImage(brazos.imagen, brazos.x,brazos.y);
	};
				brazos.imagen.src = brazos.location;



			if(this.intentos > 3) {
			// intentos = 4 --> piernas
				piernas.imagen = new Image();
				piernas.imagen.onload = function() {
					dibujo.drawImage(piernas.imagen, piernas.x,piernas.y);
			};
				piernas.imagen.src = piernas.location;



				if(this.intentos > 4) {
				// intentos = 5 --> ojos muertos
					muerto.imagen = new Image();
					muerto.imagen.onload = function() {
						dibujo.drawImage(muerto.imagen, muerto.x,muerto.y);
				};
					muerto.imagen.src = muerto.location;

		}


		}


		}

		}
	}
}
Ahorcado.prototype.trazar = function () {
	this.intentos++;
	if(this.intentos >= this.maximo) {
		this.vivo = false;
		alert("Estas muerto!");
	}
	this.dibujar();
}

function iniciar () {
	var canvas = document.getElementById("c");
	canvas.width = 600;
	canvas.height = 600;
	var contexto = canvas.getContext("2d");

	
	hombre = new Ahorcado(contexto);
	hombre.trazar();
	
}