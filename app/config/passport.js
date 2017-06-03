'use strict';
var path = process.cwd();
var LocalPassport=require("passport-local").Strategy;
var Users=require (path+ '/app/controllers/user.server.js');
var User=new Users;

module.exports = function (passport) {
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.getById(id, function(err, user) {
    		done(err, user);
		});
	});

	passport.use(new LocalPassport(
		function(username, password, done) {
	    	User.getByUserName(username,function(err,user){
	    		if (err) throw err;
	    		if (!user){
	    			console.log('not user')
	    			return done(null,false,{message:'Unknown User'});
	    		}
	    		User.verifyPassword(password,user.info.Password,function(err,match){
	    			if (err) throw err;
	    			if(match){
	    				return done(null,user);
	    			}	
	    			else{
	    				console.log('not possword')
	    				return done(null,false,{message:'Invalid Password'});
	    			}
	    		});
			});
		}
	));
};
