import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ItemForm = ({item, onSave, onChange, saving, errors}) => {
    return (
        <form>
            <h1>Manage item</h1>
            <TextInput
              name="title"
              label="Title"
              value={item.title}
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

ItemForm.propTypes = {
    item: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default ItemForm;