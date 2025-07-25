import { Availability, Proficiency } from "./user";

export interface LanguageData {
  id?: string;
  name: string;
  proficiency: Proficiency;
}

export interface EducationData {
  id?: string;
  school: string;
  areaOfStudy: string;
  degree: string;
  startYear: number;
  endYear: number;
  description?: string;
}

export interface ChangeHourlyRateData {
  availability: Availability;
}
