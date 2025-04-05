import { CartType } from "@/types/types";

const cartkey = "cart"

const isInCart = (cart: CartType[], index: number) => {
    return cart.filter((item) => item.id === index);
}

// Guardar carrito
const saveCart = (cart: CartType[]) => {
    const stringify = JSON.stringify(cart);
    localStorage.setItem(cartkey, stringify);
}

// Obtener carrito
const getCart = () : CartType[] | null => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem(cartkey);
        const parsedCart = cart !== null ? JSON.parse(cart) : null;
        return parsedCart;
    }
    return null;
}

// Aumentar cantidad de un item en el carrito
const increaseQuantity = (cart: CartType[], id: number) => {
    const element : CartType[] = cart;

    element.map((item, index) => {
        if(item.id === id) {
            element[index] = {...cart[index], quantity: cart[index].quantity+1};
        }
    })

    return element;
}

// Disminuir cantidad de un item en el carrito
const decreaseQuantity = (cart: CartType[], id: number) => {
    const element : CartType[] = cart;

    element.map((item, index) => {
        if(item.id === id) {
            element[index] = {...cart[index], quantity: cart[index].quantity-1};
        }
    })

    return element;
}

// Obtener índice de un item en el carrito
const getIndexOfItem = (cart: CartType[], item_id: number) => {
    const index = cart.findIndex((element) => element.id === item_id);
    return index;
}

// Eliminar item del carrito
const getCartWithoutItem = (cart: CartType[], item_id: number) => {
    const newCart : CartType[] = [];
    cart.forEach((item) => {
        if(item.id !== item_id) {
            newCart.push(item);
        }
    });
    return newCart;
}

export { isInCart, saveCart, getCart, increaseQuantity, decreaseQuantity, getIndexOfItem, getCartWithoutItem }