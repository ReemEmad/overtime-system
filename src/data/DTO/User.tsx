export interface userDataDto {
  body: any;
  name: string;
  work_title: string;
  id?: string;
  phone: string;
  work_location: string;
  email: string;
  password: string;
  role_name?: string;
}

export interface userRes {
  messages: [];
  body: any;
}
