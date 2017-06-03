'use strict';
    
(function(){
    var apiUrl=window.location.href+'api';
    
    var Recent=document.querySelector('#dispRecentPolls');
    var Most=document.querySelector('#dispMostVotedPolls');
    
    
    function showPollName(data){
        var showPm=JSON.parse(data);
        var recent=showPm.Recent;
        var most=showPm.Most;
        for (var i=0;i<recent.length;i++){
            var refR='/poll/'+recent[i][1];
            var refM='/poll/'+most[i][1];
            var txtR="<div class='RecentPolls'><a class='pollTitle' href=" + refR + " >" + recent[i][0]+ '</a> <p class="recent">            '+'  '+'     Created  '+friendlyDate(recent[i][2])+"</p></div>";
            var txtM="<div class='RecentPolls'><a class='pollTitle' href=" + refM + " >" + most[i][0]+ '</a> <p class="recent">            '+'  '+'   '+most[i][2]+" Votes</p></div>";
            Recent.insertAdjacentHTML('beforeend', txtR);
            Most.insertAdjacentHTML('beforeend', txtM);
        }
        
    }
    
    function friendlyDate(date){
        var now=new Date();
        var diff=now.getTime()-date;
        var friendlyDate="";
        if (diff<(60000)){
            friendlyDate='less than 1 min ago';
        }
        else if (diff<(60000*60)){
            var min=Math.floor(diff/(60000));
            if (min<=1){
                friendlyDate='1 minute ago';
            }
            else{
                friendlyDate=min+' minutes ago';
            }
            
        }
        else if (diff<(60000*60*24)){
            var h=Math.floor(diff/(60000*60));
            if (h<=1){
                friendlyDate='1 hour ago';
            }
            else{
                friendlyDate=h+' hours ago';
            }
            
        }
        else if (diff<(60000*60*24*30)){
            var d=Math.floor(diff/(60000*60*24))
            if (d<=1){
                friendlyDate='1 day ago';
            }
            else{
                friendlyDate=d+' days ago';
            }
        }
        else{
            friendlyDate="more than 1 month ago";
        }
    
        return friendlyDate;
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, showPollName));
    
   
})();