import request from "supertest";
import { app } from "../../app";

it("returns 401 if no user is signed in", async () => {
    await request(app)
        .get("/api/auth/signedin")
        .expect(401);
});

it("returns 200 and true if user is signed in", async () => {
    const cookie = await global.signin(false);
    return await request(app)
        .get("/api/auth/signedin")
        .set('Cookie', cookie)
        .send()
        .expect(200);
});