import React from 'react'
import styles from './header.module.css';
import {Link} from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <Link className={styles.links} to={'/'}>Home</Link>
        </li>
        <li>
          <Link className={styles.links} to={'/register'}>Cadastrar</Link>
        </li>
        <li>
          <Link className={styles.links} to={'/listing'}>Listar</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header;
