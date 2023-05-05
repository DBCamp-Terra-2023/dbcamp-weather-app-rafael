import React from 'react'
import styles from './footer.module.css';
import dblogo from '../../../assets/dblogo.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>made with love </p><a href="https://db.tec.br"><img src={dblogo} alt="Logo da DB"/></a>
    </footer>
  )
}

export default Footer;
