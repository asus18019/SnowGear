import { ISizeObject } from '../models';
import { IEquipment } from '../models';

export const sizeParser = (equipment: IEquipment | undefined): ISizeObject[] | null => {
	if(equipment) {
		return equipment.size.map(size => {
			return { size, isSelected: false };
		});
	}

	return null;
};