import ProfileForm from '@components/features/ProfileForm';

const Login = () => {
  return (
    <>
      <section className="py-5 container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">My Profile!</h1>
            <ProfileForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
