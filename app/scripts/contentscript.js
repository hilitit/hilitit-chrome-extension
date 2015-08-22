'use strict';

console.log('\'Allo \'Allo! Content script !!');

function selectorOn(){
}
  console.log("contentscript.js selector on");


/*
document.addEventListener("mouseup", function(e) {
  var textSelection = null;
  var selector = null;

  if (window.getSelection) {
    selection = window.getSelection();
  } else if (document.selection) {
    selection = document.selection.createRange();
  }

  selection.toString() !== '' && console.log('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
});
*/
function getTextSelection(){

  var selection = null;
  if (window.getSelection) {
    selection = window.getSelection();
  } else if (document.selection) {
    selection = document.selection.createRange();
  }
  console.log( selection );
  return selection.toString();
}

$("*").click(function() {
  var selector = $(this).getSelector();
  console.log(selector + ' --> matches ' + $(selector).length + ' element');
  var selection = getTextSelection();
  if ( selection.toString() !== '' ){
    var ret = Collection.insert({
      // "url": "asdfasdf",
      // "title": "asdfasdfadf",
      "selector" : selector,
      "text": selection.toString() ,
      "href": window.location.href
    }, function (error, fileObj) {
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
    }).catch(function (error) {
      console.error('remote Error:', error);
    });
    console.log( "remote.isPending(): " + ret.remote.isPending() );

  }
  return false;
});




var Collection;
var fixesForPageQuery;
var SERVER = "hilit.it:8888";
var ddpConnection;

var COLLECTION_NAME = "pages";
var LOGIN = "login";

function init() {
  console.log('contentscript.js init');
  // Connect to the server using Use the Asteroid library ( https://github.com/mondora/asteroid )
  ddpConnection = new Asteroid(SERVER);
  // ddpConnection.subscribe( COLLECTION_NAME , window.location.href);
  // fixesForPageQuery = Collection.reactiveQuery({url:window.location.href});
  ddpConnection.on(LOGIN,function(){
    console.log('content_scripts logged in: ' + ddpConnection.userId);
    Collection = ddpConnection.getCollection( COLLECTION_NAME );
  });

}

init();
