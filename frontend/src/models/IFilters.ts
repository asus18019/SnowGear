export interface IFilters {
	categoryFilter: ICategoryFilter,
	titleFilter: ITitleFilter,
	priceFilter: IPriceFilter,
	sizeFilter: ISizeFilter
}

export interface ICategoryFilter {
	skies: boolean,
	snowboard: boolean,
	sleds: boolean,
	boots: boolean,
	overalls: boolean,
	gloves: boolean,
	hats: boolean
}

export interface ITitleFilter {
	title: string
}

export interface IPriceFilter {
	min: number,
	max: number
}

export interface ISizeFilter {
	sizes: string[]
}