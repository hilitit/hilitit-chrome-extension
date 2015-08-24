

document.addEventListener('DOMContentLoaded', function () {

  console.log("browser_action");

  var background = chrome.extension.getBackgroundPage()

  if (background.ddpConnection.userId){
    console.log('user is logged in');
    $('#loginRequired').hide();
    $('#mainPopup').show();
  } else {
    console.log('user is logged out');
    $('#mainPopup').hide();
    $('#loginRequired').show();
  }

});
