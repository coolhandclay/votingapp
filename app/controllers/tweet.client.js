$(document).ready(function() {
    
    var url = document.URL;
    var title = document.getElementById('title').textContent;
    
    $('#twitter-button').prop('href', "https://twitter.com/intent/tweet?text=" + title + " Vote here! " + url);
    
});

    

