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
        if (value > 0 && value < 100) {
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
        this.total = 0
    }

    set total(value) {
        this.#total = value
    }

    set cantidad(value) {
        this.#cantidad = value
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

}


let producto1 = new Producto('cafe-americano', 'Café Americano', 12.00, 'Bebida caliente', 'Café negro tradicional', './images/Americano.png')
let producto2 = new Producto('cafe-latte', 'Café Latte', 18.00, 'Bebida caliente ', 'Café con leche espumada', './images/coffee-latte.jpg')
let producto3 = new Producto('frape-choco', 'Frappe de Chocolate', 25.00, 'Bebida fría', 'Bebida fría con chocolate y crema', './images/frapuccino_de_chocolate.jpg')
let producto4 = new Producto('smothi-fresa', 'Smoothie de Fresa', 22.00, 'Bebida  fría', 'Batido natural de fresa', './images/smoothie-fresa-zarzamora-2.jpg')
let producto5 = new Producto('muffin', 'Muffin de Vainilla', 15.00, 'Postre ', 'Pan dulce suave de vainilla', './images/moffin.jpg')
let producto6 = new Producto('chees', 'Cheesecake', 28.00, ' Postre', 'Pastel frío de queso', './images/cheesecake-1024x678.jpg')
let producto7 = new Producto('sandwich', 'Sandwich de Pollo', 30.00, 'Comida ', 'Sandwich con pollo y vegetales', './images/sandwich-de-pollo.jpg')
let producto8 = new Producto('bagel', 'Bagel con Queso', 20.00, 'Comida ', 'Bagel tostado con queso crema', './images/bagel-prodimg_1024x.webp')

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]

let listaProductos = document.querySelector('#lista-productos')
let carritoVacio = document.querySelector('#pedido-vacio-msg')
let visualPedido = document.querySelector('#contenedor-pedido')





let html = ''
let cantidadProductos = 0
let pedidos = []
let incluye = false

listaProductos.addEventListener('click', (event) => {

    if (event.target.id != '') {
        carritoVacio.classList.add('d-none')
        let buscar = productos.find(producto => producto.id == event.target.id)
        pedidos.forEach(producto => producto.nombreProducto == buscar.nombre ? incluye = true : incluye = false)

        console.log(incluye)

        if (!incluye) {
            let orden = new Carrito(buscar.nombre, buscar.precio, buscar.id)

            pedidos.push(orden)

            html = `<div class="order-item p-3 border-bottom d-flex justify-content-between align-items-center ">
                    <div>
                        <h6 class="fw-bold mb-0 text-dark">${buscar.nombre}</h6>
                          <small class="text-muted">Unitario: Q${buscar.precio}.00 | Subtotal: <span class="total-cantidad fw-medium text-dark">Q00.00</span></small>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="input-group input-group-sm quantity-control ">
                            <button class="btn btn-outline-secondary btn-decrementar ${buscar.id}" type="button">-</button>
                           <span class="px-2 fw-bold text-center align-self-center quantity-value">1</span>
                            <button class="btn btn-outline-secondary btn-incrementar ${buscar.id}"
                                  type="button">+</button>
                        </div>
                            <button class="btn btn-sm text-danger border-0 btn-eliminar-item ${buscar.id} " title="Eliminar">
                                        <i class="bi bi-x-circle-fill fs-5"></i>
                            </button>
                    </div>
                </div>`
            visualPedido.insertAdjacentHTML('afterbegin', html)
            html = ''

            // let btnIncrementar = document.querySelector('.btn-incrementar')
            // let btnDecrementar = document.querySelector('.btn-decrementar')

            // btnDecrementar.addEventListener('click', (event) => {
            //     if (event.target.classList.contains(buscar.id)) {
            //         console.log(`decrementar${buscar.id}`)
            //     }
            // })
            // btnIncrementar.addEventListener('click', (event) => {
            //     if (event.target.classList.contains(buscar.id)) {
            //         console.log(` incrementar${buscar.id}`)
            //     }
            // })

        } else {
            pedidos.forEach(producto => producto.nombreProducto == buscar.nombre ? producto.sumarCantidad() : producto)
        }
        console.log(pedidos)
    }
})



const dibujar = () => {
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
                         <i class="bi bi-plus-lg me-1"></i> Agregar al Pedido
                </button>
             </div>
        </div>
    </div>
    `
    })
    listaProductos.innerHTML = html
    html = ''
}

// aun falta terminar esta parte 

visualPedido.addEventListener('click', (event) => {

    console.log(event.target.classList)
    let clase = event.target.classList.value

    console.log(clase)

    pedidos.forEach(pedido => clase.includes(pedido.id) ? console.log('si lo incluye') : pedido)
})


dibujar()

