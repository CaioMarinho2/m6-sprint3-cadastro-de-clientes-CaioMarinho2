export interface IEmailRequest {
  id: string;
  emails: Array<string>;
  contact_id: string;
}

export interface IEmailRequestUpdate {
  email: string;
  email_id: string;
  id:string
}
