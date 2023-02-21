Create schema overtime;

SET search_path TO overtime;

ALTER DATABASE postgres SET search_path TO overtime;

CREATE TYPE roles AS ENUM (
  'cfo',
  'squadlead',
  'operation',
  'admin'
);

CREATE TABLE Role (
  id serial PRIMARY KEY,
  name roles NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image bytea,
  work_title VARCHAR(255),
  phone VARCHAR(40) UNIQUE,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  work_location TEXT,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES Role (id),
  manager_id INTEGER REFERENCES users(id)
);

CREATE TABLE Privilege (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE Role_Privilege (
  role_id integer references Role(id),
  privilege_id integer references Privilege(id),
  PRIMARY KEY (role_id, privilege_id)
);

CREATE TABLE Skills (
  id serial PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE User_Skills (
  user_id integer references users(id) NOT NULL,
  skills_id integer references Skills(id) NOT NULL,
  level_of_experience TEXT NOT NULL,
  PRIMARY KEY (user_id, skills_id)
);

CREATE TABLE Project (
  id serial PRIMARY KEY,
  name TEXT UNIQUE NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE Job (
  id serial PRIMARY KEY,
  status varchar(255) NOT NULL,
  created_date date Not NULL default (now()),
  expected_start_date date,
  average_monthly_hours integer,
  required_position_name TEXT,
  progress integer,
  project_id integer references Project(id) NOT NULL
);

CREATE TABLE User_Assigned_Job (
  user_id integer references users(id) NOT NULL,
  job_id integer references Job(id) NOT NULL,
  assigned_date  date Not NULL default (now()),
  start_date date,
  timesheet bytea,
  PRIMARY KEY (user_id, job_id)
);


CREATE TABLE Budget_Request (
  id serial PRIMARY KEY,
  created_date date NOT NULL default (now()),
  status varchar(255),
  approved_date date,
  created_by integer references users(id) NOT NULL,
  approved_by integer references users(id),
  job_id integer references Job(id) NOT NULL 
);

CREATE TABLE Comment (
  id serial PRIMARY KEY,
  budget_request_id integer references Budget_Request(id) NOT NULL,
  created_date date NOT NULL default (now()),
  comment_by integer references users(id) NOT NULL,
  comment TEXT Not NULL
);

CREATE TABLE Job_Skills (
  job_id integer references Job(id),
  skills_id integer references Skills(id),
  level_of_experience TEXT NOT NULL,
  PRIMARY KEY (job_id, skills_id)
);

CREATE TABLE User_Apply_Job (
  user_id integer references users(id),
  job_id integer references Job(id),
  applied_date date Not NULL default (now()),
  PRIMARY KEY (user_id, job_id)
);


-- insert statements
insert into privilege (name,description) values ('add_cfo','can create a new CFO user');
insert into privilege (name,description) values ('add_squadlead','can create a new SquadLead user');
insert into privilege (name,description) values ('add_operation','can create a new Operation user');
insert into privilege (name,description) values ('view_cfos','can view CFOs List');
insert into privilege (name,description) values ('view_squadleads','can view SquadLeads');
insert into privilege (name,description) values ('view_operations','can view the List of developers and testers or any operation employee');



insert into role (name,description) values ('admin', 'the application admin');
insert into role (name,description) values ('cfo', 'chief financial officer');
insert into role (name,description) values ('squadlead', 'squadLead');
insert into role (name,description) values ('operation', 'developer, tester, or any operation user');


insert into role_privilege values (1,1);
insert into role_privilege values (1,2);
insert into role_privilege values (1,3);
insert into role_privilege values (1,4);
insert into role_privilege values (1,5);
insert into role_privilege values (1,6);
insert into role_privilege values (2,5);
insert into role_privilege values (2,6);
insert into role_privilege values (3,6);

