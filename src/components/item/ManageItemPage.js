import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemForm from './ItemForm';
import toastr from 'toastr';

class ManageItemPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            item: Object.assign({}, this.props.item),
            errors: {},
            saving: false
        };

        this.updateItemState = this.updateItemState.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.item.id != nextProps.item.id) {
            this.setState({item: Object.assign({}, nextProps.item)});
        }
    }

    updateItemState(event) {
        const field = event.target.name;
        let item = this.state.item;
        item[field] = event.target.value;
        return this.setState({item: item});
    }

    saveItem(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveItem(this.state.item)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving: false});
        });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Item saved');
        this.context.router.push('/items');
    }

    render() {
        return (
            <ItemForm
              onChange={this.updateItemState}
              onSave={this.saveItem}
              item={this.state.item} 
              errors={this.state.errors}
              saving={this.state.saving}
            />
        );
    }
}

function getItemById(items, id) {
    const item = items.filter(item => item.id == id);
    if(item) return item[0];
    return null;
}

ManageItemPage.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManageItemPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const itemId = ownProps.params.id;
    let item = {id: '', title: '', userId: ''};
    if(itemId && state.items.length > 0) {
        item = getItemById(state.items, itemId);
    }
    return {
        item: item
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageItemPage);