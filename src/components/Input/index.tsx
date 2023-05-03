import React, {FC} from 'react'
import './input.module.css';

interface NewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  label?: string;
}
const Input: FC<NewInputProps> =({type, className, label, ...props}) => {
    return (
        <div>
            <label htmlFor={className}>{label}</label>
            <input className={className} type={type} {...props}/>
        </div>
    )
}

export default Input;