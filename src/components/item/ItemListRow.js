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
            item: Object.assign({}, this.props.item),
            errors: {},
            saving: false
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    changeStatus() {
        event.preventDefault();

        let item = this.state.item;
        item['done'] = !this.state.item['done'];
        this.setState({item: item});

        this.setState({saving: true});
        this.props.actions.saveItem(this.state.item)
        .then(() => {
            this.setState({saving: false});
            toastr.success('Item changed');
        })
        .catch(error => {
            this.setState({saving: false});
            toastr.error(error);
        });
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

    render() {
        const {item} = this.props;
        return (
            <div key={item.id} className={`item status col-md-12 done-${item.done}`}>
                <input className="form-check-input" type="checkbox" 
                 id="statusCheckbox" onChange={this.changeStatus} defaultChecked={item.done}/>
                <Link to={'/item/' + item.id} className="title-link col-md-7"><span>{item.title}</span></Link>
                <Link to={'/group/' + item.group.id} className="group-link col-md-4">
                    <div className="group-title">{item.group.title}</div>
                </Link>
                <div className="glyphicon glyphicon-remove" onClick={this.deleteItem}></div>
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
