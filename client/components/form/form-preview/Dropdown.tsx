import React from 'react';

interface DropdownProps {
  question: any;
  onChange: (selectedOptionIndex: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ question, onChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionIndex = event.target.selectedIndex;
    onChange(selectedOptionIndex);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </label>
      <select onChange={handleSelectChange} className="w-full p-2 border rounded">
        {/* <option value="" selected>Select here</option> */}
        {question.options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;