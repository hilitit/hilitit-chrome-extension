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
/*
document.addEventListener("mouseup", function(e) {
   var selection;

   if (window.getSelection) {
     selection = window.getSelection();
   } else if (document.selection) {
     selection = document.selection.createRange();
   }

  selection.toString() !== '' && console.log('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
});
*/

var currentSelection = {};

$("*").mouseup(function(event) {
   var selection;

   if (window.getSelection) {
     selection = window.getSelection();
   } else if (document.selection) {
     selection = document.selection.createRange();
   }

  if (selection.toString() !== ''){
    event.stopPropagation();

    // console.log('"' + selection.toString() + '" was selected at ' + event.pageX + '/' + event.pageY);
    var selector = $(this).getSelector();
    // console.log(selector + ' --> matches ' + $(selector).length + ' element');

    currentSelection = {
      selector: selector,
      "text": selection.toString() ,
      "href": window.location.href
    }

    $('#popup').css('left',event.pageX);      // <<< use pageX and pageY
    $('#popup').css('top',event.pageY);
    $('#popup').css('display','inline');
    $("#popup").css("position", "absolute");  // <<< also make it absolute!

    setTimeout(function(){
      $('#popup').css('display','none');
    }, 2000);

  }

});

var hilitCurrentSelection = function()
{
  chrome.runtime.sendMessage({type: "insert",obj: currentSelection}, function(response) {
     console.log(response);
   });
}

/*
$("*").click(function(event) {
  console.log(event);
  // console.log("window.location.href:");
  // console.log(window.location.href);
  var selector = $(this).getSelector();
  console.log(selector + ' --> matches ' + $(selector).length + ' element');
  var selection = getTextSelection();
  if ( selection.toString() !== '' ){

    insert({
      selector: selector,
      "text": selection.toString() ,
      "href": window.location.href
    })

  }
  return true;
});
*/



function init()
{
  console.log('contentscript.js init');

  $( "body" ).append( '<div style="display:none;width:100px;height:50px;border:3px solid black; background-color: gray;" id="popup"><div style="padding: 5px; width: 90px; height: 40px; background-color: white;" id="hilit-button"  value="hilit">Hilit</div></div>' );

  $("#hilit-button").click(function(event) {
    console.log("hilit-button clicked !!!");
    hilitCurrentSelection();
  });

}

init();
