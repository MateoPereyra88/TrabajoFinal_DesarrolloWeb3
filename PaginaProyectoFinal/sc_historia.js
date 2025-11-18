document.body.style.backgroundImage = 'url("./imágenes/historia-programacion.jpg")';
document.body.style.backgroundBlendMode = 'overlay'; 
document.body.style.backgroundColor = "#2f3645b3";


// lógica del video

let zonasVideo = document.getElementsByClassName("zona-video");

for(let zona of zonasVideo){
	let video = zona.querySelector("video");

	let btPlay = zona.querySelector(".boton-play");
	let btPausa = zona.querySelector(".boton-pausa");

	let txtDuracion = zona.querySelector(".detalle-tiempo");

	btPlay.addEventListener("click", (e) => {
		e.preventDefault();
		video.play();
	});
	btPausa.addEventListener("click", (e) => {
		e.preventDefault();
		video.pause();
	});

	video.addEventListener("loadedmetadata", () => {
		let intMinutos = parseInt(video.duration / 60);
		let intSegundos = parseInt(video.duration - intMinutos*60);
		txtDuracion.textContent = "Duración de video " + intMinutos.toString() + ":" + intSegundos.toString();
	});
	video.addEventListener("timeupdate", () => {
		let intMinutos = parseInt(video.currentTime / 60);
		let intSegundos = parseInt(video.currentTime - intMinutos*60);
		txtDuracion.textContent = intMinutos.toString() + ":" + intSegundos.toString();
	})
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

let casillas = document.querySelectorAll(".zona-historia > *");

window.addEventListener("scroll", () => {

	for(let casilla of casillas){
		//posicion en eje Y de la casilla relativa a la ventana
		let posyCasilla = casilla.getBoundingClientRect().top;
		if(scrollY > posyCasilla){
			casilla.classList.remove("estado-inicial");
		}
	}	
});