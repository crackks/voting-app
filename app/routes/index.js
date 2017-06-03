'use strict';

var path = process.cwd();
var poll= require (path+'/app/controllers/poll.server.js');
var User=require (path+ '/app/controllers/user.server.js');
module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
	
		if (req.isAuthenticated()) {
			return next();
		} else {
			if(req.url!='/'){
				req.flash('error_msg','You are not logged in');
			}
			res.redirect('/login');
		}
	}

	var Poll=new poll();
	var user= new User();
	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/myindex.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.render('myLogin');
		});
		
	
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/myProfile.html');
		});
	
	app.route('/newPoll')
		.get(isLoggedIn,function (req, res) {
			res.render('newPoll');
		});
	app.route('/myPolls')
		.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/myPolls.html');
		});
		
	app.route('/CreateNewPoll?:q')
		.get(isLoggedIn,Poll.Create);
	
	app.route('/rdmPoll')
		.get(isLoggedIn,function(req,res){
			res.sendFile(path+'/public/ramdomPoll.html');
		});
		
	app.route('/pollAdded/:pollId')
		.get(isLoggedIn,function(req,res){
			res.sendFile(path+'/public/pollAdded.html');
		});
	app.route('/api/:id')
		.get(isLoggedIn, user.getProfile);

		
	app.route('/pollAdded/:pollId/info')
		.get(isLoggedIn,Poll.showInfo)
		.post(isLoggedIn,Poll.Vote);	
		
	app.route('/poll/:pollId/info')
		.get(isLoggedIn,Poll.showInfo)
		.post(isLoggedIn,Poll.Vote);
		
	app.route('/api')
		.get(isLoggedIn,Poll.RecenteAndMost);
		
	app.route('/poll/:pollId')
		.get(isLoggedIn,function(req,res){
			res.sendFile(path+'/public/poll.html');
		});
		
		
	app.route('/sign?:q')
		.post(user.signUp);
		
	app.route('/log?:q')
		.post(passport.authenticate('local',{
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash:true
		}));
	
	app.route('/myPollCreated/:count')
		.get(isLoggedIn,Poll.getPollCreated);
		
	app.route('/myPollVoted/:stop')
		.get(isLoggedIn,Poll.getPollVoted);
		
		
	app.route('/allPolls')
		.get(isLoggedIn,function(req,res){
			res.sendFile(path+'/public/allPolls.html');
		});
		
	app.route('/allPollCreated/:count')
		.get(isLoggedIn,Poll.getAllPoll);
};
