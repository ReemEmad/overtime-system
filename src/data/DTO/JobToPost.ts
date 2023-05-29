import { Dayjs } from "dayjs";

export interface JobToPost {
  project_id: string;
  job_name: string;
  job_expected_start_date?: Dayjs | string;
  job_weekly_hours_required?: number;
  skill_ids: string[];
  job_employee_required_position: string;
  job_expected_end_date: Dayjs | string;
  job_tpl_name: string;
}

export interface JobToEdit {
  [x: string]: any;
  job_id: string;
  job_name: string;
  job_tpl_name: string;
  job_employee_required_position: string;
  job_expected_start_date: Dayjs | string;
  job_expected_end_date: Dayjs | any;
  job_weekly_hours_required: number;
  skill_list: string[];
}
