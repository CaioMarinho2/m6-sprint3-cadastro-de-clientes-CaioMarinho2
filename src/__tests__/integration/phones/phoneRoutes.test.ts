import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedContact,
  mockedlogin,
  mockedloginDiferent,
  mockedPhone,
  mockedUpdatePhone,
  mockedUser,
  mockedWrongPhone,
} from "../../mocks";

describe("/phones", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /phones -  should be able to create a phone to user ", async () => {
    const user = await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const response = await request(app)
      .post(`/phones/create/${user.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedPhone);

    expect(response.body[0]).toHaveProperty("message");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  test("POST /phones -  should not be able to create a phone to user with wrong token ", async () => {
    const user = await request(app).post("/users/create").send(mockedUser);

    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const response = await request(app)
      .post(`/phones/create/${user.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedPhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /phones -  should be able to create a phone to user with wrong properties ", async () => {
    const user = await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const response = await request(app)
      .post(`/phones/create/${user.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedWrongPhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /phones -  should be able to create a phone to contact ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .post(`/phones/create/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedPhone);

    expect(response.body[0]).toHaveProperty("message");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  test("POST /phones -  should not be able to create a phone to contact with wrong token ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .post(`/phones/create/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedPhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /phones -  should be able to create a phone to contact with wrong properties ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .post(`/phones/create/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedWrongPhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /phones -  should be able to edit a user's phone ", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const userInfos = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/phones/update/${userInfos.body.phones[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUpdatePhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("PATCH /phones -  should not be able to edit a user's phone with wrong token ", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const userInfos = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/phones/update/${userInfos.body.phones[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedUpdatePhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /phones -  should be able to edit a user's phone with wrong properties ", async () => {
    const user = await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const userInfos = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/phones/update/${userInfos.body.phones[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedPhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /phones -  should be able to edit a contact's phone ", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/phones/update/${listContacts.body[0].phones[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUpdatePhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("PATCH /phones -  should not be able to edit a contact's phone with wrong token ", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/phones/update/${listContacts.body[0].phones[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedUpdatePhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /phones -  should be able to edit a contact's phone with wrong properties ", async () => {
    const user = await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/phones/update/${listContacts.body[0].phones[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedPhone);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("DELETE /phones -  should be able to delete a user phone", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const userInfos = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/phones/delete/${userInfos.body.phones[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /phones -  should not be able to delete a user phone with wrong token", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const userInfos = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/phones/delete/${userInfos.body.phones[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /phones -  should be able to delete a contact phone", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/phones/delete/${listContacts.body[0].phones[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /phones -  should not be able to delete a contact phone with wrong token", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/phones/delete/${listContacts.body[0].phones[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
