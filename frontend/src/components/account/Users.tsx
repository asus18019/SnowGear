import React, { useMemo } from 'react';
// @ts-ignore
import styles from './Users.module.css';
import { useSortBy, useTable, useGlobalFilter } from 'react-table';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../router/accountRouter';
import GlobalFilter from '../UI/GlobalFilter';

const Users = () => {
	const { users } = useMatch<LocationGenerics>().data;

	const data = useMemo(() => users?.length ? users : [], []);
	const columns = useMemo(() => ([
		{ Header: 'Id', accessor: 'id' },
		{ Header: 'Name', accessor: 'name' },
		{ Header: 'Surname', accessor: 'surname' },
		{ Header: 'Email', accessor: 'email' },
		{ Header: 'Age', accessor: 'age' },
		{ Header: 'Address', accessor: 'address' },
		{ Header: 'Phone', accessor: 'phone' }
	]), []);

	const tableHooks = (hooks: any) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: "action",
				Header: "Action",
				// @ts-ignore
				Cell: ({ row }) => (
					<p>
						{ row.values.id }
					</p>
				),
			},
		]);
	};

	const ordersData = useMemo(() => [...data], [data]);

	// @ts-ignore
	const tableInstance = useTable({ columns, data: ordersData }, tableHooks, useGlobalFilter, useSortBy);
	// @ts-ignore
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
	// @ts-ignore
	const { globalFilter } = state;

	return (
		<div className={ styles.users__wrapper }>
			<h2 className={ styles.component__title }>Users list</h2>
			<div className={ styles.line }></div>
			<GlobalFilter filter={ globalFilter } setFilter={ setGlobalFilter } />
			<table { ...getTableProps() } className={ styles.users_table }>
				<thead className={ styles.users_table__thead }>
					{ headerGroups.map((headerGroup) => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map((column) => (
								// @ts-ignore
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
								    className={ styles.users_table__th }
								>
									{ column.render('Header') }
									{
										// @ts-ignore
										column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''
									}
								</th>
							)) }
						</tr>
					)) }
				</thead>
				<tbody { ...getTableBodyProps() } className={ styles.users_table__tbody }>
					{
						rows.map(row => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.users_table__tr }>
								{
									row.cells.map(cell => (
										<td
											className={ styles.users_table__td }
											key={ cell.column.id }
											data-label={ cell.column.Header }
											{ ...cell.getCellProps }
										>
											{ cell.render('Cell') }
										</td>
									))
								}
							</tr>;
						})
					}
				</tbody>
			</table>
		</div>
	);
};

export default Users;