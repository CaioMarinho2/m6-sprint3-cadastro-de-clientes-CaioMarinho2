export interface IContactRequest {
    name: string;
    emails: Array<string>;
    phones: Array<string>;
    id:string;
  }
  
  export interface IContactRequestUpdate {
    id:string;
    contact_id: string;
    name:string;
  }