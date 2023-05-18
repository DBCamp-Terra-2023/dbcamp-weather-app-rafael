import Input from "../../ui/components/Input";
import Button from "../../ui/components/Button";
import styles from './register.module.css';
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm, useWatch} from "react-hook-form";
import axios from "axios";
import React from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createRegisterFormSchema = z.object({
  city: z
    .object({
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
  maxTemperature: z
    .string()
    .nonempty("A temperatura máxima é obrigatória")
    .refine(value =>
        (parseInt(value) >= -20 && parseInt(value) <= 48),
      'A temperatura máxima deve estar entre -20ºC e 48ºC'),
  minTemperature: z
    .string()
    .nonempty("A temperatura mínima é obrigatória")
    .refine(value =>
        (parseInt(value) >= -20 && parseInt(value) <= 48),
      'A temperatura máxima deve estar entre -20ºC e 48ºC'),
  precipitation: z
    .string()
    .nonempty("A precipitação é obrigatória")
    .refine(value =>
        (parseInt(value) >= 0 && parseInt(value) <= 100),
      'A precipitação deve estar entre 0% e 100%'),
  humidity: z
    .string()
    .nonempty("A umidade é obrigatória")
    .refine(value =>
        (parseInt(value) >= 0 && parseInt(value) <= 100),
      'A umidade deve estar entre 0% e 100%'),
  windSpeed: z
    .string()
    .nonempty("A velocidade do vento é obrigatória")

    .refine(value =>
        (parseInt(value) >= 0 && parseInt(value) <= 520),
      'A velocidade do vento deve estar entre 0km/h e 520km/h'),
});

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;

function Register() {

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    reset,
  } = useForm<CreateRegisterFormData>({
    defaultValues: {
      city: {name: ''},
      date: '',
      dayTimeEnum: 'selectDay',
      nightTimeEnum: 'selectNight',
      maxTemperature: '',
      minTemperature: '',
      precipitation: '',
      humidity: '',
      windSpeed: '',
    },
    resolver: zodResolver(createRegisterFormSchema),
    mode: "onSubmit",
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  const watchedFields = useWatch({
    control,
    name: ['city', 'date', 'dayTimeEnum', 'nightTimeEnum'],
  });
  const isDisabled = watchedFields.some(
    (value, index) => {
      return index === 2 || index === 3 ? value === 'selectDay' || value === 'selectNight' : !value;
    }
  );

  const onSubmit = async (data: CreateRegisterFormData) => {
    try {
      await axios.post('http://localhost:4767/api/v1/weather/register', data);
      toast.success('Cadastro realizado com sucesso! ☀️', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      reset();
    } catch (error) {
      toast.error('Erro ao cadastrar clima! ⛈️', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log('Erro ao cadastrar: ', error);
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
        <div className={styles.cityAndDate}>
          <div className={styles.inputWithErrors}>
            <Input
              id='city.name'
              aria-labelledby='city.name'
              type={'text'}
              className={styles.city}
              label={'Cidade'}
              aria-required={true}
              placeholder='Nome da Cidade'
              aria-placeholder='Nome da Cidade'
              required={true}
              register={register('city.name')}
            />
            {errors.city?.name && <span className={styles.warning}>{errors.city.name.message}</span>}
          </div>
          <div className={styles.inputWithErrors}>
            <Input
              id='date'
              aria-labelledby='date'
              type={'date'}
              className={styles.date}
              label={'Data'}
              aria-required={true}
              required={true}
              register={register('date')}
            />
            {errors.date && <span className={styles.warning}>{errors.date.message}</span>}
          </div>
        </div>
        <div className={styles.temperatureCard}>
          <div className={styles.cardContainer}>
            <div className={styles.selectAndInputContainer}>
              <div>
                <div className={styles.dayClimate}>

                  <div className={styles.inputWithErrors}>
                    <label htmlFor='select' className={styles.labelCard}>Tempo*</label>
                    <select
                      aria-label='Selecionar Clima do Dia'
                      aria-required={true}
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
                  </div>
                  <Input
                    className={styles.dayNightInput}
                    disableTab={true}
                    label='Turno'
                    value='Dia'
                    readOnly={true}
                  />

                </div>
                <div className={styles.nightClimate}>

                  <div className={styles.inputWithErrors}>
                    <select
                      aria-required={true}
                      aria-label='Selecionar Clima da Noite'
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
                  <Input
                    aria-hidden={true}
                    className={styles.dayNightInput}
                    value={'Noite'}
                    disableTab={true}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className={styles.weatherDataNumbers}>
                <div className={styles.temperatureData}>
                  <div className={styles.inputWithErrors}>
                    <Input
                      id='maxTemperature'
                      aria-labelledby='maxTemperature'
                      label={'Temperatura Máxima'}
                      type={'number'}
                      className={styles.numberFields}
                      placeholder='31'
                      aria-placeholder='31'
                      aria-required={true}
                      aria-valuemin={-20}
                      aria-valuemax={48}
                      spanValue='ºC'
                      required={true}
                      register={register('maxTemperature')}
                    />
                    {errors.maxTemperature &&
                      <span className={styles.warning}>{errors.maxTemperature.message}</span>}
                  </div>
                  <div className={styles.inputWithErrors}>
                    <Input
                      id='minTemperature'
                      aria-labelledby='minTemperature'
                      label={'Temperatura Mínima'}
                      type={'number'}
                      className={styles.numberFields}
                      aria-placeholder='18'
                      aria-required={true}
                      aria-valuemin={-20}
                      aria-valuemax={48}
                      spanValue='ºC'
                      placeholder='18'
                      required={true}
                      register={register('minTemperature')}
                    />
                    {errors.minTemperature &&
                      <span className={styles.warning}>{errors.minTemperature.message}</span>}
                  </div>
                </div>

                <div className={styles.weatherData}>
                  <div className={styles.inputWithErrors}>
                    <Input
                      id='precipitation'
                      aria-labelledby='precipitation'
                      label={'Precipitação'}
                      type={'number'}
                      className={styles.numberFields}
                      aria-required={true}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-placeholder='10'
                      placeholder='10'
                      spanValue='%'
                      required={true}
                      register={register('precipitation')}
                    />
                    {errors.precipitation &&
                      <span className={styles.warning}>{errors.precipitation.message}</span>}
                  </div>
                  <div className={styles.inputWithErrors}>
                    <Input
                      id='humidity'
                      aria-labelledby='humidity'
                      label={'Umidade'}
                      type={'number'}
                      className={styles.numberFields}
                      aria-required={true}
                      aria-placeholder='30'
                      aria-valuemin={0}
                      aria-valuemax={100}
                      placeholder='30'
                      spanValue='%'
                      required={true}
                      register={register('humidity')}
                    />
                    {errors.humidity &&
                      <span className={styles.warning}>{errors.humidity.message}</span>}
                  </div>
                  <div className={styles.inputWithErrors}>
                    <Input
                      id='windSpeed'
                      aria-labelledby='windSpeed'
                      label={'Velocidade do Vento'}
                      type={'number'}
                      className={styles.numberFields}
                      aria-required={true}
                      aria-placeholder='30'
                      aria-valuemin={0}
                      aria-valuemax={100}
                      placeholder='30'
                      required={true}
                      spanValue='km/h'
                      register={register('windSpeed')}
                    />
                    {errors.windSpeed &&
                      <span className={styles.warning}>{errors.windSpeed.message}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <ToastContainer
            limit={2}
          />
          <Button
            aria-label='Cancelar'
            value={'Cancelar'}
            id={'cancel'}
            onClick={() => reset()}
          />

          <Button
            disabled={!watchedFields.every(Boolean) || isDisabled}
            value={'Salvar'}
            id={'save'}
            type={"submit"}
          />
        </div>
      </form>

    </div>
  )
}

export default Register
