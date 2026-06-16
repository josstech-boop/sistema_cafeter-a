class Producto {
    #id
    #nombre
    #precio
    #categoria
    #descripcion
    #imagen

    constructor(id, nombre, precio, categoria, descripcion, imagen) {
        this.#id = id
        this.#nombre = nombre
        this.#precio = precio
        this.#categoria = categoria
        this.#descripcion = descripcion
        this.#imagen = imagen
    }

    set precio(value) {
        if (value > 0 && value < 50) {
            this.#precio = value
        } else {
            throw Error('El precio del cantidad de producto no es válida')
        }
    }
    get id() {
        return this.#id
    }

    get nombre() {
        return this.#nombre
    }

    get precio() {
        return this.#precio
    }

    get categoria() {
        return this.#categoria
    }

    get descripcion() {
        return this.#descripcion
    }

    get imagen() {
        return this.#imagen
    }

}

class Carrito {
    #id
    #nombreProducto
    #precio
    #cantidad
    #total

    constructor(nombre, precio, id) {
        this.#id = id
        this.#nombreProducto = nombre
        this.#precio = precio
        this.cantidad = 1
        this.total = precio
    }

    set total(value) {
        this.#total = value
    }

    set cantidad(value) {
        this.#cantidad = value
        this.subtotal()

    }

    get nombreProducto() {
        return this.#nombreProducto
    }

    get precio() {
        return this.#precio
    }

    get cantidad() {
        return this.#cantidad
    }

    get total() {
        return this.#total
    }

    get id() {
        return this.#id
    }

    precioTotal(cantidad) {
        let calcular = this.#precio * cantidad
        this.#total = calcular
    }

    sumarCantidad() {
        this.cantidad++
    }

    restarCantidad() {
        if (this.#cantidad > 1) {
            this.cantidad--
        }
    }

    subtotal() {
        this.#total = this.#cantidad * this.#precio
    }
}
//Crear productos en objectos
let producto1 = new Producto('cafe-americano', 'Cafe Americano', 12.00, 'Bebida caliente', 'Café negro tradicional', './images/Americano.png')
let producto2 = new Producto('cafe-latte', 'Cafe Latte', 18.00, 'Bebida caliente', 'Café con leche espumada', './images/cafeee-lattle.jpg')
let producto3 = new Producto('frape-choco', 'Frappe de Chocolate', 25.00, 'Bebida fría', 'Bebida fría con chocolate y crema', './images/frapuccino_de_chocolate.jpg')
let producto4 = new Producto('smothi-fresa', 'Smoothie de Fresa', 22.00, 'Bebida fría', 'Batido natural de fresa', './images/smoothie-fresa-zarzamora-2.jpg')
let producto5 = new Producto('muffin', 'Muffin de Vainilla', 15.00, 'Postre', 'Pan dulce suave de vainilla', './images/moffin.jpg')
let producto6 = new Producto('chees', 'Cheesecake', 28.00, 'Postre', 'Pastel frío de queso', './images/cheesecake-1024x678.jpg')
let producto7 = new Producto('sandwich', 'Sandwich de Pollo', 30.00, 'Comida', 'Sandwich con pollo y vegetales', './images/sandwich-de-pollo.jpg')
let producto8 = new Producto('bagel', 'Bagel con Queso', 20.00, 'Comida', 'Bagel tostado con queso crema', './images/bagel-prodimg_1024x.webp')

//Agregarlos en un arreglo
let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]

//variables para realizar los eventos
let listaProductos = document.querySelector('#lista-productos')
let carritoVacio = document.querySelector('#pedido-vacio-msg')
let visualPedido = document.querySelector('#contenedor-pedido')
let eliminarPedidos = document.querySelector('#btn-vaciar-pedido')
let subtotalPedido = document.querySelector('#subtotal-pedido')
let impuestoPedido = document.querySelector('#impuesto-pedido')
let totalFinal = document.querySelector('#total-pedido')
let btnFinalizar = document.querySelector('#btn-finalizar')
let factura = document.querySelector('#seccion-resumen-final')
let visualResumen = document.querySelector('#resumen-productos-final')
let resumenTotalFinal = document.querySelector('#resumen-total-final')
//filtros
let contenedorFiltros = document.querySelector('#contenedor-filtros')
let botonFiltro = document.querySelectorAll('.btn-filter')
let busqueda = document.querySelector('.form-control')

//variables globales
let html = ''
let pedidos = []
let incluye = false
let subtotal = 0
let resumenTotal = 0

//Agregar en la lista de pedidos
listaProductos.addEventListener('click', (event) => {

    if (event.target.id != '') {
        carritoVacio.classList.add('d-none')
        let buscar = productos.find(producto => producto.id == event.target.id)
        pedidos.forEach(producto => producto.nombreProducto == buscar.nombre ? incluye = true : incluye = false)

        if (!incluye) {
            let orden = new Carrito(buscar.nombre, buscar.precio, buscar.id)
            pedidos.push(orden)
            dibujarPedidos()
        } else {
            pedidos.forEach(pedido => pedido.nombreProducto == buscar.nombre ? pedido.sumarCantidad() : pedido)
            dibujarPedidos()
        }
    }
})

