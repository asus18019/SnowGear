import React, { FC } from 'react';
import styles from './OrdersTable.module.css';

interface OrdersTableProps {
	tableInstance: any
}

const OrdersTable: FC<OrdersTableProps> = ({ tableInstance }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	return (
		<table { ...getTableProps() } className={ styles.orders_table }>
			<thead className={ styles.orders_table__thead }>
				{ headerGroups.map((headerGroup: any) => (
					<tr { ...headerGroup.getHeaderGroupProps() }>
						{ headerGroup.headers.map((column: any) => (
							<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
							    className={ styles.orders_table__th }>
								{ column.render('Header') }
								{
									column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''
								}
							</th>
						)) }
					</tr>
				)) }
			</thead>
			<tbody { ...getTableBodyProps() } className={ styles.orders_table__tbody }>
				{
					rows.map((row: any) => {
						prepareRow(row);

						return <tr { ...row.getRowProps() } className={ styles.orders_table__tr }>
							{
								row.cells.map((cell: any) => (
									<td
										className={ styles.orders_table__td }
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
	);
};

export default OrdersTable;