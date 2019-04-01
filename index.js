const mongoose = require('mongoose');
const async = require('async');
const ObjectId = mongoose.Schema.Types.ObjectId;
const ACCOUNTS_TO_FOLLOW = require('./accountsToFollow');
const dotenv = require('dotenv').config();
mongoose.connect('mongodb://localhost/twitterUserRecorder');

var CronJob = require('cron').CronJob;

const Twit = require('twit');
const Twitter = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const twitterUserSchema = new mongoose.Schema({
	id: ObjectId,
	screenName: {
		type: String,
		required: true,
	},
	twitterId: {
		type: Number,
		required: true,
	},
	createdAt: Date,
	rawData: Object
});

const TwitterUser = mongoose.model('TwitterUser', twitterUserSchema);

const MAX_PARALLEL_API_CALL = 15;

let i = 1;
new CronJob('*/20 * * * *', function() {
	console.log(`Start job ${i}`);
	
	async.eachLimit(ACCOUNTS_TO_FOLLOW, MAX_PARALLEL_API_CALL, fetchAndSaveUser, function(err, results) {
		console.log(`--> Job ${i++} done!`);
		console.log();
	});
}, null, true, 'Europe/Paris');

function fetchAndSaveUser(userName, cb) {
	console.log(`\t${userName}`);

	Twitter.get('users/show', { screen_name: userName } , function(error, user, response) {
		if (error) {
			return console.error(error);
		}

		TwitterUser.create({
			twitterId: user.id,
			screenName: user.screen_name,
			rawData: user,
			createdAt: new Date(),
		}).then(() => {
			cb();
		})
		.catch(console.error);
	});
}
