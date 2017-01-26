import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const GroupForm = ({group, onSave, onChange, onDeleteFromGroup, items, saving, errors, changed}) => {
    return (
      <div>
        <form className="change-group">
            <h1>Manage group</h1>
            <TextInput
              name="title"
              label="Title"
              value={group.title}
              onChange={onChange}
              error={errors.title}/> 
            {changed ?
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary"
              onClick={onSave}/>
            : null}
        </form>
        {group.id ? 
            <table className="items-table">
              <tbody>
              <tr>
                <th>Item's Title</th>
                <th>Group</th>
                <th>Actions</th>
              </tr>
              {items.map(item => 
                item.group.id && group.id === item.group.id ? 
                  <tr key={item.id}>
                      <td className="item-title">{item.title}</td>
                      <td className="group-title">{item.group.title}</td>
                      <td>
                          <div className="btn btn-success" key={item.id} onClick={onDeleteFromGroup.bind(this, item.id)}>
                          Delete from current group
                          </div>
                      </td>  
                  </tr>
                : null
              )}
              </tbody>
 
            </table>
           : ''}
      </div>
    );
};

GroupForm.propTypes = {
    group: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onDeleteFromGroup: React.PropTypes.func.isRequired,
    items: React.PropTypes.array,
    saving: React.PropTypes.bool,
    changed: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default GroupForm;