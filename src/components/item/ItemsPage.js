import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemList from './ItemList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import SelectInput from '../common/SelectInput';
import getHandlers from '../../helpers/filterHelper';
import {groupsFormattedForDropdownHelper} from '../../helpers/formatGroupsHelper';

class ItemsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            filterValue: {},
            saving: false
        };

        this.filterStatusOptions = [{value: 'done', text: 'Done'}, {value: 'active', text: 'Active'}];
        
        this.redirectToAddItemPage = this.redirectToAddItemPage.bind(this);
        this.setFilterStatusState = this.setFilterStatusState.bind(this);
        this.setFilterGroupState = this.setFilterGroupState.bind(this);
    }

    redirectToAddItemPage() {
        browserHistory.push('/item');
    }

    redirectToCreateGroupPage() {
        browserHistory.push('/group');
    }

    setFilterStatusState(event) {
        let filterVal = this.state.filterValue;
        filterVal.status = event.target.value;
        this.setState({filterValue: filterVal});
    }

    setFilterGroupState(event) {
        let filterVal = this.state.filterValue;
        filterVal.group = event.target.value;
        this.setState({filterValue: filterVal});
    }

    filterData(items, dispatch) {
        let handlers = getHandlers();
        let properHandlers = handlers.filter(h => h.canHandle(this.state.filterValue));

        let filteredData = items.filter(item => properHandlers.every(h => h.isSuitable(item, this.state.filterValue)));
        
        return filteredData;
    }

    render() {
        const {items} = this.props;
        const filteredData = this.filterData(items);

        return  (
            <div>
                <h1>ToDo Items</h1>
                <input type="submit"
                     value="Add Item"
                     className="btn btn-primary add-button"
                     onClick={this.redirectToAddItemPage}/>
                <input type="submit"
                     value="Create group"
                     className="btn btn-primary"
                     onClick={this.redirectToCreateGroupPage}/>

                <SelectInput name="filterByGroup"
                    label=""
                    onChange={this.setFilterGroupState}
                    defaultOption="Select group"
                    value={this.state.filterValue.group}
                    error=""
                    options={this.props.groups} />
                <SelectInput name="filterByStatus"
                    label=""
                    onChange={this.setFilterStatusState}
                    defaultOption="Select status"
                    value={this.state.filterValue.status}
                    error=""
                    options={this.filterStatusOptions} />
                <ItemList items={filteredData}/>
            </div>
        );
    }
}

ItemsPage.propTypes = {
    items: PropTypes.array.isRequired,
    filterValue: PropTypes.object,
    actions: PropTypes.object.isRequired,
    groups: PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        items: state.items,
        groups: groupsFormattedForDropdownHelper(state.groups)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);