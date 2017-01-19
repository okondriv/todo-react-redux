import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';

class ItemsPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			item: { title: "" }
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	onTitleChange(event) {
		const item = this.state.item;
		item.title = event.target.value;
		this.setState({item: item});
	}

	onClickSave() {
		this.props.actions.createItem(this.state.item);
	}
	itemRow(item, index) {
		return <div key={index}>{item.title}</div>;
	}
    render() {
        return  (
            <div>
              <h1>ToDo Items</h1>
              {this.props.items.map(this.itemRow)}
              <h2>Add Item</h2>
              <input type="text"
                onChange={this.onTitleChange}
                value={this.state.item.title} />
              <input type="submit"
                onClick={this.onClickSave}
                value="Save" />
            </div>
        );
    }
}

ItemsssPage.propTypes = {
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