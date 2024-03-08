export type ApplicationStatus =
  | 'applied'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'awaiting'
  | 'rejected';

export interface Candidate {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  profession: string;
  description: string;
  score: number;
  skillScore: number;
  cultureScore: number;
  job: string;
}
