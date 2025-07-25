const request = require("supertest");
require("dotenv").config();
const path = require("path");

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

// open API test
// authenticate API test

describe("open API test", () => {
  it("Should create a new user", async () => {
    const uniqueUserName = `testuser${Date.now()}`;
    const uniqueEmail = `noimage${Date.now()}@gmail.com`;

    const res = await request(BASE_URL)
      .post("/user/createuser")
      .field("username", uniqueUserName)
      .field("email", uniqueEmail)
      .field("/password", "user1")
      .field("/PhoneNumber", 89840288)
      .field("/Location", "hi")
      .field("/Bio", "THis is bio")
      .field("/RoleID", 1);
  });

  console.log(res.body);
  expect(res.body.success).toBe(true);
});
