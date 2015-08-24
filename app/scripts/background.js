'use strict';



var SERVER = "hilit.it:8888";
var COLLECTION_NAME = "pages";
var LOGIN = "login";
var CONNECTED = "connected";
var COLLECTION_NAME = "pages";


chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'CCCC'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

var ddpConnection = new Asteroid(SERVER);

ddpConnection.on(LOGIN , function loginWorked(loggedInUserId) {
  console.log('logged in as:' + loggedInUserId);
  ddpConnection.userId = loggedInUserId
});

ddpConnection.on(CONNECTED , function connected() {
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
                response(error);
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
              response(error);
            });
            break;
          }
        });
      });
}



chrome.runtime.onMessage.addListener(function (request, sender, response) {

  console.log("request");
  console.log(request);
  console.log("sender");
  console.log(sender);
  console.log("response");
  console.log(response);

  console.log('chrome message: '  +  request + " "  + sender  + " " + response  + " "  + request.type.startsWith('login') );

  if (request.type == 'insert') {
    // console.log("return back the connecting ...");

    var ret  = ddpConnection.call("pageInsert", request.obj);
    ret.result
    .then(function (result) {
      console.log('Success:', result);
      response( result );
    }).catch(function (error) {
      console.error('Error:', error);
      response( error );
    });
/*
    var Collection = ddpConnection.getCollection( COLLECTION_NAME );

    var ret = Collection.insert( request.obj , function (error, fileObj) {
      console.log( fileObj );
      console.log( error );
    });

    // console.log( ret.local.isPending() );
    ret.local.then(function (id) {
      console.log(  "local: " + id );
    }).catch(function (error) {
      console.error('local Error:', error);
    });


    console.log("local.isPending(): " + ret.local.isPending() );
    // console.log("local.accepted: " + ret.local.isAccepted() );
    // console.log( ret.remote.isPending() );
    ret.remote.then(function (id) {
      console.log( "remote: " + id );
      response( {id: id} );
    }).catch(function (error) {
      console.error('remote Error:', error);
    });*/
    // console.log( "remote.isPending(): " + ret.remote.isPending() );

  } else if (request.type === 'logout') {

  }
});
