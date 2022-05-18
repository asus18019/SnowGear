import { IEquipment } from './IEquipment';

export interface ICartItem {
	item?: IEquipment,
	size: string,
	duration: number,
	start: string,
	checkout: number
}