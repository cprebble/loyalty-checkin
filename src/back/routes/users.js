const throttle = require("lodash.throttle");
const Users = require("../models/users");
const Emailer = require("../services/emailer");
let logger, users, emailer;

const FIVE_MIN = 300000;

const commonEndHandler = function(err, msg, res) {
	if (err) {
		logger.error(err);
		res.status(err.status || err.statusCode || 500).send(err);
	}
	else {
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

const pointsMsg = (points) => `You have ${points} points.`;
const sendMail = (user) => {
	const newPointsText = pointsMsg(user.points);
	const amail = {
		from: "Loyalty Checkin Node App",
		to: user.email,
		subject: "Your updated loyalty points",
		text: newPointsText,
		html: `<b>${newPointsText}</b>`
	};
	emailer.sendMail(amail);
};

const findUser = async function (req, res) {
	try {
		const userphone = req.params.phone;
		const user = await users.findUser(userphone);
	
		if (user) {
			const updatedUser = await users.update(user);
			sendMail(updatedUser);
			commonEndHandler(null, updatedUser, res);

		} else {
			commonEndHandler(null, {}, res);
		}
			
	} catch (err) {
		logger.error(err);
		commonEndHandler(err, null, res);
	}
};
const throttledCheckin = throttle(findUser, FIVE_MIN, { "leading": true });

const addUser = async function(req, res) {
	const newUserObj = {
		phone: req.body["phone"],
		firstName: req.body["firstName"],
		lastName: req.body["lastName"],
		email: req.body["email"],
		points: 50,
		checkins: 1
	};
	try {
		const newUser = await users.addUser(newUserObj);
		commonEndHandler(null, newUser, res);
		
	} catch (err) {
		logger.error(err);
		commonEndHandler(err, null, res);
	}
	
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
	emailer = new Emailer(app);
	insertAdminUser();

	app.get("/users", findUsers);
	app.get("/users/:phone", throttledCheckin);
	app.post("/users", addUser);
	app.delete("/users/:phone", deleteUser);
};

// TOOD A user should not be allowed to check in more than once every five minutes.