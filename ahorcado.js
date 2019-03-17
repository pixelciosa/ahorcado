


var palabra, hombre, l, espacio;

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

//Array de palabras
palabras = [
	"sexy",
	"dead",
	"room",
	"asteroide",
	"universo",
	"conspirador",
	"electricidad",
	"hielo",
	"blade",
	"Luci",
	"panoramas",
	"blade",
	"venus",
	"azul",
	"final",
	"renacer",
	"magia",
	"temor",
	"temblor",
	"oropel",
	"vinyl",
	"corazon",
	"atomico",
	"nitro",
	"nunca",
	"paula",
	"human",
	"space",
	"volt",
	"paz",
	"sombras",
	"destruyas",
	"labios",
	"rotos",
	"infinito",
	"love",
	"luna",
	"nada",
	"nunca",
	"besame",
	"semana",
	"ciudades",
	"invisibles",
	"game",
	"over",
	"andromeda",
	"altamar",
	"resiste",
	"nendertal",
	"fantasma",
	"babilonia",
	"peace",
	"fotosintesis",
	"polar",
	"rocanlover",
	"whatever",
	"mars",
	"soñe",
	"morning",
	"watts",
	"random",
	"time",
	"haze",
	"girl",
	"tarantula",
	"veneno"
	]


var Ahorcado = function(con) {
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;
	this.dibujar();
}
Ahorcado.prototype.dibujar = function () {
	var dibujo = this.contexto; //para no estar llamando a this.contexto
	//Dibujando el fondo
	fondo.imagen = new Image();
	fondo.imagen.onload = function() {
		dibujo.drawImage(fondo.imagen, fondo.x,fondo.y);
	};
	fondo.imagen.src = fondo.location;


	if(this.intentos > 0) {
		//intentos = 1 --> rostro
		cabeza.imagen = new Image();
		cabeza.imagen.onload = function() {
			dibujo.drawImage(cabeza.imagen, cabeza.x,cabeza.y);
	};
		cabeza.imagen.src = cabeza.location;


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
		var perdio = document.getElementById('perder');
				if (perdio) {
					perdio.className = 'final'

					setTimeout(function(){iniciar();}, 5000);
				}

	}
	this.dibujar();
}

function iniciar () {
	l = document.getElementById("letra");
	l.focus();
	var b = document.getElementById("boton");
	var canvas = document.getElementById("c");
	canvas.width = 600;
	canvas.height = 600;
	var contexto = canvas.getContext("2d");
	hombre = new Ahorcado(contexto);
	palabra = palabras.randomElement();
	ga = document.getElementById("ganar");
	ga.className = "";
	pe = document.getElementById("perder");
	pe.className = "";

	//Convierte a mayúscula un texto
	palabra = palabra.toUpperCase();

	// Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabra.length);

	// Funcion que se dispara al hacer click en el botón
	b.addEventListener("click", agregarLetra);

	mostrarPista(espacio);

}
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}


function agregarLetra() {
	var letra = l.value;
	mostrarPalabra(palabra, hombre, letra);
	l.value = "";
	l.focus();
	hombre.ganar();

}
function mostrarPalabra(palabra , ahorcado, letra) {
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();
	for(p in palabra) {
		if(letra == palabra[p]) {
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarPista(espacio);

	//Si NO lo encontré
	if(!encontrado){
		ahorcado.trazar();
	}
	if(!ahorcado.vivo) {
		// Mostrar palabra entera al morir
		pista.innerText = palabra;
	}

}

function mostrarPista(espacio) {
	var pista = document.getElementById("pista");
	var texto = "";
	var i;
	var largo = espacio.length;

	for(i=0; i<largo; i++) {
		if(espacio[i] != undefined){
			texto += espacio[i] + " ";
		}
		else {
			texto += "_ ";
		}

	}
	pista.innerText = texto;
}
Ahorcado.prototype.ganar = function() {
	var adivinadas = 0;
	for(var u=0; u<espacio.length; u++) {
		if(espacio[u] != undefined) {
			adivinadas++;
			if (adivinadas == espacio.length) {
				var gano = document.getElementById('ganar');
				if (gano) {
					gano.className = 'final'
				}
				setTimeout(function(){iniciar();}, 5000);
			};
	 	}
	}
}















