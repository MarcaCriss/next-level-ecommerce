export interface login {
  email: string;
  password: string;
}

export interface Data {
  access_token: string;
  user: User;
}

export interface User {
  role: string[];
  last_name: string;
  name: string;
  email: string;
  password: string;
}
