
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
			return msg;
		}
		return user;

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
			return msg;
		}
		else {
			const msg = makeUserMsg(existingUser.phone, "already exists.");
			logger.debug({ user: existingUser.phone }, msg);
			return existingUser;
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