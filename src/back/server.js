const path = require("path");
const express = require("express");
const errorhandler = require("errorhandler");
const compression = require("compression");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const publicFolder = path.resolve(__dirname, "../../");

const config = require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(function (req, res, next) {
    //no caching
	res.setHeader("Cache-Control", "private, max-age=0, no-cache, no-store");
	res.setHeader("Expires", 0);
	res.setHeader("Pragma", "no-cache");
	return next();
});

const retrySecs = 5000;
const connectWithRetry = async function (mongodb_url, databaseName, times) {
	return await (async function retry () {
		times--;
		try {
			const client = await MongoClient.connect(mongodb_url);
			const db = client.db(databaseName);
			return db;

		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(`Failed to connect to ${mongodb_url} on startup - retrying in ${retrySecs} secs`, err);
			if (times > 0) {
				setTimeout(retry, retrySecs);
			} 
			else {
				process.exit(1);
			}
		}
	})();
};

const startServer = async function (config) {
	const { PORT, MONGODB_URL, databaseName, userCollection } = config;
	const ENV_MONGO_URL = process.env.MONGODB_URL || MONGODB_URL;


	const log = require("./utils/logger");
	const logger = log(config);
	app.locals.logger = logger;
	app.locals.cfg = config;

	try {
		const db = await connectWithRetry(ENV_MONGO_URL, databaseName, 4);
		await db.collection(userCollection).createIndex(
			{ "phone": 1 },
			{ unique: true }
		);
		app.locals.db = db;
		logger.info("connected to mongo at ", ENV_MONGO_URL);
		
	} catch (e) {
		logger.error(e);
		// eslint-disable-next-line no-console
		console.error(getStackTraceFromError(e));
	}

	app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

	app.use("/", express.static(publicFolder));
	app.get(["/", "/new-user"], (req, res) => {
		res.sendFile(path.resolve(publicFolder, "index.html"));
	});

	const userRoutes = require("./routes/users");
	userRoutes(app);

	app.use(errorhandler({ dumpExceptions: true, showStack: true }));

	app.listen(PORT, () => logger.debug(`Listening on :${PORT}`));
};


startServer(config.parsed);

const exitHandler = function(err) {
	// eslint-disable-next-line no-console
	if (err) console.log("exitHandler err: " + err.stack);
	process.exit();
};

//do something when app is closing
process.on("exit", function() {
	exitHandler();
});

//catches ctrl+c event
process.on("SIGINT", function() {
	exitHandler();
});

process.on("SIGTERM",function(){
	exitHandler();
});

//catches uncaught exceptions
process.on("uncaughtException", function(err) {
	exitHandler(err);
});

function getStackTraceFromError(err) {
	const stack = (err && err.stack) || "";
	return stack.split("\n");
}

// TODO: styling, email, docker, tests