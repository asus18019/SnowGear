import React from 'react';
import { Route, ReactLocation, MakeGenerics } from 'react-location';

export const routes: Route[] = [
	{
		path: '/',
		element: () => import('../pages/Main').then(mod => <mod.default />),
	},
	{
		path: '/shop',
		element: () => import('../pages/Shop').then(mod => <mod.default />),
	},
	{
		path: '/item',
		element: () => import('../pages/Item').then(mod => <mod.default />),
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
	};
}>;

export const location = new ReactLocation();