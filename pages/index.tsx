import CourseSearchForm from '../components/features/CourseSearchForm';
import CourseSearchResult from '../components/features/CourseSearchResult';

export default function Home() {
  return (
    <>
      <section className="py-2 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Course Search!</h1>
            <p className="lead text-muted">
              You could search for your interesting course here!!
            </p>
          </div>
        </div>
      </section>
      <section className="py-2 text-center container">
        <CourseSearchForm />
      </section>

      <CourseSearchResult />
    </>
  );
}
