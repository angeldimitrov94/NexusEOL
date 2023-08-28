import request from "supertest";
import { app } from "../../app";
import { body } from "express-validator";
import { UserAttrs } from "@testsequencer/common";

it("returns a 400 if null email is passed in", async () => {
    await request(app)
        .post("/api/auth/resetpassword")
        .send({email:null})
        .expect(400);
});

it("returns a 400 if null currentPassword is passed in", async () => {
    await request(app)
        .post("/api/auth/resetpassword")
        .send({currentPassword:null})
        .expect(400);
});

it("returns a 400 if null newPassword is passed in", async () => {
    await request(app)
        .post("/api/auth/resetpassword")
        .send({newPassword:null})
        .expect(400);
});

it("returns a 400 if empty email is passed in", async () => {
    await request(app)
        .post("/api/auth/resetpassword")
        .send({email:''})
        .expect(400);
});

it("returns a 400 if empty currentPassword is passed in", async () => {
    await request(app)
        .post("/api/auth/resetpassword")
        .send({currentPassword:''})
        .expect(400);
});

it("returns a 400 if empty newPassword is passed in", async () => {
    await request(app)
        .post("/api/auth/resetpassword")
        .send({newPassword:''})
        .expect(400);
});

it("returns a 400 if wrong current password is passed in", async () => {
    const email = "test@email.com";
    const password = "password";
    await request(app)
    .post("/api/auth/signup")
    .send({ email, password,})
    .expect(201);

    await request(app)
        .post("/api/auth/resetpassword")
        .send({email, currentPassword: 'abcdef', newPassword:'fedcba'})
        .expect(400);
});

it("returns a 200 if correct current password is passed in", async () => {
    const email = "test@email.com";
    const initialPassword = "password";
    await request(app)
    .post("/api/auth/signup")
    .send({ email, password: initialPassword})
    .expect(201);

    const newPassword = 'fedcba';
    await request(app)
        .post("/api/auth/resetpassword")
        .send({email, currentPassword: initialPassword, newPassword})
        .expect(200);
});
