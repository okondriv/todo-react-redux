import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemList from './ItemList';

class ItemsPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			item: { title: "",
					status: "active" }
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onTitleFocus = this.onTitleFocus.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	onTitleChange(event) {
		const item = this.state.item;
		item.title = event.target.value;
		this.setState({item: item});
	}
	onTitleFocus(event) {
		const item = this.state.item;
		item.title = "";
		this.setState({item: item});
	}
	onClickSave() {
		this.props.actions.createItem(this.state.item);
	}
	itemRow(item, index) {
		return (
			<div key={index} className={`item status ${item.status}`}>
				<input className="form-check-input" type="checkbox" id="statusCheckbox" value="false" checked={item.status == 'done'}/>
				Title: {item.title}, Status: {item.status}
				<span className="glyphicon glyphicon-remove"></span>
			</div>
		);
	}
    render() {
    	const {items} = this.props;
        return  (
            <div>
              <h1>ToDo Items</h1>
              <ItemList items={items}/>
              <h2>Add Item</h2>
              <input type="text"
                onChange={this.onTitleChange}
                onFocus={this.onTitleFocus}
                value={this.state.item.title}/>
              <input type="submit" className="btn btn-sm btn-success add-item-btn"
                onClick={this.onClickSave}
                value="Save" />
            </div>
        );
    }
}

ItemsPage.propTypes = {
	items: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		items: state.items
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(itemActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);