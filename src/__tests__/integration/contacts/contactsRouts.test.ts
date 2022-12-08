import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedContact,
  mockedlogin,
  mockedloginDiferent,
  mockedUser,
  mockedUserDiferent,
  mockedWrongContact,
} from "../../mocks";

describe("/contacts", () => {
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

  test("POST /contacts -  should be able to create a contact ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const response = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.status).toBe(201);
  });

  test("POST /contacts -  should not be able to create a contact with wrong token", async () => {
    await request(app).post("/users/create").send(mockedUserDiferent);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const response = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /contacts -  should not be able to create a contact with wrong properties", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const response = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedWrongContact);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /contacts -  should be able to list users contacts", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const response = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("emails");
    expect(response.body[0]).toHaveProperty("phones");
    expect(response.status).toBe(200);
  });

  test("GET /contacts -  should not be able to list users contacts with wrong token", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const response = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /contacts -  should be able to edit a contact ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/contacts/update/${listContacts.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("PATCH /contacts -  should not be able to edit a contact with wrong token", async () => {
    await request(app).post("/users/create").send(mockedUserDiferent);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const response = await request(app)
      .patch(`/contacts/update/${listContacts.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("message");

    expect(response.status).toBe(401);
  });

  test("PATCH /contacts -  should not be able to edit a contact with wrong properties", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/contacts/update/${listContacts.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedWrongContact);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("DELETE /contacts -  should be able to delete a contact", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .delete(`/contacts/delete/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /contacts -  should not be able to delete a contact  with wrong token", async () => {
    await request(app).post("/users/create").send(mockedUserDiferent);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .delete(`/contacts/delete/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
