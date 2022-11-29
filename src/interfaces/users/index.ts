export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface IUserlogin {
  email: string;
  password: string;
}

export interface IUserupdate {
  name?: string;
  email?: string;
  password?: string;
}
