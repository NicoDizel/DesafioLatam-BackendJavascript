// Desafio 2: Objetos y Algoritmos de Javascript
// Alumno: Nicolás Chávez Garzón

// ##################### SE CREAN LOS ARRAYS PRODUCTOS, VENTAS Y CLIENTES ##############################

// Productos que la tienda online tiene en stock
let productos = [
    {
        "idProducto": "p1",
        "nombre": "Play Station 5",
        "precio": 500000,
        "categoria": "Consolas",
        "stock": 5
    },
    {
        "idProducto": "p2",
        "nombre": "Monitor LG 24 nVIDIA",
        "precio": 400000,
        "categoria": "Pantallas",
        "stock": 10
    },
    {
        "idProducto": "p3",
        "nombre": "MacBook Pro 2024",
        "precio": 1199000,
        "categoria": "Notebooks",
        "stock": 5
    },
    {
        "idProducto": "p4",
        "nombre": "IPhone Pro 16 Max 1TB Black",
        "precio": 1469000,
        "categoria": "Smartphones",
        "stock": 20
    },
    {
        "idProducto": "p5",
        "nombre": "Apple Magic Mouse 2024",
        "precio": 64990,
        "categoria": "Accesorios",
        "stock": 30
    },
    {
        "idProducto": "p6",
        "nombre": "Apple Magic Keyboard 2024",
        "precio": 114990,
        "categoria": "Accesorios",
        "stock": 30
    },
    {
        "idProducto": "p7",
        "nombre": "Xbox Series S",
        "precio": 329990,
        "categoria": "Consolas",
        "stock": 15
    },
    {
        "idProducto": "p8",
        "nombre": "Nintendo Switch V2",
        "precio": 349990,
        "categoria": "Consolas",
        "stock": 18
    },
    {
        "idProducto": "p9",
        "nombre": "Apple Watch Series 10 GPS",
        "precio": 469990,
        "categoria": "Smartwatchs",
        "stock": 13
    },
    {
        "idProducto": "p10",
        "nombre": "Mac Mini M1 8GB RAM 512GB SSD",
        "precio": 699990,
        "categoria": "Computadores",
        "stock": 33
    }
];

// Ventas historicas que ha realizado la tienda online
let ventas = [
    {
        "idVenta": "v1",
        "idProducto": "p1",
        "cantidadVendida": 1,
        "fechaVenta": "2024/03/01",
        "idCliente": "c1"
    },
    {
        "idVenta": "v2",
        "idProducto": "p5",
        "cantidadVendida": 3,
        "fechaVenta": "2024/03/02",
        "idCliente": "c2"
    },
    {
        "idVenta": "v3",
        "idProducto": "p4",
        "cantidadVendida": 2,
        "fechaVenta": "2024/03/04",
        "idCliente": "c1"
    },
    {
        "idVenta": "v4",
        "idProducto": "p10",
        "cantidadVendida": 4,
        "fechaVenta": "2024/03/08",
        "idCliente": "c3"
    },
    {
        "idVenta": "v5",
        "idProducto": "p5",
        "cantidadVendida": 5,
        "fechaVenta": "2024/03/12",
        "idCliente": "c4"
    },
    {
        "idVenta": "v6",
        "idProducto": "p8",
        "cantidadVendida": 1,
        "fechaVenta": "2024/03/14",
        "idCliente": "c5"
    },
    {
        "idVenta": "v7",
        "idProducto": "p9",
        "cantidadVendida": 3,
        "fechaVenta": "2024/03/18",
        "idCliente": "c6"
    },
    {
        "idVenta": "v8",
        "idProducto": "p2",
        "cantidadVendida": 1,
        "fechaVenta": "2024/03/21",
        "idCliente": "c1"
    },
    {
        "idVenta": "v9",
        "idProducto": "p1",
        "cantidadVendida": 2,
        "fechaVenta": "2024/03/22",
        "idCliente": "c7"
    },
    {
        "idVenta": "v10",
        "idProducto": "p3",
        "cantidadVendida": 2,
        "fechaVenta": "2024/03/25",
        "idCliente": "c8"
    },
    
];

