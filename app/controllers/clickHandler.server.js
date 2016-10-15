'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {
	
	this.getProfile = function (req, res) {
		var profile;
		if(req.user.github.id) {
			profile = req.user.github;	
		} else {
			profile = req.user.facebook;
		}
		res.render( 'profile', {profile: profile, githubLogin: req.user.github.id} );
	};
	
	this.delete = function (req, res, next) {
		Polls
			.findOneAndRemove({ '_id' : req.params.id }, function (err, result) {
				if(err) {console.error("handler error: " + err);}
				res.redirect('/');
			});
	};
	
	this.results = function (req, res) {
		Polls
			.findOne({ '_id' : req.params.id })
			.exec(function (err, result) {
				if(err) {console.error(err);}
				res.render('results', { result: result, request: req });
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
		Polls.find({ 
			"$or": [ 
				{ 'createdBy' : req.user.github.username },
				{ 'createdBy' : req.user.facebook.username } 
				]})
			.exec(function (err, polls) {
				if (err) { throw err; }
				res.render('polls', {polls: polls, request: req });
			 });
	};
	
	this.showAll = function (req, res) {
		Polls
			.find({}).sort({ '_id' : -1 })
			.exec(function (err, polls) {
				if (err) { throw err; }
				res.render('polls', { polls: polls, request: req });
			});
	};
	
	this.show = function(req, res) {
		Polls
			.findOne({'_id': req.params.id})
			.exec(function(err, poll) {
				if(err) throw err;
				res.render('poll', { poll: poll, request: req });
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
		if(req.user.github.username) {
			poll.createdBy = req.user.github.username;
		} else {
			poll.createdBy = req.user.facebook.username;
		}
		
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
	
	this.deleteUsers = function(req, res) {
        Users
            .remove({})
            .exec(function(err) {
                if(err) console.error(err);
            });
    };

}

module.exports = ClickHandler;
