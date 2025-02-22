const prompt = require("prompt-sync")();

// Función para validar las condiciones: es númer, mayor a 0 y en caso de ser segundo valor, que sea distinto del primero.
function ingresarNumero(mensaje, primerValor = null) {
    let valor = parseFloat(prompt(mensaje));

    // Si primerValor no es null, valida además que el nuevo valor sea distinto del primero
    if (primerValor !== null) {
        while (isNaN(valor) || valor <= 0 || valor === primerValor) {
            console.log("Por favor ingrese un número válido mayor a 0 y distinto del primero.");
            valor = parseFloat(prompt(mensaje));
        }
    } else {
        // Si es el primer valor, solo valida que sea mayor a 0 y un número
        while (isNaN(valor) || valor <= 0) {
            console.log("Por favor ingrese un número válido mayor a 0.");
            valor = parseFloat(prompt(mensaje));
        }
    }

    return valor;
}

// Llamada a la función sin especificar explícitamente los nombres de parámetros
let valor_1 = ingresarNumero("Ingrese el primer valor de la operación (mayor a 0): ");
let valor_2 = ingresarNumero("Ingrese el segundo valor de la operación (diferente del primero y mayor a 0): ", valor_1);

// Imprimimos las operaciones

console.log("La suma de los valores es:", parseFloat((valor_1 + valor_2).toFixed(2)));
console.log("La resta de los valores es:", parseFloat((valor_1 - valor_2).toFixed(2)));
console.log("La división de los valores es:", parseFloat((valor_1 / valor_2).toFixed(2)));
console.log("La multiplicación de los valores es:", parseFloat((valor_1 * valor_2).toFixed(2)));
console.log("El módulo de los valores es:", parseFloat((valor_1 % valor_2).toFixed(2)));



