import SignupForm from '@components/features/SignupForm';

const Login = () => {
  return (
    <>
      <section className="py-5 container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Please Signup!</h1>
            <SignupForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
