import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedContact,
  mockedEmail,
  mockedEmailUpdate,
  mockedlogin,
  mockedloginDiferent,
  mockedUser,
  mockedWrongContact,
} from "../../mocks";

describe("/emails", () => {
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

  test("POST /emails -  should be able to create a email to contact ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .post(`/emails/create/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedEmail);

    expect(response.body[0]).toHaveProperty("message");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  test("POST /emails -  should not be able to create a email to contact with wrong token ", async () => {
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
      .post(`/emails/create/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedEmail);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /emails -  should be able to create a email to contact with wrong properties ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const contact = await request(app)
      .post(`/contacts/create/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .post(`/emails/create/${contact.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedWrongContact.emails);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /emails -  should be able to edit a email ", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/emails/update/${listContacts.body[0].emails[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedEmailUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("PATCH /emails -  should not be able to edit a email with wrong token", async () => {
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/emails/update/${listContacts.body[0].emails[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedEmailUpdate);

    expect(response.body).toHaveProperty("message");

    expect(response.status).toBe(401);
  });

  test("PATCH /emails -  should not be able to edit a email with wrong properties", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/emails/update/${listContacts.body[0].emails[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedEmail);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("DELETE /emails -  should be able to delete a email", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/emails/delete/${listContacts.body[0].emails[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /emails -  should not be able to delete a email with wrong token", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);

    const listContacts = await request(app)
      .get(`/contacts/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/emails/delete/${listContacts.body[0].emails[0].id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
