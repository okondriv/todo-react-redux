import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import toastr from 'toastr';
import {bindActionCreators} from 'redux';

class ItemListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            saving: false
        };
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        this.props.actions.deleteItem(this.props.item)
        .then(() => {
            this.setState({saving: false});
            toastr.success('Item deleted');
        })
        .catch(error => {
            toastr.error(error);
            this.setState({saving: false});
        });
    }
    redirect() {
        this.setState({saving: false});
        toastr.success('Item deleted');
        this.context.router.push('/items');
    }

    render() {
        const {item} = this.props;
        return (
            <div key={item.id} className={`item status ${item.status}`}>
                <input className="form-check-input" type="checkbox" id="statusCheckbox" defaultChecked={item.status == 'done'}/>
                <Link to={'/item/' + item.id}>{item.title}</Link>
                <span className="glyphicon glyphicon-remove" onClick={this.deleteItem}></span>
            </div>
        );
    }

}

ItemListRow.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
ItemListRow.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemListRow);

// export default ItemListRow;