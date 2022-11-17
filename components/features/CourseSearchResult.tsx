import { getCourses } from 'course-mgmt-app/apis/course';
import {
  selectCourseLoadingState,
  selectCourseSearchingState,
  setCourseLoadingState,
} from 'course-mgmt-app/stores/courseSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../atoms/CourseCard';
import { CourseItem } from '../interfaces/course.interface';

const CourseSearchResult = () => {
  const isCourseLoading = useSelector(selectCourseLoadingState);
  const courseSearchParams = useSelector(selectCourseSearchingState);

  const [isError, setIsErrorState] = useState<Boolean>(false);
  const [isNotfound, setIsNotfoundState] = useState<Boolean>(false);
  const [courses, setCourses] = useState<CourseItem[]>([]);

  const dispatch = useDispatch();

  if (isCourseLoading) {
    getCourses(courseSearchParams)
      .then((res) => {
        dispatch(setCourseLoadingState(false));
        res.data.length == 0
          ? setIsNotfoundState(true)
          : setIsNotfoundState(false);
        setCourses(res.data);
        console.log(courses);
      })
      .catch((e) => {
        console.log(e);
        dispatch(setCourseLoadingState(false));
        setIsErrorState(true);
      });
  }

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        {isCourseLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {courses.length > 0 ? (
              <>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-md-2 g-3">
                  {courses.map((course, id) => {
                    return <CourseCard key={id} course={course} />;
                  })}
                </div>
              </>
            ) : null}
          </>
        )}

        {isError || isNotfound ? (
          <>
            <div className="d-flex justify-content-center">
              No result, Please try different criteria.
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CourseSearchResult;
