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

export const changeDuration = (id: string, duration: number): ICartItem[] => {
	const cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') || '{}');
	const elementToUpdated: ICartItem = cart.filter(item => item.itemId === id)[0];
	elementToUpdated.duration = duration;
	elementToUpdated.checkout = Number((elementToUpdated.duration * (elementToUpdated.item?.price || 1)).toFixed(2));
	let index: number = cart.indexOf(elementToUpdated);
	cart[index] = elementToUpdated;
	localStorage.removeItem('cart');
	addInCart(cart);
	return cart;
};

export const changeDateStart = (id: string, start: string): ICartItem[] => {
	const cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') || '{}');
	const elementToUpdated: ICartItem = cart.filter(item => item.itemId === id)[0];
	elementToUpdated.start = start;
	let index: number = cart.indexOf(elementToUpdated);
	cart[index] = elementToUpdated;
	localStorage.removeItem('cart');
	addInCart(cart);
	return cart;
};