'use strict';
    
window.onload = function(){
    var apiUrl=window.location.href+'/info';
    window.alert(apiUrl);
    var pollName=document.querySelector('#pollName');
    var option1=document.querySelector('#showOpt1');
    var option2=document.querySelector('#showOpt2');
    var opt1Btn=document.querySelector('.option1-btn');
    var opt2Btn=document.querySelector('.option2-btn');
    var rect1=document.querySelector('.rectangle1');
    var rect2=document.querySelector('.rectangle2');
    var spanVote1=document.querySelector('#nbrVote1');
    var spanVote2=document.querySelector('#nbrVote2');
    var percent1=document.querySelector('#percent1');
    var percent2=document.querySelector('#percent2');
    
    
    function showPollName(data){
        var showPm=JSON.parse(data);
        window.alert(showPm);
        pollName.innerHTML=showPm.Name;
        option1.innerHTML=showPm.options[0].name;
        option2.innerHTML=showPm.options[1].name;
        rect1.style.height=Number(Number(showPm.options[0].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%'
        rect2.style.height=Number(Number(showPm.options[1].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%'
        
        if (showPm.options[0].nbrVote<=1){
            spanVote1.innerHTML=showPm.options[0].nbrVote+ ' Vote';
        }
        else{
            spanVote1.innerHTML=showPm.options[0].nbrVote+ ' Votes';
           
        }
        if(showPm.options[1].nbrVote<=1){
            spanVote2.innerHTML=showPm.options[1].nbrVote+ ' Vote';
        }
        else{
            spanVote2.innerHTML=showPm.options[1].nbrVote+ ' Votes';
        }
        
        if (showPm.totalVote!=0){
            
            percent1.innerHTML=Math.floor(showPm.options[0].nbrVote/showPm.totalVote*100*100)/100+'%';
            percent2.innerHTML=Math.floor(10000-Math.floor(showPm.options[0].nbrVote/showPm.totalVote*10000))/100+'%';
        }
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, showPollName));
    
    
    rect1.addEventListener('click',function(){Vote(0)});
    
    opt1Btn.addEventListener('click',function(){Vote(0)});
    
    rect2.addEventListener('click',function(){Vote(1)});
    
    opt2Btn.addEventListener('click',function(){Vote(1)});
    
    function Vote(i){
        if (id){
            var apiUrlVote=window.location.href+i+'/info';
    window.alert(apiUrlVote)
            ajaxFunctions.ajaxRequest('POST', apiUrlVote, function () {
                ajaxFunctions.ajaxRequest('GET', apiUrl, showPollName);
            });
        }
    }
    
    rdmBtn.addEventListener('click', function(){
        ajaxFunctions.ajaxRequest('GET',apiUrl,showPollName);
    })
};