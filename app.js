class Producto {

    #nombre
    #precio
    #categoria
    #descripcion
    #imagen

    constructor(nombre, precio, categoria, descripcion, imagen) {
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
    #nombreProducto
    #precio
    #cantidad
    #total

    constructor(nombre, precio, cantidad) {
        this.#nombreProducto = nombre
        this.#precio = precio
        this.#cantidad = cantidad
        this.total = 0
    }

    set total(value) {
        this.#total = value
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

    precioTotal(cantidad) {
        let calcular = this.#precio * cantidad
        this.#total = calcular
    }


}


let producto1 = new Producto('Café Americano', 12.00, 'Bebida caliente', 'Café negro tradicional', './images/Americano.png')
let producto2 = new Producto('Café Latte', 18.00, 'Bebida caliente ', 'Café con leche espumada', './images/coffee-latte.jpg')
let producto3 = new Producto('Frappe de Chocolate', 25.00, 'Bebida fría', 'Bebida fría con chocolate y crema', './images/frapuccino_de_chocolate.jpg')
let producto4 = new Producto('Smoothie de Fresa', 22.00, 'Bebida  fría', 'Batido natural de fresa', './images/smoothie-fresa-zarzamora-2.jpg')
let producto5 = new Producto('Muffin de Vainilla', 15.00, 'Postre ', 'Pan dulce suave de vainilla', './images/moffin.jpg')
let producto6 = new Producto('Cheesecake', 28.00, ' Postre', 'Pastel frío de queso', './images/cheesecake-1024x678.jpg')
let producto7 = new Producto('Sandwich de Pollo', 30.00, 'Comida ', 'Sandwich con pollo y vegetales', './images/sandwich-de-pollo.jpg')
let producto8 = new Producto('Bagel con Queso', 20.00, 'Comida ', 'Bagel tostado con queso crema', './images/bagel-prodimg_1024x.webp')



let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]

productos.forEach(producto => {
    console.log(producto.nombre)
})

// for (let i = 0; i < productos.length; i++) {


//     for (let n = 0; n < 5; n++) {

//     }

// }


// arreglo.push(new Producto(item))


// console.log(arreglo[1].nombre)
