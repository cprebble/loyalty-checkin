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
	const self = this;
	this.smtpTransport.sendMail(amail, function(error, response){
		if (error){
			self.logger.error(error);
		} else{
			self.logger.info("Message sent: " + JSON.stringify(response));
		}

		self.smtpTransport.close();
	});
};

module.exports = Emailer;