// Clientes de la tienda online
let clientes = [
    {
        "idCliente": "c1",
        "nombre": "Ricargo Gutierrez",
        "email": "ricardogtrrez@gmail.com"
    },
    {
        "idCliente": "c2",
        "nombre": "Monica Gonzalez",
        "email": "mgonzalez@gmail.com"
    },
    {
        "idCliente": "c3",
        "nombre": "Alberto Cid",
        "email": "alberto103@gmail.com"
    },
    {
        "idCliente": "c4",
        "nombre": "Nicolas Boitiano",
        "email": "nb2024@gmail.com"
    },
    {
        "idCliente": "c5",
        "nombre": "Cecilia Bustamante",
        "email": "ceciliabustamante55@gmail.com"
    },
    {
        "idCliente": "c6",
        "nombre": "Eduardo Camario",
        "email": "educam_ario@gmail.com"
    },
    {
        "idCliente": "c7",
        "nombre": "Alberto Troncoso",
        "email": "albtronman@gmail.com"
    },
    {
        "idCliente": "c8",
        "nombre": "Catalina Bahn",
        "email": "catalinabahn11@gmail.com"
    },
    {
        "idCliente": "c9",
        "nombre": "Felipe Figo",
        "email": "ff33_figo@gmail.com"
    },
    {
        "idCliente": "c10",
        "nombre": "Daniel Plaza",
        "email": "dlaplaza259@gmail.com"
    },
    
];

// ##################### SE DECLARAN LAS FUNCIONES PARA GESTIONAR EL INVENTARIO Y VENTAS ##############################

// Función para agregar la cantidad vendida según las ventas a cada producto
function asignarCantidadVendida(productos, ventas){
    // Obtenemos un objeto que nos indica la cantidad vendida por producto
    const cantidadVendidaPorProducto = ventas.reduce((acc, venta) => {
        
        // Guardamos temporalmente el id y la cantidad del producto vendido
        const idProducto = venta.idProducto;
        const cantidadVendida = venta.cantidadVendida;
        
        // En caso que en el nuevo objeto no exista el id, lo inicializamos
        if (acc[idProducto] == null) {
            
            acc[idProducto] = 0;

        }
        
        // Sumamos la cantidad vendida al id del producto
        acc[idProducto] += cantidadVendida;

        return acc;
    }, {});

    // Le agregamos a cada a cada producto su respectiva cantidad vendida
    const productosCantidadVendida = productos.map(producto => {
        
        // Obtenemos la cantidad vendida del producto, en caso de no tener, colocamos 0.
        const cantidadVendidaProducto = cantidadVendidaPorProducto[producto.idProducto] || 0;
        
        // Añadimos la cantidad vendida a cada producto 
        return {...producto, cantidadVendidaProducto};
        
    });

    return productosCantidadVendida;

}

// Función para obtener un array con los primeros 3 productos más vendidos con sus objetos completos
function calcularProductosMasVendidos(productos, ventas){
    
    // Le agregamos a cada producto su respectiva cantidad vendida
    const productosCantidadVendida = asignarCantidadVendida(productos, ventas);

    // Por último, ordenamos de mayor a menor y nos quedamos con los primeros 3 más vendidos
    productosCantidadVendida.sort((a, b) => b.cantidadVendidaProducto - a.cantidadVendidaProducto);
    const productosMasVendidos = productosCantidadVendida.slice(0, 3);
    
    // Retornamos los primeros 3 más vendidos
    return productosMasVendidos;
}

// Función para obtener un objeto con los ingresos agrupados por categoria
function calcularIngresosPorCategoria(productos, ventas){

    // Le agregamos a cada producto su respectiva cantidad vendida
    const productosCantidadVendida = asignarCantidadVendida(productos, ventas);

    const ingresosPorCategoria = productosCantidadVendida.reduce((acc, producto) => {

        const categoriaProducto = producto.categoria;
        const cantidadVendidaProducto = producto.cantidadVendidaProducto;
        const precioProducto = producto.precio;
        const ingresoProducto = cantidadVendidaProducto * precioProducto;
        
        if (acc[categoriaProducto] == null) {
            
            acc[categoriaProducto] = 0;

        }

        acc[categoriaProducto] += ingresoProducto;

        return acc;
    }, {});

    return ingresosPorCategoria;
}

