import { Knex } from "knex";
import { KnexContainer } from "../../knex";
import { UserService } from "./record.service";

let knex: Knex;
let userService: UserService;

beforeAll(async () => {
  let knexContainer = new KnexContainer();
  knex = knexContainer.createKnex();
  await knex.migrate.latest();
});
afterAll(async () => {
  await knex.destroy();
});

beforeEach(() => {
  userService = new UserService(knex);
});

describe("/register.html", () => {
  beforeAll(async () => {
    await knex("employee").where({ username: "testuser99" }).delete();
  });

  //  it('should return user id', async () => {
  //    let json = await userService.register({
  //      employeeName: 'admin2',
  //      password: 'admin2',
  //    })
  //    expect(json).toBeDefined()
  //    expect(typeof json.id).toBe('number')
  //  })

  it("should reject with register with existing username", async () => {
    expect(
      userService.register({
        employeeName: "admin1",
        email: "admin1@tecky.com",
        password: "admin1",
        phoneNumber: "12344444",
        role: "admin",
        hireDate: new Date("2023-05-05"),
        storeId: "1",
      })
    ).rejects.toThrow("Duplicate Username");
  });
});
