export interface userProfile {
  name: string;
  work_title: string;
  id?: string;
  phone: string;
  work_location: string;
  email: string;
  password: string;
  skill_list: skillExp[];
  skills: skillExp[];
}

export interface profileRes {
  messages: [];
  body: userProfile;
}

export interface skillExp{
  id?: number | null;
  skill?: number | null | undefined;
  name: string;
  level_of_experience: string;
}
