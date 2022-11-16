import CourseForm from '../components/features/CourseForm';

const CreateCourse = () => {
  return (
    <>
      <section className="py-5 container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Create your course!</h1>
            <CourseForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCourse;
