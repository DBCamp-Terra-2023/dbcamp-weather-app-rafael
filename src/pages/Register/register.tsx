import React from 'react'
import Input from "../../ui/components/Input";
import Button from "../../ui/components/Button";
import styles from './register.module.css';
import Card from "../../ui/components/Card";

function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Cadastro Meteorológico
      </div>
      <form className={styles.register}>
        <div className={styles.cityDate}>
          <Input type={'text'} className={styles.city} label={'Cidade'} required={true}/>
          <Input type={'date'} className={styles.date} label={'Data'} required={true}/>
        </div>
        <div className={styles.temperatureCard}>
          <Card/>
        </div>

        <div className={styles.buttons}>
          <Button value={'Cancelar'} id={'cancel'}/>
          <Button value={'Salvar'} id={'save'}/>
        </div>
      </form>
    </div>
  )
}

export default Register
