import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import { setAuthenTokenToStorage, updateProfile } from '@apis/auth';
import Spinner from 'react-bootstrap/Spinner';
import {
  setProfilePartialState,
  selectProfileState,
} from '@stores/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { profile } from 'console';
import { GENDER } from '../../constant/gender.const';
import moment from 'moment';

interface FormValues {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  role?: string;
  gender?: string;
  birthDate?: Date;
}

const SignupForm = () => {
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const profileState = useSelector(selectProfileState);
  console.log(profileState);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = async ({
    firstName,
    lastName,
    nickName,
    role,
    gender,
    birthDate,
  }: FormValues) => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      const res = await updateProfile({
        firstName,
        lastName,
        nickName,
        role,
        gender,
        birthDate,
      });
      console.log(res.data.data.token);
      if (res.status === 200) {
        dispatch(
          setProfilePartialState({
            firstName,
            lastName,
            nickName,
            role,
            gender,
            birthDate,
          }),
        );
        router.push('/');
      }
    } catch (e: any) {
      setShowAlert(true);
      console.log(isShowAlert);
      if (e.response.status === 409) {
        setIsLoading(false);
      }
    }
  };

  const [birthDateF, setBirthDateF] = useState<string>('1999-01-10');

  if (profileState) {
    setValue('firstName', profileState.firstName);
    setValue('lastName', profileState.lastName);
    setValue('nickName', profileState.nickName);
    setValue('gender', profileState.gender);
    setValue('birthDate', profileState.birthDate);
  }

  useEffect(() => {
    const tmp = moment(profileState.birthDate, 'YYYY-MM-DD').toDate();
    setBirthDateF(moment(tmp).format('YYYY-MM-DD'));
  }, [profileState.birthDate]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
      {isShowAlert ? (
        <Alert variant="danger">Error, Please try again</Alert>
      ) : (
        ''
      )}

      <div className="mb-3">
        <label htmlFor="formFirstName" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="formFirstName"
          {...register('firstName', {
            required: true,
          })}
          defaultValue={profileState.firstName}
        />
        {errors.firstName && (
          <p className="input-error-feedback">Please input a first name</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formLastName" className="form-label">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="formLastName"
          {...register('lastName', {
            required: true,
          })}
          defaultValue={profileState.lastName}
        />
        {errors.lastName && (
          <p className="input-error-feedback">Please input a last name</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formNickName" className="form-label">
          Nick name
        </label>
        <input
          type="text"
          className="form-control"
          id="formNickName"
          {...register('nickName', {
            required: true,
          })}
          defaultValue={profileState.nickName}
        />
        {errors.nickName && (
          <p className="input-error-feedback">Please input a nick name</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="genderOptionM"
            value="M"
            {...register('gender', {
              required: true,
            })}
            defaultChecked={profileState.gender === GENDER.MALE ? true : false}
          />
          <label className="form-check-label" htmlFor="genderOptionM">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="genderOptionF"
            value="F"
            {...register('gender', {
              required: true,
            })}
            defaultChecked={
              profileState.gender === GENDER.FEMALE ? true : false
            }
          />
          <label className="form-check-label" htmlFor="genderOptionF">
            Famale
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="genderOptionO"
            value="F"
            {...register('gender', {
              required: true,
            })}
            defaultChecked={profileState.gender === GENDER.OTHER ? true : false}
          />
          <label className="form-check-label" htmlFor="genderOptionO">
            Other
          </label>
        </div>
        {errors.gender && (
          <p className="input-error-feedback">Please choose a gender</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formBirthDate" className="form-label">
          Birth Date:
        </label>
        <input
          type="date"
          className="form-control"
          id="formBirthDate"
          {...register('birthDate', {
            required: true,
          })}
        />
        {errors.birthDate && (
          <p className="input-error-feedback">Please select your birth date</p>
        )}
      </div>

      {!isLoading ? (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      ) : (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      )}
    </Form>
  );
};

export default SignupForm;
