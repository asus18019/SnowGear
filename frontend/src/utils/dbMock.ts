import { IEquipment } from '../models/IEquipment';
import { IOrder } from '../models/IOrder';

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

export const orders: IOrder[] = [
	{
		eid: 9,
		title: 'Перчатки женские Descente 85 DWCMGD02',
		price: 10,
		size: 'XL',
		category: 'gloves',
		datestart: 'April 30, 2022 08:00',
		dateend: 'May 1, 2022 08:00',
		duration: 5,
		status: 'expired'
	},
	{
		eid: 1,
		title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
		price: 13.5,
		size: 'S',
		category: 'boots',
		datestart: 'April 30, 2022 08:00',
		dateend: 'May 1, 2022 08:00',
		duration: 3,
		status: 'current'
	},
	{
		eid: 1,
		title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
		price: 13.5,
		size: 'L',
		category: 'boots',
		datestart: 'April 2, 2022 08:00',
		dateend: 'May 5, 2022 08:00',
		duration: 45,
		status: 'expired'
	},
	{
		eid: 3,
		title: 'Sleds LC1412400',
		price: 20.5,
		size: 'M',
		category: 'sleds',
		datestart: 'April 30, 2022 08:00',
		dateend: 'May 1, 2022 08:00',
		duration: 9,
		status: 'expired'
	}
];

export const getMockOrders = () => {
	return new Promise((res) => {
		setTimeout(() => res(orders), 100);
	});
};

// export const expiredOrders: IOrder[] = [
// 	{
// 		eid: 9,
// 		title: 'Перчатки женские Descente 85 DWCMGD02',
// 		price: 10,
// 		size: 'XL',
// 		category: 'gloves',
// 		datestart: 'April 30, 2022 08:00',
// 		dateend: 'May 1, 2022 08:00',
// 		duration: 5,
// 		status: 'expired'
// 	},
// 	{
// 		eid: 1,
// 		title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
// 		price: 13.5,
// 		size: 'S',
// 		category: 'boots',
// 		datestart: 'April 30, 2022 08:00',
// 		dateend: 'May 1, 2022 08:00',
// 		duration: 3,
// 		status: 'current'
// 	},
// 	{
// 		eid: 1,
// 		title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
// 		price: 13.5,
// 		size: 'L',
// 		category: 'boots',
// 		datestart: 'April 2, 2022 08:00',
// 		dateend: 'May 5, 2022 08:00',
// 		duration: 45,
// 		status: 'expired'
// 	},
// 	{
// 		eid: 3,
// 		title: 'Sleds LC1412400',
// 		price: 20.5,
// 		size: 'M',
// 		category: 'sleds',
// 		datestart: 'April 30, 2022 08:00',
// 		dateend: 'May 1, 2022 08:00',
// 		duration: 9,
// 		status: 'expired'
// 	}
// ];