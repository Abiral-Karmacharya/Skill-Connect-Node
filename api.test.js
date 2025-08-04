const request = require("supertest");
require("dotenv").config();
const path = require("path");

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

// open API test
// authenticate API test

// describe("open API test without middleware", () => {
//   const uniqueUserName = `testuser${Date.now()}`;
//   const uniqueEmail = `noimage${Date.now()}@gmail.com`;
//   it("Should create a new user", async () => {
//     const res = await request(BASE_URL)
//       .post("/user/signup")
//       .set("Content-Type", "application/json") // optional, Supertest sets it automatically with .send()
//       .send({
//         name: "user3", // use lowercase keys as your controller expects
//         email: "user3@gmail.com",
//         password: "user3",
//         role: "user",
//       });

//     console.log(res.body);
//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toEqual("user created");
//     expect(res.body.newuser).toHaveProperty("UserID");
//     expect(res.body.newuser.Name).toEqual(uniqueUserName);
//     expect(res.body.newuser.Email).toEqual(uniqueEmail);
//   });
// });
//   it("Should login to user", async () => {
//     const res = await request(BASE_URL)
//       .post("/user/login")
//       .set("Content-Type", "application/json")
//       .send({
//         email: uniqueEmail,
//         password: "user1",
//       });
//     console.log(res.body);
//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toEqual("Login successful");
//   });

//   it("should update the data of user", async () => {
//     const res = await request(BASE_URL)
//       .put("/user/updateuser")
//       .set("Content-Type", "application/json")
//       .send({
//         name: uniqueUserName,
//         email: uniqueEmail,
//         password: "user1",
//       });
//     console.log(res.body);
//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toEqual("Updated successfully");
//   });

//   // it("delete user", async () => {
//   //   const res = await request(BASE_URL)
//   //     .delete("/user/deleteuser")
//   //     .set("Content-Type", "application/json");

//   //   console.log(res.body);
//   //   expect(res.body.success).toBe(true);
//   //   expect(res.body.message).toEqual("User deleted");
//   // });

//   it("should get info about service", async () => {
//     const res = await request(BASE_URL)
//       .post("/user/service")
//       .set("Content-Type", "application/json")
//       .send({
//         expertId: 25,
//         projectTitle: "project 1",
//         projectDescription: "project 1",
//         budget: 1234,
//         requirements: "hi",
//       });
//     console.log(res.body);
//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toEqual("Service created");
//   });

//   it("should get info about logs", async () => {
//     const res = await request(BASE_URL)
//       .get("/user/getlogs")
//       .set("Content-Type", "application/json");

//     console.log(res.body);
//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toEqual("Logs retrieved");
//   });
// });

describe("open API test with middleware", () => {
  let authToken = "";
  const userCredentials = {
    email: "user3@gmail.com",
    password: "user3",
  };

  beforeAll(async () => {
    const loginRes = await request(BASE_URL).post("/user/login").send({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    authToken = loginRes.body.token;
  });
  console.log("auth token", authToken);

  it("should update user", async () => {
    const res = await request(BASE_URL)
      .put("/user/updateuser")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "user3",
        email: "user3@gmail.com",
        password: "user3",
      });

    console.log(res.body);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("Updated successfully");
  });

  it("should get user", async () => {
    const res = await request(BASE_URL)
      .get("/user/getuser")
      .set("Authorization", `Bearer ${authToken}`);

    console.log(res.body);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("User found");
  });

  it("should get service", async () => {
    const res = await request(BASE_URL)
      .post("/user/service")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        projectTitle: "project 1",
        projectDescription: "project 1",
        Requirements: "Project 1",
        budget: 10000,
        expertId: 1,
      });

    console.log(res.body);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("User found");
  });

  it("should get info about logs", async () => {
    const res = await request(BASE_URL)
      .get("/user/getlogs")
      .set("Authorization", `Bearer ${authToken}`);

    console.log(res.body);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("Logs retrieved");
  });
});
