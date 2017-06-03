'use strict';
    
window.onload = function(){
    var count=1;
    var apiCreatedPoll=window.location.origin+'/allPollCreated/1';
    var pollCreatedBlock=document.querySelector('#dispPollCreated');
    var more=document.querySelector('.morePolls');
    var moreContainer=document.querySelector('.morePoll-container')
    
    function showPollCreate(data){
        var showPm=JSON.parse(data);
        count++;
        for (var i=0;i<showPm.pollName.length;i++){
            var ref='/poll/'+showPm.pollId[i];
            ref=ref.toString();
            var txt="<div class='RecentPolls'><a class='pollTitle' href=" + ref + " >" + showPm.pollName[i]+ '</a> <p class="recent">           Created by '+showPm.pollCreator[i]+'    and have   '+DispVot(showPm.nbrVote[i])+"</p></div>";
            txt=txt.toString();
            pollCreatedBlock.insertAdjacentHTML('beforeend', txt);
            
        }
        if (showPm.end){
            more.style.display='none';
            moreContainer.style.display='none';
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
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiCreatedPoll, showPollCreate));
    
    more.addEventListener('click',function(){
        apiCreatedPoll=window.location.origin+'/allPollCreated/'+count;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiCreatedPoll, showPollCreate));
    })
  
};