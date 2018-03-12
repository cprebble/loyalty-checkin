const mailer = require("nodemailer");

const Emailer = function (app) {
	const { smtpUser, smtpPassword } = app.locals.cfg;
	this.smtpPassword = smtpPassword;
	this.smtpUser = smtpUser;
	this.logger = app.locals.logger;

	// Use Smtp Protocol to send Email
	this.smtpTransport = mailer.createTransport({
		service: "gmail",
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