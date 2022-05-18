import { IEquipment } from '../models/IEquipment';

const goods: IEquipment[] = [
	{
		eid: 1,
		title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
		description: 'descr 1 1 1',
		image: 'image',
		price: 13.5,
		size: ['S', 'L', 'M'],
		category: 'boots',
	},
	{
		eid: 2,
		title: 'Куртка детская Poivre Blanc Red/stone W15-0902-BBBY/A',
		description: 'descr 1 1 1',
		image: 'image',
		price: 15,
		size: ['XXL'],
		category: 'overalls',
	},
	{
		eid: 3,
		title: 'Куртка мужская Descente Anton 30 D7-8625',
		description: 'descr 1 1 1',
		image: 'image',
		price: 6.32,
		size: ['M'],
		category: 'overalls',
	},
	{
		eid: 4,
		title: 'Ботинки мужские Olang Kiev 81 KV9',
		description: 'descr 1 1 1',
		image: 'image',
		price: 14,
		size: ['L'],
		category: 'boots',
	},
	{
		eid: 5,
		title: 'Sleds LC1412400',
		description: 'descr 1 1 1',
		image: 'image',
		price: 20.5,
		size: ['M'],
		category: 'sleds',
	},
	{
		eid: 6,
		title: 'Snowboard Ultimate Snow Rescue Black MS1002MR',
		description: 'descr 1 1 1',
		image: 'image',
		price: 34.5,
		size: [],
		category: 'snowboard',
	},
	{
		eid: 7,
		title: 'snowboard Spitfire Black/ blue 07743700 774',
		description: 'descr 1 1 1',
		image: 'image',
		price: 22.5,
		size: ['M'],
		category: 'snowboard',
	},
	{
		eid: 8,
		title: 'Перчатки Easy Camp Bohemian Day левый',
		description: 'descr 1 1 1',
		image: 'image',
		price: 18.5,
		size: ['XL'],
		category: 'gloves',
	},
	{
		eid: 9,
		title: 'Перчатки женские Descente 85 DWCMGD02',
		description: 'descr 1 1 1',
		image: 'image',
		price: 10,
		size: ['XL'],
		category: 'gloves',
	},
];

export const getMockEquipment = () => {
	return new Promise((res) => {
		setTimeout(() => res(goods), 100);
	});
};

export const getMockEquipmentByID = (id: number) => {
	return new Promise((res) => {
		setTimeout(() => res(goods.filter(goods => goods.eid === id)[0]), 100);
	});
};