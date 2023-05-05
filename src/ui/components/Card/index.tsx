import React from 'react'
import styles from './card.module.css';
import Input from "../Input";

function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.shift}>
        <div className={styles.weather}>
          <label htmlFor={'select'} className={styles.labelCard}>Tempo</label>
          <select>
            <option value="" disabled selected>Selecionar Clima</option>
            <option value="CHUVA">Chuva</option>
            <option value="NEVE">Neve</option>
            <option value="NUBLADO">Nublado</option>
            <option value="SOL">Sol</option>
            <option value="SOL_COM_NUVENS">Sol com nuvens</option>
            <option value="TEMPESTADE">Tempestade</option>
          </select>

          <select>
            <option value="" disabled selected>Selecionar Clima</option>
            <option value="CHUVA">Chuva</option>
            <option value="NEVE">Neve</option>
            <option value="NUBLADO">Nublado</option>
            <option value="SOL">Sol</option>
            <option value="SOL_COM_NUVENS">Sol com nuvens</option>
            <option value="TEMPESTADE">Tempestade</option>
          </select>
        </div>
        <div className={styles.dayNight}>
          <Input required={true} className={styles.dayNightInput} value={'Dia'} label={'Turno'} readOnly={true}/>
          <Input required={true} className={styles.dayNightInput} value={'Noite'} readOnly={true}/>
        </div>
      </div>
      <div className={styles.weatherDataNumbers}>
        <div className={styles.temperatureData}>
          <Input required={true} label={'Temperatura Máxima'} type={'number'} className={styles.numberFields}/>
          <Input required={true} label={'Temperatura Mínima'} type={'number'} className={styles.numberFields}/>
        </div>

        <div className={styles.weatherData}>
          <Input required={true} label={'Precipitação'} type={'number'} className={styles.numberFields}/>
          <Input required={true} label={'Umidade'} type={'number'} className={styles.numberFields}/>
          <Input required={true} label={'Velocidade do Vento'} type={'number'} className={styles.numberFields}/>
        </div>
      </div>
    </div>
  )
}

export default Card;
