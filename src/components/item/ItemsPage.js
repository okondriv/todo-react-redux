import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemList from './ItemList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import SelectInput from '../common/SelectInput';

class ItemsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            filterValue: "",
            saving: false
        };

        this.filterOptions = [{value: 'done', text: 'Done'}, {value: 'active', text: 'Active'}];

        this.redirectToAddItemPage = this.redirectToAddItemPage.bind(this);
        this.setFilterState = this.setFilterState.bind(this);
    }

    redirectToAddItemPage() {
        browserHistory.push('/item');
    }

    setFilterState(event) {
        this.setState({filterValue: event.target.value});
    }

    filterData(items) {
        let filteredData = items.filter((c) => {  
            switch (this.state.filterValue) {
                case "done":
                    if (c.done === true) return true;
                    break;
                case "active":
                    if (c.done === false) return true;
                    break;
                default:
                    return true;
            }
        });
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
                     className="btn btn-primary"
                     onClick={this.redirectToAddItemPage}/>
                <SelectInput name="filterBy"
                    label=""
                    onChange={this.setFilterState}
                    defaultOption="Select all"
                    value={this.state.filterValue}
                    error=""
                    options={this.filterOptions} />
              <ItemList items={filteredData}/>
            </div>
        );
    }
}

ItemsPage.propTypes = {
    items: PropTypes.array.isRequired,
    filterValue: PropTypes.string,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        items: state.items,
        filterValue: state.filterValue
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);