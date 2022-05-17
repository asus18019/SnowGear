import React, { FC } from 'react';
// @ts-ignore
import styles from './ModalWindow.module.css';
import { ModalTypes } from '../../utils/modalTypes';

interface ModalWindowProps {
	type: ModalTypes,
	information: string[],
	closeHandler: () => void
}

const ModalWindow: FC<ModalWindowProps> = ({ type, information, closeHandler }) => {
	return (
		<div
			className={ `${ styles.modal } ${ type === ModalTypes.fail ? styles.fail : type === ModalTypes.inform ? styles.inform : type === ModalTypes.success ? styles.success : false }` }
			onClick={ closeHandler }
		>
			<ul>
				{
					information.map(item => {
						return <li className={ styles.modal__list_item } key={ item }>{ item }</li>;
					})
				}
			</ul>
		</div>
	);
};

export default ModalWindow;