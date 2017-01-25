import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const GroupForm = ({group, onSave, onChange, saving, errors}) => {
    return (
        <form>
            <h1>Manage group</h1>
            <TextInput
              name="title"
              label="Title"
              value={group.title}
              onChange={onChange}
              error={errors.title}/>
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary"
              onClick={onSave}/>
        </form>
    );
};

GroupForm.propTypes = {
    group: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default GroupForm;