import React from 'react';

type TextInputAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  placeholder?: string;
  theme?: 'primary' | 'secondary' | 'neutral';
  required?: boolean;
  error?: string;
  label?: string;
  rows?: number; // Number of rows for the textarea
};

const styleClasses = {
  primary: 'bg-white border-primary focus:ring-primary focus:border-primary hover:bg-gray-50',
  secondary: 'bg-white border-secondary focus:ring-secondary focus:border-secondary hover:bg-gray-50',
  neutral: 'bg-white border-gray-500 focus:ring-primary focus:border-primary hover:bg-gray-50',
};

const TextInputArea: React.FC<TextInputAreaProps> = ({
  value,
  onChange,
  placeholder,
  theme = 'neutral',
  id,
  required = false,
  error,
  label,
  rows = 4, // Default number of rows
}) => {
  return (
    <div className="">
      {label && <label htmlFor={id} className={`${error ? 'text-danger' : ''}`}>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${styleClasses[theme]}`}
        id={id}
        required={required}
      />
      {error && error.length > 0 && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default TextInputArea;