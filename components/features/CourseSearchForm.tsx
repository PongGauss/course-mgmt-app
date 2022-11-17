import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form';
import {
  selectCourseLoadingState,
  selectCourseSearchingState,
  setCourseLoadingState,
  setCourseSearchingState,
} from 'course-mgmt-app/stores/courseSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormValues {
  courseName?: string;
  courseDate?: string;
}

const CourseSearchForm = () => {
  const dispatch = useDispatch();
  const isCourseLoading = useSelector(selectCourseLoadingState);
  const courseSearchParams = useSelector(selectCourseSearchingState);
  const [queryDate, setQueryDate] = useState<Date>(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = async ({ courseName }: FormValues) => {
    dispatch(setCourseLoadingState(true));
    const courseDate = queryDate === undefined ? '' : queryDate;
    dispatch(setCourseSearchingState({ courseName, courseDate }));
  };

  if (courseSearchParams) {
    setValue('courseDate', courseSearchParams.courseDate);
  }
  return (
    <Form
      noValidate
      onSubmit={handleSubmit(onSubmitHandler)}
      className="row g-3 justify-content-center"
    >
      <div className="mb-3 col-md-6 col-xs-12">
        <label htmlFor="formCourseName" className="form-label">
          Course name
        </label>
        <input
          type="text"
          className="form-control"
          id="formCourseName"
          {...register('courseName')}
        />
      </div>

      <div className="mb-3 col-md-6 col-xs-12">
        <label htmlFor="formCourseDate" className="form-label">
          Course Date:
        </label>
        <DatePicker
          selected={queryDate}
          onChange={(date) => setQueryDate(date!)}
          className="form-control"
        />
      </div>

      <div className="col-md-6 col-sm-12 col-xs-12">
        {!isCourseLoading ? (
          <Button
            variant="primary"
            type="submit"
            className="col-xs-12 col-sm-12 col-md-6"
          >
            Search
          </Button>
        ) : (
          <Button
            variant="primary"
            className="col-xs-12 col-sm-12 col-md-6"
            disabled
          >
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
      </div>
    </Form>
  );
};

export default CourseSearchForm;
