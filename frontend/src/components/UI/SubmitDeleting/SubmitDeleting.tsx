import React, { FC } from 'react';
import styles from './SubmitDeleting.module.css';

interface SubmitDeletingProps {
	onSubmit: any,
	onCancel: any;
	deletingID: number | null
}

const SubmitDeleting: FC<SubmitDeletingProps> = ({ onSubmit, onCancel, deletingID }) => {
	return (
		<div className={ styles.submit_deleting__wrapper }>
			<button
				className={ `${ styles.submit_deleting__btn } ${ styles.submit_deleting__btn_submit }` }
				onClick={ () => {
					const handleRemove = onSubmit(deletingID);
					handleRemove();
				} }
			>
				Submit
			</button>

			<button
				className={ `${ styles.submit_deleting__btn } ${ styles.submit_deleting__btn_cancel }` }
				onClick={ () => onCancel(false) }
			>
				Cancel
			</button>
		</div>
	);
};

export default SubmitDeleting;