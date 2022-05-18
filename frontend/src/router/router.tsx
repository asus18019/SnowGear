import React from 'react';
import { Route, ReactLocation, MakeGenerics } from 'react-location';
import { getMockEquipment, getMockEquipmentByID } from '../utils/dbMock';
import { IEquipment } from '../models/IEquipment';

export const routes: Route[] = [
	{
		path: '/',
		element: () => import('../pages/Main').then(mod => <mod.default />),
	},
	{
		path: '/shop',
		element: () => import('../pages/Shop').then(mod => <mod.default />),
		loader: async () => {
			return { goods: await getMockEquipment() };
		},
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
	},
	{
		path: '/registration',
		element: () => import('../pages/Registration').then(mod => <mod.default />),
	},
	{
		path: '/login',
		element: () => import('../pages/Login').then(mod => <mod.default />),
	},
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
		equipment: IEquipment
	};
}>;

export const location = new ReactLocation();