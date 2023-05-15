import Input from "../../ui/components/Input";
import Button from "../../ui/components/Button";
import styles from './register.module.css';
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm, useWatch} from "react-hook-form";
import axios from "axios";
import {useFetch} from "../../hooks/useFetch";
import {WeatherData} from "../../@types/WeatherData";

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
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
    mode: "onChange",
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
      console.log(data);
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
            required={true}
            register={register('city.name')}
          />
          {errors.city?.name && <span className={styles.warning}>{errors.city.name.message}</span>}
          <Input
            type={'date'}
            className={styles.date}
            label={'Data'}
            required={true}
            register={register('date')}
          />
          {errors.date && <span className={styles.warning}>{errors.date.message}</span>}
        </div>
        <div className={styles.temperatureCard}>
          <div className={styles.cardContainer}>
            <div className={styles.shift}>
              <div className={styles.weather}>
                <>
                  <label htmlFor={'select'} className={styles.labelCard}>Tempo*</label>
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
                  required={true}
                  register={register('maxTemperature')}
                />
                {errors.maxTemperature &&
                  <span className={styles.warning}>{errors.maxTemperature.message}</span>}
                <Input
                  label={'Temperatura Mínima'}
                  type={'number'}
                  className={styles.numberFields}
                  required={true}
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
                  required={true}
                  register={register('precipitation')}
                />
                {errors.precipitation &&
                  <span className={styles.warning}>{errors.precipitation.message}</span>}
                <Input
                  label={'Umidade'}
                  type={'number'}
                  className={styles.numberFields}
                  required={true}
                  register={register('humidity')}
                />
                {errors.humidity &&
                  <span className={styles.warning}>{errors.humidity.message}</span>}
                <Input
                  label={'Velocidade do Vento'}
                  type={'number'}
                  className={styles.numberFields}
                  required={true}
                  register={register('windSpeed')}
                />
                {errors.windSpeed &&
                  <span className={styles.warning}>{errors.windSpeed.message}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            value={'Cancelar'}
            id={'cancel'}
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
