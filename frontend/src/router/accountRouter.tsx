import { Route, ReactLocation, MakeGenerics } from 'react-location';
import React from 'react';
import flatpickr from 'flatpickr';
import { IOrder } from '../models/IOrder';
import { IUser } from '../models/IUser';
import fetchResource from '../api/apiWrapper';
import { IEquipment } from '../models/IEquipment';
import { useAppSelector } from '../hooks/redux';
import { setupStore } from '../store/store';

export const accountRoutes: Route[] = [
	{
		path: '/account/profile',
		element: () => import('../components/account/AccountData').then(mod => <mod.default/>),
	},
	{
		path: '/account/currentorders',
		element: () => import('../components/account/CurrentOrders').then(mod => <mod.default/>),
		loader: async () => {
			const state = setupStore().getState();
			const user = await fetchResource('user', {}, true);
			const res = await fetchResource('cart/userorders', {
				method: 'POST',
				body: JSON.stringify({ id: user[0].id })
			}, true);
			const orders: IOrder[] = res.map((elem: any) => {
				return {
					eid: elem.eid,
					title: elem.title,
					price: elem.price,
					size: elem.size,
					category: elem.category,
					duration: elem.duration,
					status: elem.status,
					datestart: flatpickr.formatDate(new Date(elem.date_start), 'F j, Y H:i'),
					dateend: flatpickr.formatDate(new Date(elem.date_end), 'F j, Y H:i'),
				};
			});
			return { currentOrders: orders };
		},
		pendingElement: async () => <div>Taking a long time...</div>,
		pendingMs: 500
	},
	{
		path: '/account/returnitem',
		element: () => import('../components/account/ReturnItem').then(mod => <mod.default/>),
	},
	{
		path: '/account/users',
		element: () => import('../components/account/Users').then(mod => <mod.default/>),
		loader: async () => {
			const response = await fetchResource('user/users', {
				method: 'GET'
			}, true);
			const users: IUser = response.length > 0 ? response : [];
			return { users };
		},
		pendingElement: async () => <div>Taking a long time...</div>,
		pendingMs: 500
	},
	{
		path: '/account/equipments',
		element: () => import('../components/account/Equipments').then(mod => <mod.default/>),
		loader: async () => {
			const { all_equipment } = await fetchResource('equipment/equipment', {
				method: 'GET'
			}, true);
			const equipments = all_equipment.map((e: any) => {
				return { ...e, size: e.size.split(', ') };
			});
			return { equipments };
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