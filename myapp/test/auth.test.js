const app = require("../app");
const request = require("supertest");
const expect = require("expect");

it('should /cabinet/get_groups 401', async ()=> {
    const res = await request(app).get("/cabinet/get_groups");
    expect(res.status).toBe(401);
});

it('should /cabinet/create_group 401', async ()=> {
    const res = await request(app).post("/cabinet/create_group");
    expect(res.status).toBe(401);
});

it('should /cabinet/addUser 401', async ()=> {
    const res = await request(app).post("/cabinet/addUser");
    expect(res.status).toBe(401);
});