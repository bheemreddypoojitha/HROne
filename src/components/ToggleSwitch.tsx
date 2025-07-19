import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        checked={isOn}
        onChange={onToggle}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
          isOn ? "bg-green-400" : "bg-gray-400"
        }`}
      ></label>
    </div>
  );
};

export default ToggleSwitch;