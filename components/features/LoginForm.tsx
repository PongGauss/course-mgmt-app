import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login, setAuthenTokenToStorage } from '../../apis/auth';
import { setAuthState } from '../../stores/authSlice';
import { useDispatch } from 'react-redux';

interface LoginFormValues {
  email?: string;
  password?: string;
}

function LoginForm() {
  const router = useRouter();
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formErrorMsg, setFormErrorMsg] = useState<string>('');

  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    console.log('click');
    e.preventDefault;
    router.push('/signup');
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = async ({ email, password }: LoginFormValues) => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      const res = await login({
        email,
        password,
      });
      if (res.status === 201) {
        dispatch(setAuthState(true));
        setAuthenTokenToStorage(res.data.data.token);
        router.push('/');
      }
    } catch (e: any) {
      setShowAlert(true);
      if (e.response.status === 409) {
        setFormErrorMsg(
          'Email is already exist, Please try with different one.',
        );
        setIsLoading(false);
      }
      setIsLoading(false);
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

      {!isLoading ? (
        <Button variant="primary" type="submit">
          Log in
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

      <Button
        variant="secondary"
        className="ms-4"
        onClick={(e) => handleClick(e)}
      >
        Sign up
      </Button>
    </Form>
  );
}

export default LoginForm;
