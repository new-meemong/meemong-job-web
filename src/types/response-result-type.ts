import { JobPostingType } from "./job-posting-type";
import { ResumeType } from "./resume-type";

export interface ResponseResultType {
  status: boolean;
  message: string;
  data?: JobPostingType | ResumeType;
}
