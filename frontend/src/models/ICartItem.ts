import { IEquipment } from './IEquipment';

export interface ICartItem {
	itemId: string,
	item?: IEquipment,
	size: string,
	duration: number,
	start: string,
	checkout: number
}