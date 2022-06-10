import { Route, ReactLocation, MakeGenerics } from 'react-location';
import React from 'react';
import { IOrder } from '../models/IOrder';
import { getMockOrders, getMockUsers } from '../utils/dbMock';
import { IUser } from '../models/IUser';
import fetchResource from '../api/apiWrapper';
import { IEquipment } from '../models/IEquipment';

export const accountRoutes: Route[] = [
	{
		path: '/account/profile',
		element: () => import('../components/account/AccountData').then(mod => <mod.default/>),
	},
	{
		path: '/account/currentorders',
		element: () => import('../components/account/CurrentOrders').then(mod => <mod.default/>),
		loader: async () => {
			return { currentOrders: await getMockOrders() };
		}
	},
	{
		path: '/account/returnitem',
		element: () => import('../components/account/ReturnItem').then(mod => <mod.default/>),
	},
	{
		path: '/account/users',
		element: () => import('../components/account/Users').then(mod => <mod.default/>),
		loader: async () => {
			return { users: await getMockUsers() };
		}
	},
	{
		path: '/account/equipments',
		element: () => import('../components/account/Equipments').then(mod => <mod.default/>),
		loader: async () => {
			let { all_equipment }: {all_equipment: IEquipment[]} = await fetchResource('equipment/equipment', {
				method: 'GET'
			}, true);
			return { equipments: all_equipment };
		},
		pendingElement: async () => <div>Taking a long time...</div>,
		pendingMs: 500
	},
];

export type LocationGenerics = MakeGenerics<{
	LoaderData: {
		currentOrders: IOrder[],
		users: IUser[],
		equipments: IEquipment[]
	};
}>;

export const location1 = new ReactLocation();