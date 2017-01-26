import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TextInput from '../common/TextInput';
import toastr from 'toastr';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import RegisterForm from './RegisterForm';

class RegistrationPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: Object.assign({}, this.props.user),
            errors: {},
            saving: false
        };

        this.updateUserState = this.updateUserState.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }
    updateUserState(event) {
        const field = event.target.name;

        let user = this.state.user;

        user[field] = event.target.value;
        return this.setState({user: user});
    }

    saveUser(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveUser(this.state.user)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving: false});
        });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Registered successfully');
        this.context.router.push('/login');
    }
    render() {
        return  (
            <RegisterForm
              onChange={this.updateUserState}
              onSave={this.saveUser}
              user={this.state.user} 
              errors={this.state.errors}
              saving={this.state.saving}
            />
        );
    }
}

RegistrationPage.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

RegistrationPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    let user = {firstName: '', lastName: '', email: '', password: ''};

    return {
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);