// Función para calcular los clientes VIP (compras totales mayores a 1.000.000)
function calcularClientesVip(productos, ventas, clientes) {

    // Se crea un objeto para obtener el precio de los productos
    const precios = {};

    productos.forEach(producto => {
        precios[producto.idProducto] = producto.precio;
    });

    const ventaProductoCliente = ventas.reduce((acc, venta) => {

        const idCliente = venta.idCliente;
        const idProducto = venta.idProducto;
        const cantidadVendida = venta.cantidadVendida;
        const precio = precios[idProducto];
        
        if (acc[idCliente] == null) {

            acc[idCliente] = {"productos": {}, "montoTotal": 0};
        }

        if (acc[idCliente]["productos"][idProducto] == null) {

            acc[idCliente]["productos"][idProducto] = {"cantidadVendida": 0, "monto": 0};
        }

        acc[idCliente]["productos"][idProducto].cantidadVendida += cantidadVendida;
        acc[idCliente]["productos"][idProducto].monto += cantidadVendida * precio;
        acc[idCliente].montoTotal += cantidadVendida * precio;

        return acc;
    }, {});

    // Le agregamos a cada a cada cliente sus productos comprados y el monto total
    const clientesMontoProducto = clientes.map(cliente => {
        
        const clienteVentas = ventaProductoCliente[cliente.idCliente];
        const productosCliente = clienteVentas ? clienteVentas.productos : {};
        const montoTotalCliente = clienteVentas ? clienteVentas.montoTotal : 0;
        
        // Añadimos la cantidad vendida a cada producto 
        return {...cliente, productosCliente, montoTotalCliente};
        
    });

    // Filtramos para obtener solo los clientes VIP con montos de compra mayores a 1.000.000
    const clientesVip = clientesMontoProducto.filter(cliente => cliente.montoTotalCliente > 1000000);
    
    // Ordenamos por monto total de mayor a menor
    clientesVip.sort((a, b) => b.montoTotalCliente - a.montoTotalCliente);

    return clientesVip;

}

// Función para generar un reporte de status de stock de cada producto
function generarReporteInventario(productos){

    // Iteramos con Map sobre los productos para añadir un nuevo objeto status dependiendo de su stock.
    const reporteInventario = productos.map(producto => {

        const stock = producto.stock;

        if (stock <= 10) {
            producto["status"] = "Low Stock";
        }
        else if (stock > 10 && stock < 20) {
            producto["status"] = "In Stock";
        }
        else if (stock >= 20){
            producto["status"] = "Enough Stock";
        }

        return producto;
    })
    // Ordenamos por stock de mayor a menor
    reporteInventario.sort((a, b) => b.stock - a.stock);

    return reporteInventario;
}

// ################### IMPRIMIMOS LOS RESULTADOS #####################################

// Llamamos a los primeros 3 productos más vendidos
const productosMasVendidos = calcularProductosMasVendidos(productos, ventas);
console.log("############## ENCONTRAR LOS 3 PRODUCTOS MÁS VENDIDOS ##############")
console.table(productosMasVendidos);

// Calculamos el Ingreso por Categoria
const ingresosPorCategoria = calcularIngresosPorCategoria(productos, ventas);
console.log("############## MOSTRAR LOS INGRESOS POR CATEGORIA ##############")
console.table(ingresosPorCategoria);

// Obtenemos los Clientes VIP con venta mayor a 1.000.000
const clientesVip = calcularClientesVip(productos, ventas, clientes);
console.log("############## MOSTRAR LOS CLIENTES VIP ##############")
console.table(clientesVip);

// Obtenemos los Clientes VIP con venta mayor a 1.000.000
const reporteInventario = generarReporteInventario(productos);
console.log("############## GENERAR REPORTE INVENTARIO ##############")
console.table(reporteInventario);