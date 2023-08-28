import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const signoutResponse = await request(app)
    .post("/api/auth/signout")
    .send({})
    .expect(200);

  expect(signoutResponse.get("Set-Cookie")).toBeDefined();
  expect(signoutResponse.get("Set-Cookie").length).toBe(1);
  
  const sessionValue = signoutResponse.get("Set-Cookie")[0].split(";").filter(item => item.includes("session"))[0].split("=")[1];
  expect(sessionValue).toEqual("");
});
