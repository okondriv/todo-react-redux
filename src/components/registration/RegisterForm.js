import React from 'react';
import TextInput from '../common/TextInput';

const RegisterForm = ({user, onSave, onChange, saving, errors}) => {
    return (
        <div>
            <h1>Registration</h1>
            <form className="register-form">
                <TextInput
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={user.firstName}
                  onChange={onChange}
                  error={errors.title}/>
                <TextInput
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={user.lastName}
                  onChange={onChange}
                  error={errors.title}/>
                <TextInput
                  type="email"
                  name="email"
                  label="Email"
                  value={user.email}
                  onChange={onChange}
                  error={errors.title}/>
                <TextInput
                  type="password"
                  name="password"
                  label="Password"
                  value={user.password}
                  onChange={onChange}
                  error={errors.title}/>
                <TextInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={user.confirmPassword}
                  onChange={onChange}
                  error={errors.title}/>
                <input
                  type="submit"
                  disabled={saving}
                  value={saving ? 'Saving...' : 'Save'}
                  className="btn btn-primary"
                  onClick={onSave}/>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    changed: React.PropTypes.bool
};

export default RegisterForm;