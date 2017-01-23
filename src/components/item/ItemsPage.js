import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemList from './ItemList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class ItemsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            saving: false
        };

        this.redirectToAddItemPage = this.redirectToAddItemPage.bind(this);
    }

    // onTitleChange(event) {
    //     const item = this.state.item;
    //     item.title = event.target.value;
    //     this.setState({item: item});
    // }
    // onTitleFocus(event) {
    //     const item = this.state.item;
    //     item.title = "";
    //     this.setState({item: item});
    // }
    // onClickSave() {
    //     this.props.actions.createItem(this.state.item);
    // }
    // itemRow(item, index) {
    //     return (
    //         <div key={index} className={`item status ${item.status}`}>
    //             <input className="form-check-input" type="checkbox" id="statusCheckbox" value="false" checked={item.status == 'done'}/>
    //             Title: {item.title}, Status: {item.status}
    //             <span className="glyphicon glyphicon-remove"></span>
    //         </div>
    //     );
    // }

    redirectToAddItemPage() {
        browserHistory.push('/item');
    }

    render() {
        const {items} = this.props;
        return  (
            <div>
              <h1>ToDo Items</h1>
              <input type="submit"
                     value="Add Item"
                     className="btn btn-primary"
                     onClick={this.redirectToAddItemPage}/>
              <ItemList items={items}/>
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