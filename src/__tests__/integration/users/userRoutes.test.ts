import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedlogin,
  mockedloginDiferent,
  mockedUser,
  mockedUserDiferent,
  mockedUserUpdate,
  mockedUserWrong,
} from "../../mocks";

describe("/users", () => {
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

  test("POST /users -  should be able to create a user ", async () => {
    const response = await request(app).post("/users/create").send(mockedUser);

    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user with the same email", async () => {
    const response = await request(app).post("/users/create").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users -  should not be able to create a user with wrong properties ", async () => {
    const response = await request(app)
      .post("/users/create")
      .send(mockedUserWrong);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /users -  should be able to list a user profile", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const response = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("phones");
    expect(response.body).toHaveProperty("contacts");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /users -  should not be able to list a user profile with wrong token", async () => {
    await request(app).post("/users/create").send(mockedUserDiferent);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);
    const response = await request(app)
      .get(`/users/profile/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users -  should be able to edit a user ", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const response = await request(app)
      .patch(`/users/update/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("PATCH /users -  should not be able to edit a user with wrong properties ", async () => {
    await request(app).post("/users/create").send(mockedUser);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const response = await request(app)
      .patch(`/users/update/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUserWrong);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /users -  should not be able to edit a user with wrong token", async () => {
    await request(app).post("/users/create").send(mockedUserDiferent);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);
    const response = await request(app)
      .patch(`/users/update/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`)
      .send(mockedUserWrong);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users -  should be able to delete a user", async () => {
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const response = await request(app)
      .delete(`/users/delete/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /users -  should not be able to delete a user  with wrong token", async () => {
    await request(app).post("/users/create").send(mockedUserDiferent);
    const userLogin = await request(app).post("/login/users").send(mockedlogin);
    const userLoginDiferent = await request(app)
      .post("/login/users")
      .send(mockedloginDiferent);
    const response = await request(app)
      .delete(`/users/delete/${userLogin.body.id}`)
      .set("Authorization", `Bearer ${userLoginDiferent.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
