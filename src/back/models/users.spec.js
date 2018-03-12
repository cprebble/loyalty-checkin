import { assert } from "chai";
import Users from "./users";

describe("users", () => {
	it("finds user", async () => {
		const testPhone = "555-0505";
		const testUser = {
			firstName: "Juan",
			lastName: "Pierre",
			phone: testPhone,
			email: "juan.pierre@email.com",
			points: 50,
			checkins: 1
		};
		const testApp = {
			locals: {
				logger: {
					error: () => {}
				},
				cfg: {
					userCollection: "testusercollection"
				},
				db: {
					collection: () => {
						return {
							find: () => {
								return {
									toArray: () => {
										return [testUser];
									}
								};
							}
							
						};
					}
				}
			}
		};

		const users = new Users(testApp);
		const foundUser = await users.findUser(testPhone);

		assert.isOk(foundUser);
		assert.equal(foundUser.phone, testPhone);
	});
});