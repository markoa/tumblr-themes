
// remember to include jquery.hotkeys.js from http://github.com/jeresig/jquery.hotkeys

//
// keybindings
//
// h - previous page
// l - next page
// j - next post
// k - previous post

var READABILITY_OFFSET = 10;

function goToPrevPage() {
  var redirectUrl = "";
  var parts = window.location.href.split("/");
  var partCount = parts.length;

  if (!((partCount >= 2) && (parts[partCount-2] == "page"))) {
    return;
  }

  var currentPage = parseInt(parts[partCount-1]);
  currentPage -= 1;

  if (currentPage >= 2) {
    redirectUrl = "http://" + document.domain + "/page/" + currentPage.toString(10);
  } else if (currentPage == 1) {
    redirectUrl = "http://" + document.domain;
  }

  window.location = redirectUrl;
}

function goToNextPage() {
  var redirectUrl = "";
  var parts = window.location.href.split("/");
  var partCount = parts.length;

  if ((partCount >= 2) && (parts[partCount-2] == "page")) {
    var currentPage = parseInt(parts[partCount-1]);
    currentPage += 1;
    redirectUrl = "http://" + document.domain + "/page/" + currentPage.toString(10);
  } else {
    redirectUrl = "http://" + document.domain + "/page/2";
  }

  window.location = redirectUrl;
}

function goToNextPost() {
  var windowOffset = $(window).scrollTop();
  var posts = $(".post");
  var postCount = posts.length;
  var moved = false;

  for (var i = 0; i < postCount; i++) {
    var post = posts[i];
    var elementOffset = parseInt($(post).offset().top);

    if (elementOffset > (windowOffset + READABILITY_OFFSET)) {
      $(window).scrollTop($(post).offset().top - READABILITY_OFFSET);
      moved = true;
      break;
    }
  }

  if (! moved) {
    goToNextPage();
  }
}

function goToPrevPost() {
  var windowOffset = $(window).scrollTop();
  var posts = $(".post");
  var postCount = posts.length;
  var moved = false;

  for (var i = postCount - 1; i >= 0; i--) {
    var post = posts[i];
    var elementOffset = parseInt($(post).offset().top);

    if (elementOffset >= (windowOffset + READABILITY_OFFSET)) {
      continue;
    } 

    $(window).scrollTop($(post).offset().top - READABILITY_OFFSET);
    moved = true;
    break;
  }

  if (! moved) {
    goToPrevPage();
  }
}

$(document).bind("keydown", "h", goToPrevPage);
$(document).bind("keydown", "l", goToNextPage);
$(document).bind("keydown", "j", goToNextPost);
$(document).bind("keydown", "k", goToPrevPost);
