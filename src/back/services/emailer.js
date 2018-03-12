const mailer = require("nodemailer");

const Emailer = function (app) {
	const { smtpUser, smtpPassword, smtpService } = app.locals.cfg;
	this.smtpPassword = smtpPassword;
	this.smtpUser = smtpUser;
	this.smtpService = smtpService;
	this.logger = app.locals.logger;

	this.smtpTransport = mailer.createTransport({
		service: smtpService,
		auth: {
			user: smtpUser,
			pass: smtpPassword
		}
	});
};

Emailer.prototype.sendMail = function(amail) {
	this.smtpTransport.sendMail(amail, function(error, response){
		if (error){
			this.logger.error(error);
		} else{
			this.logger.info("Message sent: " + JSON.stringify(response));
		}

		this.smtpTransport.close();
	});
};

module.exports = Emailer;