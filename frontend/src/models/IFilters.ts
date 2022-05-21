export interface IFilters {
	categoryFilter: ICategoryFilter
	titleFilter: ITitleFilter
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