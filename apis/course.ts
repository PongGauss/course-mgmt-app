import { CreateCourseReq } from "./dtos/course.dto";
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