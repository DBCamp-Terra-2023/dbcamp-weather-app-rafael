import React, {useState} from 'react'
import Input from "../../ui/components/Input";
import Button from "../../ui/components/Button";
import styles from './register.module.css';
import Card, {cardSchema} from "../../ui/components/Card";
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form";
import axios from "axios";

const createRegisterFormSchema = z.object({
  city: z
    .array(z
      .object({
        idCity: z
          .coerce
          .number(),
        name: z
          .string()
          .min(2, 'O nome da cidade deve ter no mínimo 2 caracteres')
          .transform(name => {
            return name.trim().split(' ').map(word => {
              return word[0].toUpperCase().concat(word.substring(1).toLowerCase())
            }).join(' ')
          }),
      })),
  date: z
    .string(),
  dayTimeEnum: z
    .string()
    .nonempty("A previsão do dia é obrigatória")
    .refine(
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

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;

function Register() {
  const [output, setOutput] = useState('');

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  })

  const [formError, setFormError] = useState('');

  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await axios.post('http://localhost:4767/api/v1/weather/register', data);
      setFormError('');
      alert('Cadastro realizado com sucesso');
    } catch (error) {
      console.log('Erro ao cadastrar', error);
    }
  };


  return (

    <div className={styles.container}>
      <div className={styles.title}>
        Cadastro Meteorológico
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.register}
      >
        <div className={styles.cityDate}>
          <Input
            type={'text'}
            className={styles.city}
            label={'Cidade'}

            {...register('city.0.name')}
          />
          <Input
            type={'hidden'}
            value={1}
            {...register('city.0.idCity')}
          />
          <Input
            type={'date'}
            className={styles.date}
            label={'Data'}
            {...register('date')}
          />
          {errors.date && <span className={'text-red-500 text-xs'}>{errors.date.message}</span>}
        </div>
        <div className={styles.temperatureCard}>
          <div className={styles.cardContainer}>
            <div className={styles.shift}>
              <div className={styles.weather}>
                <label htmlFor={'select'} className={styles.labelCard}>Tempo</label>
                <select
                  defaultValue="selectDay"
                  {...register('dayTimeEnum')}
                >
                  <option value="selectDay" disabled>Selecionar Clima</option>
                  <option value="CHUVA">Chuva</option>
                  <option value="NEVE">Neve</option>
                  <option value="NUBLADO">Nublado</option>
                  <option value="SOL">Sol</option>
                  <option value="SOL_COM_NUVENS">Sol com nuvens</option>
                  <option value="TEMPESTADE">Tempestade</option>
                </select>

                <select
                  defaultValue="selectNight"
                  {...register('nightTimeEnum')}
                >
                  <option value="selectNight" disabled>Selecionar Clima</option>
                  <option value="CHUVA">Chuva</option>
                  <option value="LIMPA">Limpa</option>
                  <option value="NEVE">Neve</option>
                  <option value="NUBLADA">Nublada</option>
                  <option value="TEMPESTADE">Tempestade</option>
                </select>
              </div>
              <div className={styles.dayNight}>
                <Input
                  required={true}
                  className={styles.dayNightInput}
                  value={'Dia'} label={'Turno'}
                  readOnly={true}
                />
                <Input
                  required={true}
                  className={styles.dayNightInput}
                  value={'Noite'}
                  readOnly={true}
                />
              </div>
            </div>
            <div className={styles.weatherDataNumbers}>
              <div className={styles.temperatureData}>
                <Input required={true}
                       label={'Temperatura Máxima'}
                       type={'number'}
                       className={styles.numberFields}
                       {...register('maxTemperature')}
                />
                <Input
                  required={true}
                  label={'Temperatura Mínima'}
                  type={'number'}
                  className={styles.numberFields}
                  {...register('minTemperature')}
                />
              </div>

              <div className={styles.weatherData}>
                <Input
                  required={true}
                  label={'Precipitação'}
                  type={'number'}
                  className={styles.numberFields}
                  {...register('precipitation')}
                />
                <Input
                  required={true}
                  label={'Umidade'}
                  type={'number'}
                  className={styles.numberFields}
                  {...register('humidity')}
                />
                <Input
                  required={true}
                  label={'Velocidade do Vento'}
                  type={'number'}
                  className={styles.numberFields}
                  {...register('windSpeed')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button value={'Cancelar'} id={'cancel'}/>
          <Button value={'Salvar'} id={'save'} type={"submit"}/>
        </div>
      </form>

    </div>
  )
}

export default Register
