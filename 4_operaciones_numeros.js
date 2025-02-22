const prompt = require("prompt-sync")();

// Función similar a la de 1_operaciones.js, validando las condiciones de cada número de la lista
function ingresarValores(cantidadNumeros = 5) {
    let numeros = [];

    for (i = 1; i < cantidadNumeros + 1; i++){

        let valor = parseFloat(prompt("Ingrese un número (valor " + i + "): "));

        // Validamos si es un número
        while (isNaN(valor)) {
            console.log("Por favor ingrese un número valido.");
            valor = parseFloat(prompt("Ingrese un número (valor " + i + "): "));
        }

        numeros.push(valor);
    }

    return numeros;
}

function sumaPromedio(numeros){
    // Calcular la suma y el promedio
    let suma = numeros.reduce((acumulado, valor) => acumulado + valor, 0);
    let promedio = parseFloat((suma / numeros.length).toFixed(2));
    
    // Imprimir los resultados
    console.log("La suma de los números es:", suma);
    console.log("El promedio de los números es:", promedio);
}

// Pedimos los números y calculamos la suma y el promedio.
let numeros = ingresarValores(5);
sumaPromedio(numeros)

