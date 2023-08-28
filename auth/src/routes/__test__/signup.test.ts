import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return await request(app)
    .post("/api/auth/signup")
    .send({
      email: "alskdflaskjfd",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return await request(app)
    .post("/api/auth/signup")
    .send({
      email: "alskdflaskjfd",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@email.com",
    })
    .expect(400);

  await request(app)
    .post("/api/auth/signup")
    .send({
      password: "alskjdf",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);

  console.log(response.get("Set-Cookie"));

  expect(response.get("Set-Cookie")).toBeDefined();
  expect(response.get("Set-Cookie").length).toBe(1);
  
  const sessionValue = response.get("Set-Cookie")[0].split(";").filter(item => item.includes("session"))[0].split("=")[1];
  expect(sessionValue).not.toBe("");
});
