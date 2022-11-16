import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import { setAuthenTokenToStorage, signup } from '../../apis/auth';
import Spinner from 'react-bootstrap/Spinner';
import { setAuthState } from '../../stores/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

interface FormValues {
  email?: string;
  password?: string;
  passwordConfirm?: string;
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
  const [formErrorMsg, setFormErrorMsg] = useState<string>('');

  const dispatch = useDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = async ({
    email,
    password,
    passwordConfirm,
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
      const res = await signup({
        email,
        password,
        passwordConfirm,
        firstName,
        lastName,
        nickName,
        role,
        gender,
        birthDate,
      });
      console.log(res.data.data.token);
      if (res.status === 201) {
        dispatch(setAuthState(true));
        setAuthenTokenToStorage(res.data.data.token);
        router.push('/');
      }
    } catch (e: any) {
      setShowAlert(true);
      console.log(isShowAlert);
      if (e.response.status === 409) {
        setFormErrorMsg(
          'Email is already exist, Please try with different one.',
        );
        setIsLoading(false);
      }
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
      {isShowAlert ? <Alert variant="danger">{formErrorMsg}</Alert> : ''}
      <div className="mb-3">
        <label htmlFor="formEmail" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className="form-control"
          id="formEmail"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
          required
        />
        {errors.email && (
          <p className="input-error-feedback">
            Please input a valid email address.
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="formPassword"
          {...register('password', { required: true })}
          required
        />
        {errors.password && (
          <p className="input-error-feedback">Please input a password</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formConfirmPassword" className="form-label">
          Confirm password
        </label>
        <input
          type="password"
          className="form-control"
          id="formConfirmPassword"
          {...register('passwordConfirm', {
            required: true,
            validate: (val: string) => {
              if (watch('password') != val) {
                return true;
              }
            },
          })}
          required
        />
        {errors.confirmPassword && (
          <p className="input-error-feedback">
            Please confirm the same password
          </p>
        )}
      </div>

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
        />
        {errors.nickName && (
          <p className="input-error-feedback">Please input a nick name</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="roleOptionInstructor"
            value="INSTRUCTOR"
            {...register('role', {
              required: true,
            })}
          />
          <label className="form-check-label" htmlFor="roleOptionInstructor">
            Instructor
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="roleOptionStudent"
            value="STUDENT"
            {...register('role', {
              required: true,
            })}
          />
          <label className="form-check-label" htmlFor="roleOptionStudent">
            Student
          </label>
        </div>
        {errors.role && (
          <p className="input-error-feedback">Please choose a role</p>
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
          Birth Date
        </label>
        <input
          type="date"
          className="form-control"
          id="formBirthDate"
          {...register('birthDate', {
            required: 'Birth date is required',
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
