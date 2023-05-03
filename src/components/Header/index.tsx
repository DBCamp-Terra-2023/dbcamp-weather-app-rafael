import React from 'react'
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <a className={styles.links}href="">Home</a>
        </li>
        <li>
          <a className={styles.links}href="">Cadastrar</a>
        </li>
        <li>
          <a className={styles.links}href="">Listar</a>
        </li>
      </ul>
    </header >
  )
}

export default Header;
