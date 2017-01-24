import React, {PropTypes} from 'react';

const Checkbox = ({name, label, onChange, checked, value, error}) => {
  return (
    <div className="form-group">
        <span className="label-block">{label}</span>
        <input
          name={name}
          type="checkbox"
          value={checked}
          onChange={onChange}
          checked={checked}>
        </input>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.bool,
  error: PropTypes.string
};

export default Checkbox;