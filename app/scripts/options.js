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


/*
  Ceres.on("login", function () {
    console.log('Logged in !');
  });

  Ceres.on("logout", function () {
    console.log('logged in !');
  });


  Ceres.on("connected", function () {
    console.log(  'connected !');
  });
*/

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

    /*
    ddpConnection.resumeLoginPromise.then(function alreadyLoggedIn() {
    console.log("user is already logged in");
  }).fail(function notAlreadyLoggedIn() {

  ddpConnection.on("login", function loginWorked(loggedInUserId) {
  console.log('logged in as:' + loggedInUserId);
  ddpConnection.userId = loggedInUserId
});

ddpConnection.subscribe("meteor.loginServiceConfiguration").ready.then(function tryToLogin() {
console.log('Login:  222 ');
ddpConnection.loginWithTwitter();
});
});
*/

});



var doLogin = function(callback){


}

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

      background.login({ 'type': "login_plain",
       'username': $('#username').val(),
       'password': $('#password').val()  },   function repoonse(response) {
            console.log("response");
            console.log("login response: " + response);
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
