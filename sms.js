module.exports = function sms(){
var unirest = require("unirest");
var req = unirest("POST", "https://textbelt-sms.p.rapidapi.com/text");

req.headers({
	"x-rapidapi-host": "textbelt-sms.p.rapidapi.com",
	"x-rapidapi-key": "50c3507768mshd3e33ce09a430eap1fae7ajsnab00c9f6c026",
	"content-type": "application/x-www-form-urlencoded"
});

 req.form({
 	"message": "kudos on pissing away $0.15!",
 	"phone": "7206676039",
 	"key": "24e787aad7d2e7fabb976eba8c4bb9e30d9b21edsx7Z5kngDursHl2rCVvp5MzYd"
 });

req.then(function (res) {

	console.log(res.body.quotaRemaining);

	if (res.error) throw new Error(res.error);

});}