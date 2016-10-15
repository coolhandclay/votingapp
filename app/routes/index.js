'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	
	app.route('/')
		.get(clickHandler.showAll);
		
	app.route('/mypolls')
		.get(isLoggedIn, clickHandler.showMy);

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, clickHandler.getProfile);
		
	app.route('/create/poll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/create.html');
		})
		.post(isLoggedIn, clickHandler.addPoll);
		
	app.route('/poll/:id')
		.get(clickHandler.show)
		.post(clickHandler.addVote)
		.delete(clickHandler.delete);
		
	app.route('/poll/results/:id')
		.get(clickHandler.results);
		
	app.route('/api/polls')
		.get(clickHandler.getPolls);

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			if(req.user.github) {
				res.json(req.user.github);
			} else {
				res.json(req.user.facebook);
			}
		});
		
	app.route('/auth/facebook')
		.get(passport.authenticate('facebook', { scope: ['email']}));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
		
	app.route('/api/poll/:id')
		.get(clickHandler.getPoll);
		
	app.route('/delete')
		.get(clickHandler.deleteUsers);

};
