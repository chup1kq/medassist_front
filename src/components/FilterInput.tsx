import React from "react";
import "../static/FilterInput.scss";

interface FilterInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
                                                     value,
                                                     onChange,
                                                     placeholder = "Фильтр..."
                                                 }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="filter-input-container">
            <input
                type="text"
                className="filter-input"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FilterInput;