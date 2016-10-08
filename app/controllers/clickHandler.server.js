'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {
	
	this.delete = function (req, res, next) {
		Polls
			.findOneAndRemove({ '_id' : req.params.id }, function (err, result) {
				if(err) {console.error("handler error: " + err);}
				console.log('removed poll');
				res.redirect('/');
			});
	};
	
	this.results = function (req, res) {
		Polls
			.findOne({ '_id' : req.params.id })
			.exec(function (err, result) {
				if(err) {console.err(err);}
				res.render('results', { result: result, isLoggedIn: req.isAuthenticated() });
			});
	};
	
	this.addVote = function (req, res) {
		var id = req.params.id;
		Polls
			.findOne({ '_id' : id }, function(err, result) {
				if(err) console.error(err);
				var pos = result.options.map(function(e) { return e.name }).indexOf(req.body.name);
				var toIncrease = result.options[pos].votes;
				result.options[pos].votes = toIncrease + 1;
				result.save(function (err) {
        			if(err) {console.error(err);}
        			res.redirect('/poll/results/' + id);
				});
    		});
	};
	
	this.showMy = function (req, res) {
		Polls
			.find({ 'createdBy' : req.user.github.username})
			.exec(function (err, polls) {
				if (err) { throw err; }
				res.render('polls', {polls: polls, isLoggedIn: req.isAuthenticated() });
			 });
	};
	
	this.showAll = function (req, res) {
		Polls
			.find({}).sort({ '_id' : -1 })
			.exec(function (err, polls) {
				if (err) { throw err; }
				res.render('polls', { polls: polls, isLoggedIn: req.isAuthenticated() });
			});
	};
	
	this.show = function(req, res) {
		Polls
			.findOne({'_id': req.params.id})
			.exec(function(err, poll) {
				if(err) throw err;
				res.render('poll', { poll: poll, isLoggedIn: req.isAuthenticated() });
			});
	};

	this.getPolls = function (req, res) {
		Polls
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	
	this.addPoll = function(req, res) {
		var poll = new Polls();
		poll.name = req.body.question;
		poll.createdBy = req.user.github.username;
		poll.options = req.body.options.map(function(option) {
			var output = { name: option, votes: 0 };
			return output;
		});
		
		poll.save(function(err) {
			if(err) console.error(err);
		});
		res.redirect('/');
	};
	
	this.getPoll = function(req, res) {
		var id = req.params.id;
		Polls
			.findOne({ '_id' : id })
			.exec(function(err, result) {
				if(err) { throw err; }
				
				res.json(result);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, {'myPolls.polls': []})
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.myPolls);
				}
			);
	};

}

module.exports = ClickHandler;
