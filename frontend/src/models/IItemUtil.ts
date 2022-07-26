interface IisSelected {
	isSelected: boolean;
}

export interface ISizeObject extends IisSelected {
	size: string,
}

export interface IHoursObject extends IisSelected {
	duration: string,
}

export interface IOrderInfo {
	hours: number,
	size: string,
	startDatetime: Date,
	endDatetime: string
}