 'use strict';



    
window.onload = function(){
    var apiUrl=window.location.href+'/info';
    
    var pollName=document.querySelector('#pollName');
    var option1=document.querySelector('#showOpt1');
    var option2=document.querySelector('#showOpt2');
    var option3=document.querySelector('#showOpt3');
    var option4=document.querySelector('#showOpt4');
    var opt1Btn=document.querySelector('.option1-btn');
    var opt2Btn=document.querySelector('.option2-btn');
    var opt3Btn=document.querySelector('.option3-btn');
    var opt4Btn=document.querySelector('.option4-btn');
    var rect1=document.querySelector('.rectangle1');
    var rect2=document.querySelector('.rectangle2');
    var rect3=document.querySelector('.rectangle3');
    var rect4=document.querySelector('.rectangle4');
    var spanVote1=document.querySelector('#nbrVote1');
    var spanVote2=document.querySelector('#nbrVote2');
    var spanVote3=document.querySelector('#nbrVote3');
    var spanVote4=document.querySelector('#nbrVote4');
    var percent1=document.querySelector('#percent1');
    var percent2=document.querySelector('#percent2');
    var percent3=document.querySelector('#percent3');
    var percent4=document.querySelector('#percent4');
    var Av=document.querySelector('.alreadyVote');
    var pollCreator=document.querySelector('#cBy');
      
    var colorSet=['color1','color2','color3','color4'];  
    
    var HoverColor=['rgb(80,120,215)','rgb(245,120,120)','rgb(80,215,120)','rgb(255,255,0)'];
    var HoverBorderColor=['rgb(60,100,195)','rgb(225,100,100)','rgb(60,195,100)','rgb(255,235,0)'];
    
    function showPollName(data){
        
        var Data=JSON.parse(data);
        if (Data.voted){
            
            Av.style.display="flex";
        }
        var showPm=Data.info;
        var nbrOptions=showPm.optionNbr;
        if (pollCreator){
            pollCreator.innerHTML=Data.who.made.userName;
        }
        pollName.innerHTML=showPm.Name;
        option1.innerHTML=showPm.options[0].name;
        option2.innerHTML=showPm.options[1].name;
        rect1.style.height=Number(Number(showPm.options[0].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%'
        rect2.style.height=Number(Number(showPm.options[1].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%'
        rect1.style.height=Number(Number(showPm.options[0].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%';
        rect2.style.height=Number(Number(showPm.options[1].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%';
        opt1Btn.style['background-color']=HoverColor[showPm.options[0].color];
        opt1Btn.style['box-shadow']='0px 2px '+HoverBorderColor[showPm.options[0].color];
        opt2Btn.style['background-color']=HoverColor[showPm.options[1].color];
        opt2Btn.style['box-shadow']='0px 2px '+HoverBorderColor[showPm.options[1].color];
        rect1.className=colorSet[showPm.options[0].color];
        rect2.className=colorSet[showPm.options[1].color];
        setOptWidth(showPm.options);
        if (nbrOptions==3){
            rect3.style.display='block';
            opt3Btn.style.display='block';
            option3.innerHTML=showPm.options[2].name;
            rect3.style.height=Number(Number(showPm.options[2].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%';
            rect3.className=colorSet[showPm.options[2].color];
            opt3Btn.style['background-color']=HoverColor[showPm.options[2].color];
            opt3Btn.style['box-shadow']='0px 2px '+HoverBorderColor[showPm.options[2].color];
            
            if (showPm.options[2].nbrVote<=1){
                spanVote3.innerHTML=showPm.options[2].nbrVote+ ' Vote';
            }
            else{
                spanVote3.innerHTML=showPm.options[2].nbrVote+ ' Votes';
            }
        }
        if(nbrOptions==4) {
            rect4.style.display='block';
            opt4Btn.style.display='block';
            rect3.style.display='block';
            opt3Btn.style.display='block';
            rect3.className=colorSet[showPm.options[2].color];
            opt3Btn.style['background-color']=HoverColor[showPm.options[2].color];
            opt3Btn.style['box-shadow']='0px 2px '+HoverBorderColor[showPm.options[2].color];
            rect4.className=colorSet[showPm.options[3].color];
            opt4Btn.style['background-color']=HoverColor[showPm.options[3].color];
            opt4Btn.style['box-shadow']='0px 2px '+HoverBorderColor[showPm.options[3].color];
            option4.innerHTML=showPm.options[3].name;
            rect4.style.height=Number(Number(showPm.options[3].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%';
            option3.innerHTML=showPm.options[2].name;
            rect3.style.height=Number(Number(showPm.options[2].nbrVote/(showPm.totalVote+1))*80+7).toString()+'%';
            if (showPm.options[3].nbrVote<=1){
                spanVote4.innerHTML=showPm.options[3].nbrVote+ ' Vote';
            }
            else{
                spanVote4.innerHTML=showPm.options[3].nbrVote+ ' Votes';
            }
            
            if (showPm.options[2].nbrVote<=1){
                spanVote3.innerHTML=showPm.options[2].nbrVote+ ' Vote';
            }
            else{
                spanVote3.innerHTML=showPm.options[2].nbrVote+ ' Votes';
            }
        }   
        
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
            var p1=Math.floor(showPm.options[0].nbrVote/showPm.totalVote*100*100)/100;
            
            if (nbrOptions==3){
                var p3=Math.floor(showPm.options[2].nbrVote/showPm.totalVote*100*100)/100;
                percent1.innerHTML=p1+'%';
                percent2.innerHTML=Math.floor(10000-(p1+p3)*100)/100+'%';
                percent3.innerHTML=p3+'%';
            }
            else if(nbrOptions==4){
                p3=Math.floor(showPm.options[2].nbrVote/showPm.totalVote*100*100)/100;
                var p4=Math.floor(showPm.options[3].nbrVote/showPm.totalVote*100*100)/100;
                percent1.innerHTML=p1+'%';
                percent2.innerHTML=Math.floor(10000-(p1+p3+p4)*100)/100+'%';
                percent3.innerHTML=p3+'%';
                percent4.innerHTML=p4+'%';
            }
            else{
                percent1.innerHTML=p1+'%';
                percent2.innerHTML=Math.floor(10000-p1*100)/100+'%';
            }
            
        }
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, showPollName));
    
    
    rect1.addEventListener('click',function(){Vote(0)});
    opt1Btn.addEventListener('click',function(){Vote(0)});
    
    rect2.addEventListener('click',function(){Vote(1)});
    opt2Btn.addEventListener('click',function(){Vote(1)});
    
    rect3.addEventListener('click', function () {Vote(2);});
    opt3Btn.addEventListener('click', function () {Vote(2);});
    
    rect4.addEventListener('click', function () {Vote(3);});
    opt4Btn.addEventListener('click', function () {Vote(3);});
    function Vote(i){
            
            var apiUrlVote=window.location.href+i+'/info';
            ajaxFunctions.ajaxRequest('POST', apiUrlVote,function(){
               ajaxFunctions.ajaxRequest('GET', apiUrl, showPollName)});
    }
    
    
    function setOptWidth(OptArray){
        var max=0;
        var width=20;
        for (var i=0;i<OptArray.length;i++){
            if(OptArray[i].name.length>max){
                max=OptArray[i].name.length;
            }
        }
        if (max>8){
            width+=(max-8)*5;
        }
        opt1Btn.style.width=width+'%';
        opt2Btn.style.width=width+'%';
        opt3Btn.style.width=width+'%';
        opt4Btn.style.width=width+'%';
    }
    
};