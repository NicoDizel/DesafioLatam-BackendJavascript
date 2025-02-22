const prompt = require("prompt-sync")();

// Función similar a la de 1_operaciones.js, validando las condiciones si es número.
function ingresarValor(mensaje) {
    let valor = parseFloat(prompt(mensaje));

    // Validamos si es un número
    while (isNaN(valor)) {
        console.log("Por favor ingrese una cantidad de días valida.");
        valor = parseFloat(prompt(mensaje));
    }

    return valor;
}

// Función para realizar la transformación a años, semanas y días
function conversionCalendario(dias){
    let anios = Math.floor(dias / 365);
    let semanas = Math.floor((dias % 365) / 7);
    let dias_restantes = (dias - anios * 365 - semanas * 7);
    
    console.log(dias + " dias equivalen a: " + anios + " años, " + semanas + " semanas y " + dias_restantes + " días.");

}

// Pedimos los días y los transformamos a años, semanas y días.
let dias = ingresarValor("Ingrese la cantidad de dias a transformar: ");
conversionCalendario(dias);

