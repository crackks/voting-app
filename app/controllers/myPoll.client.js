'use strict';
    
window.onload = function(){
   
    var apiCreatedPoll=window.location.origin+'/myPollCreated/1';
    var apiVotedPoll=window.location.origin+'/myPollVoted/0';
    var pollCreatedBlock=document.querySelector('#dispPollCreated');
    var pollVotedBlock=document.querySelector('#dispPollVoted');
    var showPollCreated=document.querySelector('.pollCreated');
    var unshowPollsCreated=document.querySelector('#pollCreated')
    var showPollVoted=document.querySelector('.pollVoted');
    var unshowPollsVoted=document.querySelector('#pollVoted')
    var moreCreate=document.querySelector('#moreCreate');
    var moreVote=document.querySelector('#moreVote');
    var moreCreateContainer=document.querySelector('#moreCreateContainer');
    var moreVoteContainer=document.querySelector('#moreVoteContainer')
    
    var count=1;
    var stop=0;
    
    showPollCreated.addEventListener('click',function(){
        unshowPollsVoted.style.display='block';
        unshowPollsCreated.style.display='none';
    });
    
    showPollVoted.addEventListener('click',function(){
        unshowPollsCreated.style.display='block';
        unshowPollsVoted.style.display='none';
        
    });
    
    
    
    function showPollCreate(data){
        count++;
        var showPm=JSON.parse(data);
        for (var i=0;i<showPm.pollName.length;i++){
            var ref='/poll/'+showPm.pollId[i];
            ref=ref.toString();
            var txt="<div class='RecentPolls'><a class='pollTitle' href=" + ref + " >" + showPm.pollName[i]+ '</a> <p class="recent">            '+'  '+'       '+DispVot(showPm.nbrVote[i])+"</p></div>";
            txt=txt.toString();
            pollCreatedBlock.insertAdjacentHTML('beforeend', txt);
            
        }
        if (showPm.end){
            moreCreateContainer.style.display='none';
        }
    }
    
    function showPollVote(data){
        var showPmV=JSON.parse(data);
        stop=showPmV.Stop;
        for (var i=0;i<showPmV.pollName.length;i++){
            var ref='/poll/'+showPmV.pollId[i];
            ref=ref.toString();
            var txt="<div class='RecentPolls'><a class='pollTitle' href=" + ref + " >" + showPmV.pollName[i]+ '</a> <p class="recent">            '+'  '+'       '+DispVot(showPmV.nbrVote[i])+"</p></div>";
            txt=txt.toString();
            pollVotedBlock.insertAdjacentHTML('beforeend', txt);
            
        }
        if (showPmV.end){
            moreVoteContainer.style.display='none';
        }
    }
    
    function DispVot(number){
        if (number<=1){
            return number +'Vote'
        }
        else{
            return number +'Votes'
        }
    }
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiVotedPoll, showPollVote));
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiCreatedPoll, showPollCreate));
    
    moreCreate.addEventListener('click',function(){
        apiCreatedPoll=window.location.origin+'/myPollCreated/'+count;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiCreatedPoll, showPollCreate));
    })
    
    moreVote.addEventListener('click',function(){
        apiVotedPoll=window.location.origin+'/myPollVoted/'+stop;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiVotedPoll, showPollVote));
        
    })
  
};