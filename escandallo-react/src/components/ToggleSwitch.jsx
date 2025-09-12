import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ isOn, handleToggle, offLabel = "Off", onLabel = "On" }) {
  return (
    <div className="toggle-container">
      <span className={!isOn ? 'label-active' : 'label-inactive'}>{offLabel}</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider" />
      </label>
      <span className={isOn ? 'label-active' : 'label-inactive'}>{onLabel}</span>
    </div>
  );
}

export default ToggleSwitch;
