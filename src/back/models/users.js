const POINTS_UPDATED = 20;
const Users = function (app) {
	this.logger = app.locals.logger;
	this.userCollection = app.locals.cfg.userCollection;//"loyaltyUsers";
	this.db = app.locals.db;
};

Users.prototype.findUser = async function (userphone) {
	try {
		const collection = this.db.collection(this.userCollection);
		const user = await collection.find({ phone: userphone }).toArray();

		if (user.length < 1) {
			const msg = makeUserMsg(userphone, "does not exist.");
			this.logger.info(msg);
			return;
		}
		return user[0];

	} catch (err) {
		this.logger.error(err);
		return err;
	}
};

Users.prototype.findUsers = async function (){
	const collection = this.db.collection(this.userCollection);
	try {
		return await collection.find({}, {"sort": [["lastName", "asc"]]}).toArray();
	} catch (err) {
		this.logger.error(err);
		return err;
	}
};

Users.prototype.addUser = async function (newUserObj) {
	const logger = this.logger;
	const collection = this.db.collection(this.userCollection);
	try {
		const existingUser = await collection.find({ phone: newUserObj.phone }).toArray();
		if (existingUser.length < 1) {
			await collection.insert(newUserObj);
			const msg = makeUserMsg(newUserObj.phone, "added.");
			logger.info({ user: newUserObj.phone }, msg);
			const newUser = await collection.find({ phone: newUserObj.phone }).toArray();
			return newUser[0];
		}
		else {
			const msg = makeUserMsg(newUserObj.phone, "already exists.");
			logger.debug({ user: newUserObj.phone }, msg);
			return existingUser[0];
		}
	} catch (err) {
		logger.error(err);
		return err;
	}
};

Users.prototype.update = async function (userObj) {
	const logger = this.logger;
	const collection = this.db.collection(this.userCollection);

	try {
		const existingUsers = await collection.find({ phone: userObj.phone }).toArray();
		if (existingUsers.length < 1) {
			const msg = makeUserMsg(userObj.phone, "not found to update.");
			logger.error({ user: userObj.phone }, msg);
			return msg;
		}
		else {
			const existingUser = existingUsers[0];
			const newCheckins = existingUser.checkins + 1;
			const newPoints = existingUser.points + POINTS_UPDATED;

			await collection.update(
				{ phone: userObj.phone },
				{ $set: { checkins : newCheckins, points: newPoints } });
			const updatedUser = await collection.find({ phone: userObj.phone }).toArray();

			const updateMsg = `updated with ${newCheckins} checkins and ${newPoints} points`;
			
			const msg = makeUserMsg(existingUser.phone, updateMsg);
			logger.info({ user: updatedUser.phone }, msg);
			return updatedUser[0];
		}
	} catch (err) {
		logger.error(err);
		return err;
	}
};

Users.prototype.deleteUser = async function(userphone) {
	const collection = this.db.collection(this.userCollection);
	await collection.remove({ phone : userphone.toLowerCase() });
	return makeUserMsg(userphone, "has been deleted.");
};

module.exports = Users;

const makeUserMsg = (phone, msg) => `User with phone ${phone} ${msg}`;