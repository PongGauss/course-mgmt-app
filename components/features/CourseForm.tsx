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
import { createCourse } from '../../apis/course';

interface FormValues {
  name?: string;
  image?: string;
  subject?: string;
  startedAt?: Date;
  endedAt?: Date;
  openedSeat?: string;
  description?: string;
  category?: string;
}

const CourseForm = () => {
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
    name,
    image,
    subject,
    startedAt,
    endedAt,
    openedSeat,
    description,
    category,
  }: FormValues) => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      const res = await createCourse({
        name,
        image,
        subject,
        startedAt,
        endedAt,
        openedSeat,
        description,
        category,
      });
      console.log(res.data);
      if (res.status === 201) {
        router.push('/');
      }
    } catch (e: any) {
      setShowAlert(true);
      console.log(isShowAlert);
      if (e.response.status === 409) {
        setFormErrorMsg('Error, please try again.');
        setIsLoading(false);
      }
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
      {isShowAlert ? <Alert variant="danger">{formErrorMsg}</Alert> : ''}
      <div className="mb-3">
        <label htmlFor="formName" className="form-label">
          Course Name
        </label>
        <input
          type="text"
          className="form-control"
          id="formName"
          {...register('name', {
            required: true,
          })}
          required
        />
        {errors.name && (
          <p className="input-error-feedback">
            Please input a valid course name.
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formImage" className="form-label">
          Cover Image Url
        </label>
        <input
          type="text"
          className="form-control"
          id="formImage"
          {...register('image', { required: true })}
          required
        />
        {errors.image && (
          <p className="input-error-feedback">
            Please input a course cover image url
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formSubject" className="form-label">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          id="formSubject"
          {...register('subject', {
            required: true,
          })}
          required
        />
        {errors.subject && (
          <p className="input-error-feedback">Please input subject</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="categoryOptionInvestment"
            value="INVESTMENT"
            {...register('category', {
              required: true,
            })}
          />
          <label
            className="form-check-label"
            htmlFor="categoryOptionInvestment"
          >
            Investment
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="categoryOptionProperty"
            value="PROPERTY"
            {...register('category', {
              required: true,
            })}
          />
          <label className="form-check-label" htmlFor="categoryOptionProperty">
            Property
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="categoryOptionSoftware"
            value="SOFTWARE"
            {...register('category', {
              required: true,
            })}
          />
          <label className="form-check-label" htmlFor="categoryOptionSoftware">
            Software
          </label>
        </div>
        {errors.category && (
          <p className="input-error-feedback">Please choose a role</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Course description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          {...register('description', {
            required: true,
          })}
        />
        {errors.description && (
          <p className="input-error-feedback">Please input any description</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formOpenedSeat" className="form-label">
          Open seat
        </label>
        <input
          type="number"
          className="form-control"
          id="formOpenedSeat"
          {...register('openedSeat', {
            required: true,
          })}
          required
        />
        {errors.openedSeat && (
          <p className="input-error-feedback">
            Please input a number of open seat.
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formStartedAt" className="form-label">
          Started at
        </label>
        <input
          type="date"
          className="form-control"
          id="formStartedAt"
          {...register('startedAt', {
            required: true,
          })}
        />
        {errors.startedAt && (
          <p className="input-error-feedback">Please choose start date</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="formEndedAt" className="form-label">
          Ended at
        </label>
        <input
          type="date"
          className="form-control"
          id="formEndedAt"
          {...register('endedAt', {
            required: true,
          })}
        />
        {errors.endedAt && (
          <p className="input-error-feedback">Please choose end date</p>
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

{
  /* <Form>
  <Form.Group className="mb-3" controlId="formConfirmPassword">
    <Form.Label>Course Name</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formLastName">
    <Form.Label>Cover Image URL</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formNickName">
    <Form.Label>Subject</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formRole">
    <Form.Label>Category</Form.Label>
    <div className="mb-3">
      <Form.Check
        inline
        label="INVESTMENT"
        name="roleStudent"
        type="radio"
        id="roleStudent"
      />
      <Form.Check
        inline
        label="SOFTWARE"
        name="roleInstructor"
        type="radio"
        id="roleInstructor"
      />
      <Form.Check
        inline
        label="PROPERTY"
        name="roleInstructor"
        type="radio"
        id="roleInstructor"
      />
    </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Course Description</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBirthDay">
    <Form.Label>Start Date</Form.Label>
    <Form.Control
      type="date"
      name="date_of_birth"
      value={startDate.toString()}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBirthDay">
    <Form.Label>End Date</Form.Label>
    <Form.Control
      type="date"
      name="date_of_birth"
      value={endDate.toString()}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formNickName">
    <Form.Label>Open Seat</Form.Label>
    <Form.Control type="number" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>; */
}

export default CourseForm;
