var counter = 1;
var limit = 5;

function addInput(divName) {
    if(counter < limit) {
        var newdiv = document.createElement('div');
        newdiv.innerHTML = ("<input id='answer' class='form-control' type='text' placeholder='option' name='options'/>");
        document.getElementById(divName).appendChild(newdiv);
        counter++;
    }
};