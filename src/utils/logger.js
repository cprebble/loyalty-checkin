const bunyan = require("bunyan");

const createLogger = (cfg) => {
	return bunyan.createLogger({
		name: "loyalty-checkin-exercise-logger",
		src: true,
		streams: [{
			stream: process.stdout,
			level: cfg.logLevel || "debug"
		}],
		serializers: bunyan.stdSerializers
	});
};

module.exports = function(cfg) {
	const logger = createLogger(cfg);
	return logger;
};