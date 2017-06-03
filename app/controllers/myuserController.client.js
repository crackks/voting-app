'use strict';

(function () {

   var displayNbrVote= document.querySelector("#nbrVote")||null;
   var displayNbrPoll=document.querySelector("#nbrPoll")||null;
   var displayName = document.querySelector('#userName');
   var appUrl=window.location.origin;
   var apiUrl = appUrl + '/api/:id';
   
   function updateHtmlElement (data, element, userProperty) {
      
         element.innerHTML = data[userProperty];
     
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'userName');
      } else {
         updateHtmlElement(userObject, displayName, 'userName');
      }

      if (displayNbrPoll !== null) {
         updateHtmlElement(userObject, displayNbrPoll, 'nbrPoll');   
      }

      if (displayNbrVote !== null) {
         updateHtmlElement(userObject, displayNbrVote, 'nbrVote');   
      }

      

   }));
})();
