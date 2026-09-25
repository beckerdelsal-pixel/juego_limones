let canvas= document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20
const ALTURA_PERSONAJE =40;
const ANCHO_PERSONAJE = 20;

const ALTO_LIMON =10;
const ANCHO_LIMON = 10;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=5;

let puntaje = 0;
let vidas = 3;

let velocidadCaida = 200;
let intervalo;

function iniciar(){
    intervalo = setInterval(bajarLimon, velocidadCaida);//parametro 1 funcion, parametro 2 tiempo en milisegundos
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="#704214"
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="#44e21d"
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX = personajeX-10
    actualizarPantalla();
}

function moverDerecha(){
    personajeX = personajeX+10
    actualizarPantalla();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function dibujarLimon(){
    ctx.fillStyle="#a59d2c"
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarColision();
    detectarPiso();
}

function detectarColision(){
    if(limonX+ANCHO_LIMON > personajeX 
        && limonX < personajeX+ANCHO_PERSONAJE 
        && limonY+ALTO_LIMON > personajeY 
        && limonY < personajeY+ALTURA_PERSONAJE){
        //alert("Has atrapado el limon!!!!!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje);
        if(puntaje==3){
            velocidadCaida=150;
        }
        if(puntaje==6){
            velocidadCaida=100;
        }
        if(puntaje==10){
            alert("GANASTE EL JUEGO, AHORA VE A PREPARAR LA MICHELADA CON TODOS ESOS LIMONES!!!!!");
            clearInterval(intervalo);
        }
    }
}

function detectarPiso(){
    if(limonY+ALTO_LIMON > canvas.height-ALTURA_SUELO){
        //alert("Has perdido una vida!!!!!");
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);  
        if(vidas==0){
            alert("Lo siento, haz perdido el juego :c");
            clearInterval(intervalo);
        }
    }
}

function aparecerLimon(){
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 5;
    actualizarPantalla();
}

function reiniciarJuego(){
    puntaje=0;
    vidas=3;
    personajeX=canvas.width/2;
    personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
    mostrarEnSpan("txtPuntaje",puntaje);
    mostrarEnSpan("txtVidas",vidas);
    velocidadCaida=200;
    clearInterval(intervalo);
    iniciar();
    
}

function desaparecerPersonaje(){
    //desaparecer personajes con clearRect 
    //ejes x,y 
    //ancho y alto del personaje
    //truquito
    personajeX = -1000;
    personajeY= -1000;
    actualizarPantalla();
    ctx.clearRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTURA_PERSONAJE);
    actualizarPantalla();
    
}