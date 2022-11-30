export interface IPhonesRequest {
    id: string;
    phones: Array<string>;
    owner_id: string;
  }

  export interface IPhonesRequestUpdate {
    phoneId: string;
    id: string;
    Newphone:string
  }