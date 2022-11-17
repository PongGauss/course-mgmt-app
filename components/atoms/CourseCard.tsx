/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import createSubject from 'react-hook-form/dist/utils/createSubject';
import { CourseItem } from '../interfaces/course.interface';
import moment from 'moment';

interface Props {
  course: CourseItem;
}

const CourseCard = ({ course }: Props) => {
  const start = moment(course.startedAt).format('DD/MM/yyyy');
  const end = moment(course.endedAt).format('DD/MM/yyyy');
  return (
    <div className="col">
      <div className="card mb-3">
        <img
          src={course.image}
          className="card-img-top"
          alt="course-cover"
          width="100%"
          height="200px"
        />
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Instructor:{' '}
              <small>
                {course.user.firstName} {course.user.lastName}
              </small>
            </li>
            <li className="list-group-item">
              Subject: <small>{course.subject}</small>
            </li>

            <li className="list-group-item">
              Date:{' '}
              <small>
                {start} - {end}
              </small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
