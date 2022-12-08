import { IContactRequest } from "../../interfaces/contacts";
import { ISessionLogin } from "../../interfaces/session";
import { IUserRequest } from "../../interfaces/users";

export const mockedUser: IUserRequest = {
  name: "Pedro",
  email: "Pedro@gmail.com",
  password: "1234",
  phones: ["2133033333", "21991073426"],
};

export const mockedUserDiferent: IUserRequest = {
  name: "Andre",
  email: "Andre@gmail.com",
  password: "abcd",
  phones: ["21991073426"],
};

export const mockedUserWrong = {
  name: "Andre",
  email: 12,
  password: "abcd",
  phones: true,
};

export const mockedUserUpdate = {
  name: "novo_nome",
  email: "email@gmail.com",
  password: "nova_senha",
};

export const mockedlogin: ISessionLogin = {
  email: "Pedro@gmail.com",
  password: "1234",
};

export const mockedloginDiferent: ISessionLogin = {
  email: "Andre@gmail.com",
  password: "abcd",
};

export const mockedContact: IContactRequest = {
  name: "caio",
  emails: ["caio@gmail.com", "caio2@gmail.com"],
  phones: ["2133033333", "21991000000"],
};

export const mockedEmail = {
  emails: ["caio@gmail.com", "caio2@gmail.com"],
};

export const mockedEmailUpdate = {
  email: "caio@gmail.com",
};

export const mockedWrongContact = {
  name: [true],
  emails: "34",
  phones: [""],
};

export const mockedPhone = {
  phones: ["21994607592", "21945013845"],
};

export const mockedUpdatePhone = {
  phone: "21994607592",
};

export const mockedWrongPhone = {
  phones: [324],
};
