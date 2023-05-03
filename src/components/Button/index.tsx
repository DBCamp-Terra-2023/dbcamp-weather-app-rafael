import React from 'react'
import { FC } from 'react';
import styles from './button.module.css';

interface NewDocButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  id?: string;
}
const Button: FC<NewDocButtonProps> = ({value, id, ...props}) => {
    return (
      <button className={styles.button} id={id} {...props}>{value}</button>
    )
}

export default Button;
