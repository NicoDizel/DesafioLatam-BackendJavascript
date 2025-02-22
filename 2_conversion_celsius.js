const prompt = require("prompt-sync")();

// Función similar a la de 1_operaciones.js, validando las condiciones si es número.
function ingresarTemperatura(mensaje) {
    let valor = parseFloat(prompt(mensaje));

    // Validamos si es un número
    while (isNaN(valor)) {
        console.log("Por favor ingrese una temperatura grados Celsius válida.");
        valor = parseFloat(prompt(mensaje));
    }

    return valor;
}

// Función para realizar la conversión a Kelvin y Farenheit
function conversionTemperatura(celsius){
    let kelvin = celsius + 273.15;
    let farenheit = (celsius * 9/5) + 32;
    
    console.log("Tú temperatura en grados celsius ingresada es:", celsius);
    console.log("Conversión a Kelvin:", kelvin, "K");
    console.log("Conversión a Farenheit:", farenheit, "°F");

}

// Pedimos los grados Celsius y realizamos la conversión
let celsius = ingresarTemperatura("Ingrese la temperatura en grados Celsius para convertir en Kelvin y Farenheit: ");
conversionTemperatura(celsius);