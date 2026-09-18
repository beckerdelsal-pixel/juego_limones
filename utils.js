function generarAleatorio(min,max){
    let random= Math.random();
    let numero = random * (max - min);
    let entero = Math.ceil(numero);
    entero = entero + min;
    return entero;
}

function mostrarEnSpan(idSpan, valor){
    let componente = document.getElementById(idSpan);
    componente.textContent = valor;
}