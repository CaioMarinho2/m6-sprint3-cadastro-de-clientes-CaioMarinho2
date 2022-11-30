export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phones: Array<string>;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
