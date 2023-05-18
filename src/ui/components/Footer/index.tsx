import React from 'react'
import styles from './footer.module.css';
import dblogo from '../../../assets/dblogo.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>made with love </p>
      <a href="https://db.tec.br" target="_blank" rel="noopener noreferrer">
        <img src={dblogo} alt="Logo da empresa DB Server"/>
      </a>
    </footer>
  )
}

export default Footer;
