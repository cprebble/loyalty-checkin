const Users = require("../models/users");
let logger, users;

const commonEndHandler = function(err, msg, res) {
	//res.set({ 'Content-Type': 'application/json' });
	if (err) {
		logger.error(err);
		res.status(err.status || err.statusCode || 500).send(err);
	}
	else {
		console.log("commoneendhangeler", msg)
		res.json(msg);
	}
};

const findUsers = async function (req, res) {
	try {
		const users = await users.findUsers();
		commonEndHandler(null, users, res);
	} catch (err) {
		commonEndHandler(err, null, res);
	}
};

const findUser = async function (req, res) {
console.log("finduser", req.params)
	try {
		const userphone = req.params.phone;
		const user = await users.findUser(userphone);
console.log("finduser found", user)
		commonEndHandler(null, user, res);
			
	} catch (err) {
		logger.error(err);
		commonEndHandler(err, null, res);
	}
};

const addUser = function(req, res) {

console.log("\n\nadduser", req.body)
	const newUserObj = {
		phone: req.body["phone"],
		firstName: req.body["firstName"],
		lastName: req.body["lastName"],
		email: req.body["email"],
		points: 50,
		checkins: 1
	};
	users.addUser(newUserObj, function(err, data) {commonEndHandler(err, data, res);});
};

const deleteUser = function(req, res) {
	const userid = req.params.phone;
	users.deleteUser(userid, function(err, data) {commonEndHandler(err, data, res);});
};

const insertAdminUser = async function() {
	try {
		let adminUser = await users.findUser("720-224-7446");
		if (!adminUser) {
			adminUser = {
				phone: "720-224-7446",
				firstName: "Carrie",
				lastName: "Prebble",
				email: "cprebble@comcast.net",
				points: 50,
				checkins: 1
			};
			await users.addUser(adminUser);
			logger.info("admin user added");
		}
	} catch(err) {
		logger.error(err);
	}
};

module.exports = function (app) {
	logger = app.locals.logger;
	users = new Users(app);
	app.locals.users = users;
	insertAdminUser();

	app.get("/users", findUsers);
	app.get("/users/:phone", findUser);
	app.post("/users", addUser);
	app.delete("/users/:phone", deleteUser);
};

// TOOD A user should not be allowed to check in more than once every five minutes.