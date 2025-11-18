document.body.style.backgroundImage = 'url("./imágenes/fondo.jpg")';

let subtitulos = document.body.getElementsByClassName("subtitulo");

for(let sub of subtitulos){
	sub.style.textTransform = "uppercase"
}


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


// animacion casillas de cuadricula

let casillas = document.getElementsByClassName("nav-pagina");

window.addEventListener("scroll", () => {

	for(let casilla of casillas){
		//posicion en eje Y de la casilla relativa a la ventana
		let posyCasilla = casilla.getBoundingClientRect().top;
		if(scrollY > posyCasilla){
			casilla.classList.remove("estado-inicial");
		}
	}	
});