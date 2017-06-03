'use strict';

var polls= require('../models/poll.js');
var Users = require('../models/users.js');
var crypto=require('crypto');
function Poll (){
    
    
    this.Create=function(req,res){
        var options=req.query.option;
        var pollName=req.query.pollName;
        if (pollName.length<=30){
            if (optionLengthIsOk(options)){
                var id=crypto.createHash('sha1').update(req.query.pollName).digest('hex');
                polls.find({_id:id}).exec(function(err,result){
                    if (err){console.log(err)}
                    if (result[0]){
                        req.flash('error_msg',"This poll alredy exist");
                        res.redirect('/newPoll');
                    }
                    else{
                        if (isOk(pollName,options)){
                            JSONopt(id,pollName,options,req.query.color,req.user.info.userName).save(function (err, poll) {
                                if (err) {console.log(err)}
                                Users.findOneAndUpdate({'info.userName':req.user.info.userName},{$push:{'poll.pollCreated':id}}).exec(function(err,user){
                                    if (err) {console.log(err)}
                                    res.redirect('/pollAdded/'+id); 
                                });
            				});
                        }
                        else{
                            req.flash('error_msg',"You CAN'T use symbol");
                            res.redirect('/newPoll');
                        }
                    }
                });
            }
            else{
                req.flash('error_msg','You can use only 12 characters for the options');
                res.redirect('/newPoll');
            }
        }
        else{
                req.flash('error_msg',"You can use only 30 characters for the poll's name");
                res.redirect('/newPoll');
            }
    };
    
    this.showInfo=function(req,res){
        if (req.params.pollId!=0){
            polls.findOne({_id:req.params.pollId}).exec(function(err,data){
                if (err){console.log(err)}
                if (!polls){
                    res.send('No polls were found');
                }
                else{
                    var pollName=data.info.Name;
                    var user=req.user;
                    if(didVote(pollName,user.info.userName,user.poll.pollVoted)){
                        data['voted']=false;
                        res.json(data);
                    }
                    else {
                        if (user.poll.waitForValidation==pollName){
                            Users.findOneAndUpdate({'info.userName':user.info.userName},{$set:{'poll.waitForValidation':""}}).exec(function(err,user){
                                if (err){console.log(err)}
                                data['voted']=false;
                                res.json(data);
                            });    
                        }
                        else{
                            data['voted']=true;
                            res.json(data);
                        }  
                    }
                }
                    
            });
        }
        else{
            polls.find().exec(function(err,data){
                if (err){console.log(err)}
                var rdm=Math.floor(Math.random()*data.length);
                var pollName=data[rdm].info.Name;
                var user=req.user;
                if(didVote(pollName,user.info.userName,user.poll.pollVoted)){
                    data[rdm]['voted']=false;
                    res.json(data[rdm]);
                }
                else{
                    data[rdm]['voted']=true;
                    res.json(data[rdm]);
                }    
            });
        }     
    };
    
    
    this.Vote=function(req,res){
        var id=req.params.pollId.slice(0,req.params.pollId.length-1);
        var vote=req.params.pollId.slice(req.params.pollId.length-1,req.params.pollId.length);
        polls.findOne({_id:id,}).exec(function(err,poll){
            if (err) throw err;
            var pollName=poll.info.Name;
            var user=req.user;
            var userName=user.info.userName;
            if (didVote(pollName,userName,req.user.poll.pollVoted)){
                polls.findOneAndUpdate({_id:id,'info.options.option':vote},{$inc:{'info.options.$.nbrVote':1,'info.totalVote':1},$push:{'who.vote':[req.user.info.userName,new Date(),vote]}})
                    .exec(function(err,data){
                        if (err)throw err;
                        Users.findOneAndUpdate({'info.userName':userName},{$push:{'poll.pollVoted':{pollName:data.info.Name,optionNbr:vote,pollId:id}},$set:{'poll.waitForValidation':pollName}}).exec(function(err,doc){
                            if (err){throw err;}
                            res.end();
                        });
                    });
            }
            else{
                res.end();
            }
        });
    };
    
    
    this.RecenteAndMost=function(req,res){
        polls.find().exec(function(err,data){
            if (err) throw err;
            if (!data[0]){
                res.send('error: No polls');
            }
            else{
                res.json(Ordered(data));
            }
            
        });
    };
    
    this.getPollCreated=function(req,res){
        var userName=req.user.info.userName;
        var pollName=[];
        var pollId=[];
        var nbrVote=[];
        var count=req.params.count;
        polls.find({'who.made.userName':userName}).exec(function(err,data){
            if (err)throw err;
            var resLength=10;
            var end=false;
            if (data.length<count*10){
                resLength=data.length-(count-1)*10;
                end=true;
            }
            for (var i=0;i<resLength; i++){
                pollName.push(data[i+(count-1)*10].info.Name);
                pollId.push(data[i+(count-1)*10]._id);
                nbrVote.push(data[i+(count-1)*10].info.totalVote);
            }
            
            res.json({pollName:pollName,pollId:pollId,nbrVote:nbrVote,end:end});
            
        });
    };
    
    this.getPollVoted=function(req,res){
        var userName=req.user.info.userName;
        var pollName=[];
        var pollId=[];
        var nbrVote=[];
        var stop=Number(req.params.stop);
        var count=0;
        polls.find().exec(function(err,data){
            if (err)throw err;
            var end=true;
            for (var i=data.length-stop-1; i>=0;i--){
                for (var j=0;j<data[i].who.vote.length;j++){
                    if (data[i].who.vote[j][0]==userName){
                        pollName.push(data[i].info.Name);
                        pollId.push(data[i]._id);
                        nbrVote.push(data[i].info.totalVote);
                        count++;
                        
                        console.log(i);
                        break;
                    }
                }
                stop++;
                if (count==10){
                    end=false;
                    break;
                }
            }
            res.json({pollName:pollName,pollId:pollId,nbrVote:nbrVote,end:end,Stop:stop});
        });
        
    };
    
    this.getAllPoll=function(req,res){
        var pollName=[];
        var pollId=[];
        var pollCreator=[];
        var nbrVote=[];
        var count=req.params.count;
        polls.find().exec(function(err,data){
            if (err){console.log(err)}
            var resLength=10;
            var end =false;
            if (data.length<count*10){
                resLength=data.length-(count-1)*10;
                end =true;
            }
            for (var i=0;i<resLength;i++){
                pollName[i]=data[i+(count-1)*10].info.Name;
                pollId[i]=data[i+(count-1)*10]._id;
                pollCreator[i]=data[i+(count-1)*10].who.made.userName;
                nbrVote[i]=data[i+(count-1)*10].info.totalVote;
            }
            res.json({pollName:pollName,pollId:pollId,pollCreator:pollCreator,nbrVote:nbrVote,end:end});
        });
    };
    
    function optionLengthIsOk(optionArray){
        for (var i=0; i<optionArray.length;i++){
            if (optionArray[i].length>15){
                return false;
            }
        }
        return true;
    }
    
    function JSONopt (id,pollName,OptionArray,OptionColor,userName){
        var jsonOpt=[];
        var count=0;
        for (var i=0;i<OptionArray.length;i++){
            if (OptionArray[i]!=""){
            jsonOpt.push({option:i,name:OptionArray[i],color:OptionColor[i],nbrVote:0});
            count++;
            }
        }
        var jsonPoll=new polls({_id:id,
                        info:{Name:pollName,
                            options:jsonOpt,
                            optionNbr:count,
                            totalVote:0,
                            when:new Date().getTime()}
                        ,who:{made:{userName:userName}
                            }
        
                        });
        return jsonPoll;
    }
    function isOk(pollName,OptionArray){
        var pollInfo=pollName;
        for (var i=0;i<OptionArray.length;i++){
            pollInfo+=OptionArray[i];
        }
        for (var j=0;j<pollInfo.length;j++){
            if (pollInfo[j]=="["||pollInfo[j]=="]"||pollInfo[j]=="+" ||pollInfo[j]=="-"||pollInfo[j]=="="||pollInfo[j]=="/"||pollInfo[j]=="\\"||pollInfo[j]=="("||pollInfo[j]=="§"||pollInfo[j]==")"||pollInfo[j]=="{"||pollInfo[j]=="¶"||pollInfo[j]=="}"||pollInfo[j]=="<"||pollInfo[j]==">"||pollInfo[j]=="\""){
                return false;
            }
        }
        return true;
    }
    function Ordered(data){
        var indexR=[0];
        var indexM=[0];
        var date=[data[0].info.when];
        var totVot=[data[0].info.totalVote];
        for (var i=1; i<data.length;i++){
            var countR=0;
            var countM=0;
            for (var j=0;j<date.length;j++){
                if (data[i].info.when>date[j]){
                    date.splice(j,0,data[i].info.when);
                    indexR.splice(j,0,i);
                    break;
                }
                else{
                    countR++;
                }
                
            }
            for (var j=0;j<totVot.length;j++){
                if (data[i].info.totalVote>totVot[j]){
                    totVot.splice(j,0,data[i].info.totalVote);
                    indexM.splice(j,0,i);
                    break;
                }
                else{
                     countM++;
                }
            }
            if(countR==date.length&&date.length<=5){
                date.splice(date.length,data[i].info.when);
                indexR.splice(date.length,0,i);
                
            }
            if(countM==totVot.length&&totVot.length<=5){
                totVot.splice(totVot.length,0,data[i].info.totalVote);
                indexM.splice(totVot.length,0,i);
            }
            
        }
        var RecentPollArray=[];
        var MostVotedPolArray=[];
        var length=5;
        if (date.length<5){
            length=date.length;
        }
        for (var i=0; i<length;i++){
            RecentPollArray[i]=[data[indexR[i]].info.Name,data[indexR[i]]._id,data[indexR[i]].info.when];
            MostVotedPolArray[i]=[data[indexM[i]].info.Name,data[indexM[i]]._id,data[indexM[i]].info.totalVote];
        }
        var jsonOrder={Recent:RecentPollArray,Most:MostVotedPolArray};
        return jsonOrder;
    }

    function didVote(pollName,userName,userPolls){
        for (var i=0;i<userPolls.length;i++){
            if(pollName==userPolls[i].pollName&&userName!=='Starter'){
                return false;
            }
        }
        return true;
    }

}
module.exports=Poll;