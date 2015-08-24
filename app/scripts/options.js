'use strict';

console.log('\'Allo \'Allo! Option');




/*
console.log(ddpConnection);
ddpConnection.on("connected", function () {
console.log("DD KD DK DKD KD KD KDD");
});

ddpConnection.on("login", function () {
console.log("FFF F F F F F F F");
});*/




document.addEventListener('DOMContentLoaded', function () {

var background = chrome.extension.getBackgroundPage()


var checkUI = function() {

  if (background.ddpConnection.userId){
    console.log('user is logged in');
    $('#login').hide();
    $('#logout').show();
  } else {
    console.log('user is logged out');
    $('#logout').hide();
    $('#login').show();
  }

}

checkUI();

console.log("DOMContentLoaded");
$('.login_link').click(
  function(){
    console.log('Login:   ' + this.id);
    chrome.runtime.sendMessage({type: this.id});

});




$('#logout').click(
  function(){
    console.log('attempting logout');
    background.logout(
      function(response){
        console.log("logout response: " + response);
        checkUI();
      });
    });




    $("#login-form").submit(function(event) {
      console.log('#login-form');
      event.preventDefault();
      console.log('attempting login');
      console.log($('#username').val());
      console.log($('#password').val());

      $('#login-message').text("");

      background.login({ 'type': "login_plain",
       'username': $('#username').val(),
       'password': $('#password').val()  },
       function response(response) {
         if (response.error && response.message ) {
           $('#login-message').text(response.reason);
         }
         checkUI();
       })
/*
      chrome.runtime.sendMessage(
        { 'type': "login_plain",
         'username': $('#username').val(),
         'password': $('#password').val()  } ,
         function (response) {
           console.log("response");
           console.log("login response: " + response);
         }
       );
*/
      });

});
