class Carrito {
    constructor(){
        this.listaCarrito = [];
    }

    agregarACarrito(articulo){
        this.listaCarrito.push(articulo);
        let carritoGuardado = [];
        if (!localStorage.getItem("carrito")){
            carritoGuardado.push({titulo: articulo.titulo, precio: articulo.precio});
            localStorage.setItem("carrito", JSON.stringify(carritoGuardado))
        } else {
            carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
            carritoGuardado.push({titulo: articulo.titulo, precio: articulo.precio});
            localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
        }
    }

    vaciarListaCarrito(){
        this.listaCarrito = [];
    }
}

class Articulo {
    constructor(titulo, precio) {
        this.titulo = titulo;
        this.precio = precio;
    }
}