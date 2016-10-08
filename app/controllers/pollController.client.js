'use strict';

(function () {

/////THIS PART MANIPULATES THE VIEW AFTER WE GET DATA BACK FROM OUR API ENDPOINT/////////

 //  var addButton = document.querySelector('.btn-add');
   var pollName = document.querySelector('#poll-name');
   var choiceList = document.querySelector('#choices');
   var apiUrl = appUrl + '/api/poll/';

   function updatePoll (data) {
      var pollsObject = JSON.parse(data);
      pollName.innerHTML = pollsObject.name;
      choiceList.innerHTML = pollsObject.options.map(function(option) {
          return "<li>" + option + "</li>";
      });
   }

////////////////////////////////////////////////////////////////////


/////THIS PART AJAX CALLS OUR API ENDPOINT AND GETS THE DATA//////////////////

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll));

///////////////////////////////////////////////////////////////////

   // addButton.addEventListener('click', function () {

   //    ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
   //       ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList);
   //    });

   // }, false);

   // deleteButton.addEventListener('click', function () {

   //    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
   //       ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
   //    });

   // }, false);

})();