//Dibujar la lista de pedidos y la seccion de pedido
const dibujarPedidos = () => {

    visualPedido.innerHTML = ''
    pedidos.forEach(pedido => {
        subtotal += pedido.total
        html += `<div class="order-item p-3 border-bottom d-flex justify-content-between align-items-center ">
                    <div>
                        <h6 class="fw-bold mb-0 text-dark">${pedido.nombreProducto}</h6>
                          <small class="text-muted">Unitario: Q${pedido.precio}.00 | Subtotal: <span class="total-cantidad fw-medium text-dark">Q${pedido.total}</span></small>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="input-group input-group-sm quantity-control ">
                            <button class="btn btn-outline-secondary btn-decrementar ${pedido.id}" type="button">-</button>
                           <span class="px-2 fw-bold text-center align-self-center quantity-value">${pedido.cantidad}</span>
                            <button class="btn btn-outline-secondary btn-incrementar ${pedido.id}"
                                  type="button">+</button>
                        </div>
                            <button class="btn text-white ${pedido.id}  btn-eliminar-item m-2" title="Eliminar"><i class="bi bi-x-lg ${pedido.id}">delete</i></button>
                    </div>
                </div>`
    })

    let calcularImpuesto = subtotal * 0.05
    let totalSinImpuesto = subtotal - calcularImpuesto
    subtotalPedido.textContent = `Q${totalSinImpuesto.toFixed(2)}`
    impuestoPedido.textContent = `Q${calcularImpuesto.toFixed(2)}`
    totalFinal.textContent = `Q${subtotal.toFixed(2)}`
    resumenTotal = subtotal
    subtotal = 0
    visualPedido.innerHTML = html
    html = ''
}

// arrow fuction donde le mandan un parametro donde dibuja los productos que se le pide
const dibujarProductos = (productos) => {
    productos.forEach(producto => {
        html += `
    <div class="col producto-item" data-categoria="Bebida caliente">
        <div class="card h-100 product-coffee-card shadow-sm">
            <span class="badge-category-float">${producto.categoria}</span>
            <img src="${producto.imagen}"
                    class="card-img-top product-image" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column p-4">             
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="card-title fw-bold m-0 product-name">${producto.nombre}</h5>
                        <span class="product-price fw-bold">Q${producto.precio}.00</span>
                    </div>     
               <p class="card-text text-muted small flex-grow-1">${producto.descripcion}</p>
                <button class="btn btn-accent-coffee w-100 mt-3 btn-agregar-pedido" id="${producto.id}">
                         <i class="bi bi-plus-lg me-1 "></i> Agregar al Pedido
                </button>
             </div>
        </div>
    </div>
    `
    })

    listaProductos.innerHTML = html
    html = ''
}

//arrow fuction donde se elimina el pedido  
const eliminarProducto = (id) => {
    pedidos = pedidos.filter(pedido => pedido.id != id)
    if (pedidos.length == 0) {
        carritoVacio.classList.remove('d-none')
    } else {
        dibujarPedidos()
    }
}

//arrow fuction para realizar la factura
const resumenFinal = () => {
    pedidos.forEach(pedido => {
        html += `
        <li>• ${pedido.nombreProducto} x ${pedido.cantidad} = Q ${pedido.total}.00</li>     `
    })
    eliminarTodo()
    visualResumen.innerHTML = html
    resumenTotalFinal.textContent = `Q${resumenTotal.toFixed(2)}`
    html = ''
}

//arrow fuction para restaurar todo desde 0
const eliminarTodo = () => {
    subtotalPedido.textContent = `Q00.00`
    impuestoPedido.textContent = `Q00.00`
    totalFinal.textContent = `Q00.00`
    carritoVacio.classList.remove('d-none')
    pedidos = []
}

//evento donde se suma las cantidad de cada pedido, restan o elimina el pedido 
visualPedido.addEventListener('click', (event) => {
    let clase = event.target.classList.value
    pedidos.forEach(pedido => {
        if (clase.includes(pedido.id)) {
            if (event.target.textContent == '+') {
                pedido.sumarCantidad()
            } else if (event.target.textContent == '-') {
                pedido.restarCantidad()
            } else if (clase.includes(`${pedido.id}`)) {
                eliminarProducto(pedido.id)
            }
        }
    })
    dibujarPedidos()
})

//Se muestra la factura en un determinado tiempo y se restaura todo
btnFinalizar.addEventListener('click', (event) => {
    if (pedidos.length > 0) {

        factura.classList.remove('d-none')
        setTimeout(() => {
            factura.classList.add('d-none')
        }, 10000)

        resumenFinal()
        dibujarPedidos()

    }
})
//evento donde se realizan filtros
contenedorFiltros.addEventListener('click', (event) => {
    botonFiltro.forEach(item => item.classList.remove('active'))
    if (event.target.dataset.categoria != 'todos') {
        event.target.classList.add('active')
        let temporal = productos.filter(producto => event.target.dataset.categoria.toLocaleLowerCase() == producto.categoria.toLocaleLowerCase())
        dibujarProductos(temporal)

    } else {
        event.target.classList.add('active')
        dibujarProductos(productos)
    }
})

//evento donde se elimina por completo todos los pedidos
eliminarPedidos.addEventListener('click', (event) => {
    eliminarTodo()
    dibujarPedidos()
})

busqueda.addEventListener('keyup', (event) => {

    let palabra = event.target.value
    console.log(palabra)
})

dibujarProductos(productos)
