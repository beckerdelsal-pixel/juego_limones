function generarAleatorio(min,max){
    let random= Math.random();
    let numero = random * (max - min);
    let entero = Math.ceil(numero);
    entero = entero + min;
    return entero;
}