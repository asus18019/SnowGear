import React from 'react';
import { Route, ReactLocation, MakeGenerics } from 'react-location';
import { getMockEquipment, getMockEquipmentByID } from '../utils/dbMock';
import { IEquipment } from '../models/IEquipment';
import { ICartItem } from '../models/ICartItem';
import fetchResource from '../api/apiWrapper';

export const routes: Route[] = [
	{
		path: '/',
		element: () => import('../pages/Main').then(mod => <mod.default />),
	},
	{
		path: '/shop',
		element: () => import('../pages/Shop').then(mod => <mod.default />),
		loader: async () => {
			let { all_equipment } = await fetchResource('equipment/equipment', {
				method: 'GET'
			}, false);
			const equipments = all_equipment.map((e: any) => {
				return { ...e, size: e.size.split(', ') };
			});
			return { goods: equipments };
			// return { goods: await getMockEquipment() };
		},
		pendingElement: async () => <div>Taking a long time...</div>,
		pendingMs: 500
	},
	{
		path: '/item',
		children: [
			{
				path: '/:eid',
				element: () => import('../pages/Item').then(mod => <mod.default />),
				loader: async ({ params: { eid } }) => {
					return { equipment: await getMockEquipmentByID(Number(eid)) };
				},
			},
		],
	},
	{
		path: '/contacts',
		element: () => import('../pages/Contacts').then(mod => <mod.default />),
	},
	{
		path: '/basket',
		element: () => import('../pages/Basket').then(mod => <mod.default />),
		loader: () => {
			return { cartGoods: JSON.parse(localStorage.getItem('cart') || '{}') };
		}
	},
	{
		path: '/registration',
		element: () => import('../pages/Registration').then(mod => <mod.default />),
	},
	{
		path: '/login',
		element: () => import('../pages/Login').then(mod => <mod.default />),
	},
	{
		path: 'account',
		element: () => import('../pages/Account').then(mod => <mod.default />)
	}
	// {
	// 	path: 'product',
	// 	children: [
	// 		{
	// 			path: ':id',
	// 			import: () =>
	// 				import('./components/pdpModule').then(module => module.default),
	// 		},
	// 	],
	// },
	// {
	// 	path: 'cart',
	// 	element: () =>
	// 		import('./components/CartContent').then(module => <module.default/>),
	// },
];

export type LocationGenerics = MakeGenerics<{
	LoaderData: {
		goods: IEquipment[],
		equipment: IEquipment,
		cartGoods: ICartItem[]
	};
}>;

export const location = new ReactLocation();