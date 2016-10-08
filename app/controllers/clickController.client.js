'use strict';

(function () {

 //  var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   // var pollList = document.querySelector('#poll-list');
   var pathArray = document.URL.split('/');
   var id = pathArray[pathArray.length - 1];
   var url = appUrl + '/poll/' + id;
   var home = appUrl + '/';
   

   // function updatePollList (data) {
   //    var pollsObject = JSON.parse(data);
   //    pollList.innerHTML = pollsObject.map(function(poll) {
   //       return "<div><a href=/poll/" + poll._id + "><button>" + poll.name + "</button></a></div>";
   //    });
   // }

   //ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList));

   // addButton.addEventListener('click', function () {

   //    ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
   //       ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList);
   //    });

   // }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', url);
      
   });

})();