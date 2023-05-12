import React, {useState} from 'react'
import Input from "../../ui/components/Input";
import Button from "../../ui/components/Button";
import styles from './register.module.css';
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form";
import axios from "axios";
import {usePost} from "../../hooks/usePost";

const createRegisterFormSchema = z.object({
  city: z
    .object({
      idCity: z
        .coerce
        .number(),
      name: z
        .string()
        .nonempty('O nome da cidade é obrigatório')
        .min(2, 'O nome da cidade deve ter no mínimo 2 caracteres')
        .transform(name => {
          return name.trim().split(' ').map(word => {
            return word[0].toUpperCase().concat(word.substring(1).toLowerCase())
          }).join(' ')
        }),
    }),
  date: z
    .string()
    .nonempty("A data é obrigatória"),
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
  maxTemperature: z.coerce
    .number({
      required_error: "A temperatura máxima é obrigatória",
    })
    .min(-20, "A temperatura mínima não pode ser menor que -20ºC")
    .max(48, "A temperatura máxima não pode ser maior que 48ºC"),
  minTemperature: z.coerce
    .number({
      required_error: "A temperatura mínima é obrigatória",
    })
    .min(-20, "A temperatura mínima não pode ser menor que -20ºC")
    .max(48, "A temperatura máxima não pode ser maior que 48ºC"),
  precipitation: z.coerce
    .number({
      required_error: "A precipitação é obrigatória",
    })
    .max(100, "A precipitação não pode ser maior que 100%")
    .min(0, "A precipitação não pode ser menor que 0%"),
  humidity: z.coerce
    .number({
      required_error: "A umidade é obrigatória",
    })
    .max(100, "A umidade não pode ser maior que 100%")
    .min(0, "A umidade não pode ser menor que 0%"),
  windSpeed: z.coerce
    .number({
      required_error: "A velocidade do vento é obrigatória",
    })
    .min(1, "A velocidade do vento não pode ser menor que 1km/h")
    .max(520, "A velocidade do vento não pode ser maior que 520km/h"),
});

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;

function Register() {

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await axios.post('http://localhost:4767/api/v1/weather/register', data);
      alert('Cadastro realizado com sucesso');
    } catch (error) {
      console.log(data);
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
            register={register('city.name')}
          />
          {errors.city?.name && <span className={styles.warning}>{errors.city.name.message}</span>}
          <Input
            type={'hidden'}
            value={1}
            register={register('city.idCity')}
          />
          <Input
            type={'date'}
            className={styles.date}
            label={'Data'}
            register={register('date')}
          />
          {errors.date && <span className={styles.warning}>{errors.date.message}</span>}
        </div>
        <div className={styles.temperatureCard}>
          <div className={styles.cardContainer}>
            <div className={styles.shift}>
              <div className={styles.weather}>
                <>
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
                  {errors.dayTimeEnum &&
                    <span className={styles.warning}>{errors.dayTimeEnum.message}</span>}
                </>
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
                {errors.nightTimeEnum &&
                  <span className={styles.warning}>{errors.nightTimeEnum.message}</span>}
              </div>
              <div className={styles.dayNight}>
                <label className={styles.dayNightInput}>Turno</label>
                <input
                  className={styles.dayNightInput}
                  value={'Dia'}
                  readOnly={true}
                />
                <input
                  className={styles.dayNightInput}
                  value={'Noite'}
                  readOnly={true}
                />
              </div>
            </div>
            <div className={styles.weatherDataNumbers}>
              <div className={styles.temperatureData}>
                <Input
                  label={'Temperatura Máxima'}
                  type={'number'}
                  className={styles.numberFields}
                  register={register('maxTemperature')}
                />
                {errors.maxTemperature &&
                  <span className={styles.warning}>{errors.maxTemperature.message}</span>}
                <Input
                  label={'Temperatura Mínima'}
                  type={'number'}
                  className={styles.numberFields}
                  register={register('minTemperature')}
                />
                {errors.minTemperature &&
                  <span className={styles.warning}>{errors.minTemperature.message}</span>}
              </div>

              <div className={styles.weatherData}>
                <Input
                  label={'Precipitação'}
                  type={'number'}
                  className={styles.numberFields}
                  register={register('precipitation')}
                />
                {errors.precipitation &&
                  <span className={styles.warning}>{errors.precipitation.message}</span>}
                <Input
                  label={'Umidade'}
                  type={'number'}
                  className={styles.numberFields}
                  register={register('humidity')}
                />
                {errors.humidity &&
                  <span className={styles.warning}>{errors.humidity.message}</span>}
                <Input
                  label={'Velocidade do Vento'}
                  type={'number'}
                  className={styles.numberFields}
                  register={register('windSpeed')}
                />
                {errors.windSpeed &&
                  <span className={styles.warning}>{errors.windSpeed.message}</span>}
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
