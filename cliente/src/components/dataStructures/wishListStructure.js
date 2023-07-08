const getWishList = () => {
    const wishString = localStorage.getItem('lista');
    return JSON.parse(wishString) || [];
};

class Nodo {
    constructor(elemento) {
        this.elemento = elemento;
        this.siguiente = null;
    }
}

class wishListClass {
    constructor() {
        this.cabeza = null;
        const wishList = getWishList();
        wishList.forEach((item) => {
            this.agregarElemento(item);
        });
    }

    agregarElemento(elemento) {
        const itemID = elemento.itemID;

        // Verificar si el elemento ya ha sido agregado
        const elementoExistente = this.buscarElemento(itemID);
        if (elementoExistente) {
            return; // Elemento duplicado, salir del método
        }

        const nuevoNodo = new Nodo(elemento);

        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let nodoActual = this.cabeza;
            while (nodoActual.siguiente) {
                nodoActual = nodoActual.siguiente;
            }
            nodoActual.siguiente = nuevoNodo;
        }

        this.guardarLista();
    }

    buscarElemento(itemID) {
        let nodoActual = this.cabeza;
        while (nodoActual) {
            if (nodoActual.elemento.itemID === itemID) {
                return nodoActual.elemento;
            }
            nodoActual = nodoActual.siguiente;
        }
        return null;
    }

    eliminarElemento(itemID) {
        if (!this.cabeza) {
            return;
        }

        if (this.cabeza.elemento.itemID === itemID) {
            this.cabeza = this.cabeza.siguiente;
            this.guardarLista();
            return;
        }

        let nodoActual = this.cabeza;
        let nodoAnterior = null;

        while (nodoActual && nodoActual.elemento.itemID !== itemID) {
            nodoAnterior = nodoActual;
            nodoActual = nodoActual.siguiente;
        }

        if (nodoActual) {
            nodoAnterior.siguiente = nodoActual.siguiente;
            this.guardarLista();
        }
    }

    guardarLista() {
        const lista = this.obtenerLista();
        localStorage.setItem('lista', JSON.stringify(lista));
    }

    obtenerLista() {
        const lista = [];
        let nodoActual = this.cabeza;

        while (nodoActual) {
            lista.push(nodoActual.elemento);
            nodoActual = nodoActual.siguiente;
        }

        return lista;
    }
}

export default wishListClass;
