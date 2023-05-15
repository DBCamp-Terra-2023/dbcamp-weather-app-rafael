import React, {FC, useRef} from 'react'
import './input.module.css';

interface NewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  label?: string;
  register: any;
  required?: boolean;
}

const Input: FC<NewInputProps> = ({type, className, register, label, required, ...props}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelText = required ? `${label}*` : label;

  return (
    <div>
      <label htmlFor={className}>
        {labelText}
      </label>
      <input
        className={className}
        ref={inputRef}
        type={type}
        {...props}
        {...register}
      />
    </div>
  )
}

export default Input;