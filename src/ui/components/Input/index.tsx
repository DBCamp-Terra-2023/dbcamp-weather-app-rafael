import React, {FC, useRef} from 'react'
import './input.css';

interface NewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  id?: string;
  label?: string;
  register?: any;
  required?: boolean;
  spanValue?: string;
  disableTab?: boolean;
}

const Input: FC<NewInputProps> = ({
                                    type,
                                    className,
                                    register,
                                    label,
                                    required,
                                    spanValue,
                                    id,
                                    disableTab = false,
                                    ...props
                                  }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="inputContainer">
      <div className="labelContainer">
        <label htmlFor={id}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
      </div>
      <div className="inputAndSpan">
        <input
          id={id}
          className={className}
          ref={inputRef}
          type={type}
          {...props}
          {...register}
          tabIndex={disableTab ? -1 : undefined}
        />
        <span className='spanForData'>{spanValue}</span>
      </div>
    </div>
  )
}

export default Input;