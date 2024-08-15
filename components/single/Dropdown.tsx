import React, { ChangeEventHandler } from "react";

interface DropdownProps {
  name?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
