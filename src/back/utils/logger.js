const bunyan = require("bunyan");

const createLogger = (cfg) => {
	return bunyan.createLogger({
		name: "loyalty-checkin-exercise-logger",
		src: true,
		streams: [
			{
				id: "stdout",
				stream: process.stdout,
				level: cfg.logLevel || "debug"
			},
			{
				id: "rotatingFile",
				type: "rotating-file",
				period: "1d",
				//period: '1d',   // daily rotation
				count: 3,        // keep 3 back copies
				path: "./logfile.log"  // log debug and above to a file
			}
			
		],
		serializers: bunyan.stdSerializers
	});
};

module.exports = function(cfg) {
	const logger = createLogger(cfg);
	return logger;
};