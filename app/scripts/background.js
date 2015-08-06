'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'CCCC'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

var ddpConnection = new Asteroid("hilit.it:8888");

ddpConnection.on("login", function loginWorked(loggedInUserId) {
  console.log('logged in as:' + loggedInUserId);
  ddpConnection.userId = loggedInUserId
});

ddpConnection.on("connected", function connected() {
  console.log('connected !' );
});

window.ddpConnection  = ddpConnection;
// chrome-extension://lhgichlnkkjiaphnakmjgbjjpheejbnd/scripts/background.js:49:8


function logout(response){
  console.log('trying to logout');
  ddpConnection.logout()
  .then(function (result) {
    console.log('Logout Success:', result);
    response(result);
  }).catch(function (error) {
    console.error('Logout Error:', error);
  });
}

function login(request,response){

      ddpConnection.resumeLoginPromise.then(function alreadyLoggedIn() {
        console.log("user is already logged in");
        response(ddpConnection.userId);
      }).fail(function notAlreadyLoggedIn() {
        ddpConnection.subscribe("meteor.loginServiceConfiguration").ready.then(function tryToLogin() {

          console.log('trying login');
          switch (request.type){

            case 'login_plain':{
              console.log('plain username: ' + request.username + " ,password: " + request.password );
              ddpConnection.loginWithPassword(request.username,request.password).then(function (result) {
                console.log('Success:', result);
                response(result);
              }).catch(function (error) {
                console.error('Error:', error);
              });
              break;
            }
            case 'login_facebook':{
              console.log("facebook");
              ddpConnection.loginWithFacebook();
              break;
            }
            case 'login_github':
            console.log("github");
            ddpConnection.loginWithGithub();
            break;
            case 'login_google':
            ddpConnection.loginWithGoogle();
            break;
            case 'login_twitter':
            console.log("login twitter");
            ddpConnection.loginWithTwitter().then(function (result) {
              console.log('Success:', result);
              response(result);
            }).catch(function (error) {
              console.error('Error:', error);
            });
            break;
          }
        });
      });
}


chrome.runtime.onMessage.addListener(function (request, sender, response) {
  // this lastIndexOf thing is a startsWith implementation

  console.log('chrome message: '  +  request + " "  + sender  + " " + response  + " "  + request.type.startsWith('login') );
  // response("dddddd");
  if (request.type.startsWith('login')) {


  } else if (request.type === 'logout') {

  }
});
