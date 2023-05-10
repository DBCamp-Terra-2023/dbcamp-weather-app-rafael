import React from 'react'
import styles from './card.module.css';
import Input from "../Input";
import {z} from "zod";

export const cardSchema = z.object({
  dayTimeEnum: z.string().nonempty("A previsão do dia é obrigatória").refine(
    (value) => value !== "selectDay",
    "Selecione um valor válido"
  ),
  nightTimeEnum: z
    .string()
    .nonempty("A previsão da noite é obrigatória")
    .refine((value) => value !== "selectNight", "Selecione um valor válido"),
  maxTemperature: z
    .number()
    .max(48, "A temperatura máxima não pode ser maior que 48ºC"),
  minTemperature: z
    .number()
    .min(-20, "A temperatura mínima não pode ser menor que -20ºC"),
  precipitation: z
    .number()
    .max(100, "A precipitação não pode ser maior que 100%")
    .min(0, "A precipitação não pode ser menor que 0%"),
  humidity: z
    .number()
    .max(100, "A umidade não pode ser maior que 100%")
    .min(0, "A umidade não pode ser menor que 0%"),
  windSpeed: z.number(),
});

interface CardProps {
  onInputChange: (fieldName: string, value: any) => void;
}

function Card(props: CardProps) {
  const handleInputChange = (fieldName: string, value: any) => {
    props.onInputChange(fieldName, value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.shift}>
        <div className={styles.weather}>
          <label htmlFor={'select'} className={styles.labelCard}>Tempo</label>
          <select name="dayTimeEnum" defaultValue="selectDay">
            <option value="selectDay" disabled>Selecionar Clima</option>
            <option value="CHUVA">Chuva</option>
            <option value="NEVE">Neve</option>
            <option value="NUBLADO">Nublado</option>
            <option value="SOL">Sol</option>
            <option value="SOL_COM_NUVENS">Sol com nuvens</option>
            <option value="TEMPESTADE">Tempestade</option>
          </select>

          <select name="nightTimeEnum" defaultValue="selectNight">
            <option value="selectNight" disabled>Selecionar Clima</option>
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
          <Input required={true}
                 label={'Temperatura Máxima'}
                 type={'number'}
                 className={styles.numberFields}
                 onChange={(e) => handleInputChange('maxTemperature', e.target.value)}
          />
          <Input
            required={true}
            label={'Temperatura Mínima'}
            type={'number'}
            className={styles.numberFields}
            onChange={(e) => handleInputChange('minTemperature', e.target.value)}
          />
        </div>

        <div className={styles.weatherData}>
          <Input
            required={true}
            label={'Precipitação'}
            type={'number'}
            className={styles.numberFields}
            onChange={(e) => handleInputChange('precipitation', e.target.value)}
          />
          <Input
            required={true}
            label={'Umidade'}
            type={'number'}
            className={styles.numberFields}
            onChange={(e) => handleInputChange('humidity', e.target.value)}
          />
          <Input
            required={true}
            label={'Velocidade do Vento'}
            type={'number'}
            className={styles.numberFields}
            onChange={(e) => handleInputChange('windSpeed', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Card;
