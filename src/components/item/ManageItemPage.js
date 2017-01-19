import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemForm from './ItemForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            item: Object.assign({}, this.props.item),
            errors: {}
        };

        this.updateItemState = this.updateItemState.bind(this);
        this.saveItemState = this.saveItemState.bind(this);
    }


    updateItemState(event) {
        const field = event.target.name;
        let item = this.state.item;
        item[field] = event.target.value;
        return this.setState({item: item});
    }
    saveItemState(event) {
        // const field = event.target.name;
        // let item = this.state.item;
        // item[field] = event.target.value;
        // return this.setState({item: item});
    }

    render() {
        return (
            <ItemForm
              onChange={this.updateItemState}
              onSave={this.saveItemState}
              item={this.state.item} 
              errors={this.state.errors}/>
        );
    }
}

ManageCoursePage.propTypes = {
    item: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    let item = {id: '', title: '', userId: ''};
    return {
        item: item
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);