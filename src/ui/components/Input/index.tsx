import React, {FC} from 'react'
import './input.module.css';

interface NewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  label?: string;
  register: any;
}

const Input: FC<NewInputProps> = ({type, className, register, label, ...props}) => {
  return (
    <div>
      <label htmlFor={className}>{label}</label>
      <input className={className} type={type} {...props} {...register}/>
    </div>
  )
}

export default Input;