'use strict';

(function () {
    var log=document.querySelector('.loginBtn');
    var sign=document.querySelector('.signUpBtn');
    var logBlock=document.querySelector('.loginBlock');
    var signBlock=document.querySelector('.signUpBlock');
    var pos=document.querySelector('.box');
    var logShown=false;
    var signShown=false;
    
    log.addEventListener('click',function(){
        if (logShown){
            logBlock.style.display='none'
            signBlock.style.display='none';
            logShown=false;
            signShown=false;
            pos.style.margin='5% auto 0px auto';
        }
        else{
        logBlock.style.display='flex'
        signBlock.style.display='none';
        logShown=true;
        signShown=false;
        pos.style.margin='0% auto 0px auto';
        }
         
    })
    sign.addEventListener('click',function(){
        if (signShown){
            logBlock.style.display='none'
            signBlock.style.display='none';
            signShown=false;
            logShown=false;
            pos.style.margin='5% auto 0px auto';
        }
        else{
            logBlock.style.display='none'
            signBlock.style.display='flex';
            signShown=true;
            logShown=false;
            pos.style.margin='0% auto 0px auto';
        }
        
    })
    
})();