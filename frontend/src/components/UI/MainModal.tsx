import React, { FC, ReactNode } from 'react';
// @ts-ignore
import styles from './MainModal.module.css';

interface MainModalProps {
	toggle: any,
	showOrdersRef: any,
	title: string
	userId?: number | null,
	children: ReactNode
}

const MainModal: FC<MainModalProps> = ({
	toggle,
	userId,
	showOrdersRef,
	children,
	title,
}) => {
	return (
		<div id="myModal" className={ styles.modal } ref={ showOrdersRef }>
			<div className={ styles.modal__content }>
				<div className={ styles.modal__header }>
					<span className={ styles.close } onClick={ () => toggle(false) }>&times;</span>
					<h2>{ title }</h2>
				</div>
				<div className={ styles.modal__body }>
					{ children }
				</div>
			</div>
		</div>
	);
};

export default MainModal;