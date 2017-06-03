'use strict';

(function(){

    var addOption=document.querySelector('.optBtn');
    var newOpt0=document.querySelector('.optionsAdd0');
    var newOpt1=document.querySelector('.optionsAdd1');
    var submitPoll=document.querySelector('.submitPoll');
    var newColor0=document.querySelector('.selectColor0');
    var newColor1=document.querySelector('.selectColor1');
    var deleteOpt3=document.querySelector('.delete-opt3');
    var deleteOpt4=document.querySelector('.delete-opt4');
    var box=document.querySelector('.boxNewPoll');
    
    var count=0;
    var boxPos=12;
    var Opt3=false;
    var Opt4=false;
    addOption.addEventListener('click',function(){Options()});
    
    deleteOpt3.addEventListener('click',function(){
        boxPos++;
        newOpt0.style.display='none';
        newOpt0.value='';
        newColor0.style.display='none';
        newColor0.value='2';
        deleteOpt3.style.display='none';
        box.style['margin-top']=boxPos+'%';
        if (count==2){
            addOption.style.display='block';
        }
        count--;
        Opt3=false;
    });
    
    deleteOpt4.addEventListener('click',function(){
        boxPos++;
        newOpt1.style.display='none';
        newOpt1.value='';
        newColor1.style.display='none';
        newColor1.value='3';
        deleteOpt4.style.display='none';
        box.style['margin-top']=boxPos+'%';
        if (count==2){
            addOption.style.display='block';
            addOption.style['margin-bottom']='-22px';
        }
        count--;
        Opt4=false;
    });
    
    
    function Options(){
        boxPos--;
        if (!Opt3){
            newOpt0.style.display='block';
            newColor0.style.display='block';
            deleteOpt3.style.display='block';
            box.style['margin-top']=boxPos+'%';
            Opt3=true;
        }
        else if(!Opt4){
            newOpt1.style.display='block';
            newColor1.style.display='block';
            submitPoll.style.margin='26px auto 30px auto';
            deleteOpt4.style.display='block';
            box.style['margin-top']=boxPos+'%';
            Opt4=true;
        }
        count++;
        if(count==2){
            addOption.style.display='none';
        }
        
    
    }
    
})();