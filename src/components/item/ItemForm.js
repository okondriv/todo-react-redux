import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import Checkbox from '../common/Checkbox';

const ItemForm = ({item, onSave, onChange, saving, errors, groups}) => {
    return (
        <form className="manage-item">
            <h1>Manage item</h1>
            <TextInput
              type="text"
              name="title"
              label="Title"
              value={item.title}
              onChange={onChange}
              error={errors.title}/>
            <SelectInput
              name="group"
              label=""
              onChange={onChange}
              defaultOption="Select group"
              value={item.group.id}
              error=""
              options={groups}/>
            <Checkbox
              name="done"
              label="Done"
              type="checkbox"
              value={item.done}
              onChange={onChange}
              checked={item.done}/>
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary"
              onClick={onSave}/>
        </form>
    );
};

ItemForm.propTypes = {
    item: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object,
    groups: React.PropTypes.array
};

export default ItemForm;