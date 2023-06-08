export interface JobDTO {
  score: number | undefined;
  job: JobDTO;
  id: string;
  name: string;
  created_date: string;
  description: string;
}

export interface updateJobDto {
  name: string;
  description: string;
}
