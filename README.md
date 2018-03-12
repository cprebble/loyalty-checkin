# Loyalty Checkin Exercise

A NodeJS project that allows a user to enter a phone number and if recognized, shows how many times the user has checked in and how many loyalty points the user has, and sends the user an email showing point total. First time users shall enter first and last name and email address.

## The problem:
* Upon loading the page I just want an input that will allow me to enter a valid phone number.
* If the phone number is not recognized present the user with a form that allows them to enter their first name, last name and email address.  
* Upon submission and once the user is registered I’d like for you to show a success page that shows me the balance of how many points I have.  
** A new user should earn 50 points for their first checkin.  A returning user should only earn 20. 
** Upon successfully checking in a user should be shown how many times they’ve checked in and what their point total is.  
** A user should not be allowed to check in more than once every five minutes.  
** The user should be sent an email with the points total after each check-in.  
** I know this position is not about UI/UX but any effort you put into UI/UX will be noted and appreciated.  

## Solution Description

How to run this solution locally: (given Git, NodeJS, NPM/yarn are installed)

+ git clone https://github.com/cprebble/loyalty-checkin.git
+ run ```yarn``` or ```npm install```
+ add SMTP service, user and password to .env file
+ run ```yarn build``` or ```npm run build```
+ run ```yarn local``` or ```npm run local```
+ in a browser navigate to http://localhost:8080

## TODO
* notify user when checkin is throttled
* more tests
