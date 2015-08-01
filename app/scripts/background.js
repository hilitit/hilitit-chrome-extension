'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');


var ddpConnection = new Asteroid("localhost:3000");
// TODO do this in a better way
// make it global so the popup can access user data...
window.ddpConnection = ddpConnection;
console.log('bg script starting');

chrome.runtime.onMessage.addListener(function (request, sender, response) {
    // this lastIndexOf thing is a startsWith implementation

    console.log('chrome message: '  +  request + " "  + sender  + " " + response  + " "  + request.startsWith('login') );

    if (request.startsWith('login')) {
        ddpConnection.on("login", function loginWorked(loggedInUserId) {
            console.log('logged in as:' + loggedInUserId);
            ddpConnection.userId = loggedInUserId
        });

        ddpConnection.resumeLoginPromise.then(function alreadyLoggedIn() {
                console.log("user is already logged in");
            }
        ).fail(function notAlreadyLoggedIn() {
                ddpConnection.subscribe("meteor.loginServiceConfiguration").ready.then(function tryToLogin() {
                    console.log('trying login');
                    switch (request){
                        case 'login_facebook':
                            console.log("facebook");
                            ddpConnection.loginWithFacebook();
                            break;
                        case 'login_github':
                            console.log("github");
                            ddpConnection.loginWithGithub();
                            break;
                        case 'login_google':
                            ddpConnection.loginWithGoogle();
                            break;
                        case 'login_twitter':
                          ddpConnection.loginWithTwitter();
                          break;
                        }
                });
            })
    } else if (request === 'logout') {
        console.log('trying to logout');
        ddpConnection.logout();
    }
});
