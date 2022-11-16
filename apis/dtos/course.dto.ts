export interface CreateCourseReq {
  name?: string;
  image?: string;
  subject?: string;
  startedAt?: Date;
  endedAt?: Date;
  openedSeat?: string;
  description?: string;
  category?: string;
}