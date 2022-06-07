import React from 'react';

export const SpinnerComponent = () => {
	return (
		<div className={'d-flex justify-content-center'} >
			<div className={'spinner-border'} role={'status'} >
				<span className={'sr-only'} />
			</div>
		</div>
	);
};


