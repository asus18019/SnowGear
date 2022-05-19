import { ICartItem } from '../models/ICartItem';

export const addInCart = (order: ICartItem | ICartItem[]) => {
	const cart = JSON.parse(localStorage.getItem('cart') || '{}');
	localStorage.setItem('cart', JSON.stringify(
		Array.isArray(order) ? order : cart[0] ? [...cart, order] : [order])
	);
};

export const removeFromCart = (id: string): ICartItem[] => {
	const cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') || '{}');
	const updatedCart: ICartItem[] = cart.filter(item => item.itemId !== id);
	localStorage.removeItem('cart');
	addInCart(updatedCart);
	return updatedCart;
};