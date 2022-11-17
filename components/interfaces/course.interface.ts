export interface CourseItem {
  category: string;
  description: string;
  endedAt: Date;
  name: string;
  openedSeat: number;
  slug: string;
  startedAt: Date;
  subject: string;
  user: Instructor;
  image: string;
}

export interface Instructor {
  firstName: string;
  lastName: string;
}