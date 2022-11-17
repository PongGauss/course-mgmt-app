import { CreateCourseReq, SearchCourseReq } from "./dtos/course.dto";
import { fetcher, poster } from "./_base";

export const createCourse = async (
  req: CreateCourseReq
): Promise<any> => {
  const formattedReq = {
    ...req,
    started_at: req.startedAt,
    ended_at: req.endedAt,
    opened_seat: req.openedSeat,
  };
  const res = await poster(`/course`, formattedReq);
  return res;
};

export const getCourses = async (
  { courseName, courseDate }: SearchCourseReq
): Promise<any> => {
  if ((courseDate === null)) {
    console.log(" L'm null bitch");
  }
  const query = (courseDate === null) ? `?q=${courseName}` : `?q=${courseName}&date=${courseDate}`;
  const res = await fetcher(`/course${query}`);
  return res;
};