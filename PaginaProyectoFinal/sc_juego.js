document.body.style.backgroundImage = 'url("./imágenes/img2.jpg")';
document.body.style.backgroundBlendMode = 'overlay'; 
document.body.style.backgroundColor = "#332233cc";


// lógica del juego

class Juego{
	constructor(nodoHtml, piezas, huecos, nodoResultado, btnReiniciar){
		this.nodoHtml = nodoHtml;
		this.piezas = piezas;
		this.huecos = huecos;
		//cantidad de huecos llenos
		this.canthl = 0;
		this.piezaArrastrada = null;
		this.nodoResultado = nodoResultado;
		this.btnReiniciar = btnReiniciar;
	}

	cargarPiezas(){
		for(let pieza of this.piezas){
			pieza.cargar(this.nodoHtml);
		}
	}
	vaciarHuecos(){
		for(let hueco of this.huecos){
			hueco.vaciar();
		}
	}
	reiniciar(){
		this.cargarPiezas();
		this.vaciarHuecos();
		this.canthl = 0;
	}

	comprobarResultado(){
		if (this.juegoGanado()) { this.nodoResultado.innerHTML = "Felicitaciones!! Puzzle resuelto correctamente."; }
		else { this.nodoResultado.innerHTML = "Lo sentimos, Puzzle no resuelto. Prueba otra vez."; }
	}

	juegoGanado(){
		// las imagenes deben estar en el mismo orden en los huecos y en las piezas
		let gano = true;
		for(let i = 0; i < this.huecos.length; i++){
			gano = gano && (this.huecos[i].img().src == this.piezas[i].imagen.src)
		}
		return gano;
	}

	asignarArrastresPiezas(){
		for(let pieza of this.piezas){ pieza.asignarArrastre(() => { this.piezaArrastrada = pieza }); }
	}

	asignarColocacionesHuecos(){
		for(let hueco of this.huecos){
			hueco.asignarColocacion((e) => {
				if(this.canthl == 0){ this.btnReiniciar.style.display = "block"; }
				this.canthl++;

				this.piezaArrastrada.colocarEnHu(hueco);
				
				if(this.canthl == this.huecos.length){
					this.comprobarResultado();
					this.nodoResultado.style.display = "block";
					/*acá iría la animacion del resultado*/ 
				}
			});
		}
	}
	asignarReinicio(){
			this.btnReiniciar.addEventListener("click", (e) => {
			e.preventDefault();
			this.reiniciar();
			this.btnReiniciar.style.display = "none";
			this.nodoResultado.style.display = "none";
		});
	}
}

class Pieza{
	constructor(srcImagen, estiloOrigen){
		this.imagen = document.createElement("img");
		this.imagen.src = srcImagen;
		this.estiloOrigen = estiloOrigen;
	}
	cargar(nodoJuego){
		nodoJuego.appendChild(this.imagen);
		this.imagen.style.cssText = this.estiloOrigen;
	}
	asignarArrastre(funcion){
		this.imagen.addEventListener("dragstart", funcion);
	}
	colocarEnHu(hueco){
		this.imagen.style.cssText = "";
		hueco.colocarleImg(this.imagen);
	}
}


class Hueco{
	constructor(div){
		this.div = div;
	}

	vaciar(){
		this.div.innerHTML = "Arrastre y suelte la imagen aquí";
	}
	asignarColocacion(funcion){
		this.div.addEventListener("dragover", (e) => { e.preventDefault() });
		this.div.addEventListener("drop", funcion);
	}

	img() { return this.div.querySelector("img"); }

	colocarleImg(nodoImagen){
		this.div.innerHTML = "";
		this.div.appendChild(nodoImagen);
	}
}


let rompecabeza = null;

let piezasRomca = [];
let huecosRomca = [];

piezasRomca.push(new Pieza("./imágenes/rompe1.png", "bottom: 0; transform: rotate(80deg);"));
piezasRomca.push(new Pieza("./imágenes/rompe2.png", "left: 50px; top: 30px; transform: rotate(-10deg);"));
piezasRomca.push(new Pieza("./imágenes/rompe3.png", "right: 60px; top: 250px; transform: rotate(10deg);"));

for(let huecoNodo of document.querySelectorAll("#zona-juego > .hueco ")){
	huecosRomca.push(new Hueco(huecoNodo));
}

rompecabeza = new Juego(document.querySelector("#zona-juego"), piezasRomca, huecosRomca, document.querySelector("#zona-juego > .resultado"), document.querySelector("#zona-juego + button"));
rompecabeza.cargarPiezas();
rompecabeza.asignarArrastresPiezas();
rompecabeza.asignarColocacionesHuecos();
rompecabeza.asignarReinicio();


/* 
- hacer las animaciones
*/


// animación de barra menu

let barraMenu = document.getElementById("barra-menu");
let imgMenLogo = document.querySelector("#barra-menu > a > img");
let aMeNavs = document.getElementsByClassName("a-menav");

window.addEventListener("load", () => { imgMenLogo.classList.remove("estado-inicial") });

window.addEventListener("scroll", () => {
	if(window.scrollY > (window.innerHeight * 0.2)){
		barraMenu.classList.add("bm-scroll");
		for(let a of aMeNavs){
			a.classList.remove("a-menav-normal");
			a.classList.add("a-menav-scroll");
		}
	}
	else{
		barraMenu.classList.remove("bm-scroll");
		barraMenu.style.backgroundColor = ""
		for(let a of aMeNavs){
			a.classList.remove("a-menav-scroll");
			a.classList.add("a-menav-normal");
		}
	}
});
