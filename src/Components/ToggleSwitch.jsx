import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

function ToggleSwitch({ initialChecked, onToggle }) {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (val) => {
    setChecked(val);
    onToggle(val); // Call the onToggle callback with the new value
  };

  return (
    
    <div className="app" style={{ textAlign: "center" }}>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}

export default ToggleSwitch;