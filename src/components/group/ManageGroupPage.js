import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../../actions/groupActions';
import * as itemActions from '../../actions/itemActions';
import GroupForm from './GroupForm';
import toastr from 'toastr';

class ManageGroupPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            group: Object.assign({}, this.props.group),
            errors: {},
            saving: false,
            changed: false
        };

        this.updateGroupState = this.updateGroupState.bind(this);
        this.deleteFromGroup = this.deleteFromGroup.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.group.id != nextProps.group.id) {
            this.setState({group: Object.assign({}, nextProps.group)});
        }
    }

    updateGroupState(event) {
        const field = event.target.name;
        let group = this.state.group;
        this.setState({changed: true});

        switch (field) {
            case "done":
                group[field] = !group[field];
                break;
            
            default:
                group[field] = event.target.value;
                break;
        }
        return this.setState({group: group});
    }

    deleteFromGroup(itemId) {
        let groupInfo = {id: '', title: ''};
        let items = this.state.group.items;
        let group = this.state.group;

        const existingItemIndex = items.findIndex(a => a == itemId);
        items.splice(existingItemIndex, 1);

        group['items'] = items;
        this.setState({group: group});

        const item = this.getItemById(this.props.items, itemId);
        item['group'] = groupInfo;

        // this.setState({saving: true});
        // itemActions.saveItem(item);
        // this.setState({saving: false});
    }

    getItemById(items, id) {
        const item = items.filter(item => item.id == id);
        if(item) return item[0];
        return null;
    }

    saveGroup(event) {
        event.preventDefault();
        this.setState({saving: true});

        this.props.actions.saveGroup(this.state.group)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving: false});
        });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Group saved');
        this.context.router.push('/items');
    }

    render() {
        return (
            <GroupForm
              onChange={this.updateGroupState}
              onDeleteFromGroup={this.deleteFromGroup}
              onSave={this.saveGroup}
              items={this.props.items}
              group={this.state.group} 
              errors={this.state.errors}
              saving={this.state.saving}
              changed={this.state.changed}
            />
        );
    }
}

function getGroupById(groups, id) {
    const group = groups.filter(group => group.id == id);
    if(group) return group[0];
    return null;
}

ManageGroupPage.propTypes = {
    group: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    items: PropTypes.array
};

ManageGroupPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const groupId = ownProps.params.id;
    let group = {id: '', title: '', items: [], userId: ''};
    if(groupId && state.groups.length > 0) {
        group = getGroupById(state.groups, groupId);
    }
    return {
        group: group,
        items: state.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(groupActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGroupPage);