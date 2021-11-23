export interface login {
  email: string;
  password: string;
}

export interface Data {
  access_token: string;
  user: User;
}

export interface User {
  id?: number;
  roles: string[];
  last_name: string;
  name: string;
  numero?: number;
  email: string;
  password: string;
}
