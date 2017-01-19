import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ItemListRow = ({item}) => {
	return (
		<div key={item.id} className={`item status ${item.status}`}>
			<input className="form-check-input" type="checkbox" id="statusCheckbox" defaultChecked={item.status == 'done'}/>
			<Link to={'/item/' + item.id}>{item.title}</Link>
			<span className="glyphicon glyphicon-remove"></span>
		</div>
	);
};

ItemListRow.propTypes = {
	item: PropTypes.object.isRequired
};

export default ItemListRow;