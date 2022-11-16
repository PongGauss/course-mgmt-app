import LoginForm from '../components/features/LoginForm';

const Login = () => {
  return (
    <>
      <section className="py-5 container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Please Login!</h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
