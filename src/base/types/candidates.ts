export type RecruitmentStage =
  | 'applied'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'awaiting'
  | 'rejected';

export interface Candidate {
  id: string;
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
  stage?: RecruitmentStage;
}

export enum ApplicationProcessingState {
  New = 'new',
  Processing = 'processing',
  Completed = 'completed',
}
