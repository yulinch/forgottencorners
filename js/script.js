$(function() {
  $(".hamburger").on("click", function() {
    $(this).toggleClass("active");
    $(".main-menu").toggleClass("active");
  });
});

// intro animation
var animation = function() {
  $(".question-mark").addClass("active");
  $(".slogan").addClass("active");
  $(".model").addClass("active");
  // console.log("start");
  $("body").on(transitionEvent, ".question-mark.active", function(event) {
    $(".subtitle").addClass("active");
  });
  $("body").on(transitionEvent, ".subtitle.active", function(event) {
    $(".intro").addClass("pull-up");
    $(".control-bar").fadeIn(500);
  });
};

$(document).ready(animation);

// youtube setting
var playing = false;

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !playing) {
    // 影片播放
    $(".scroll-down").fadeOut(400);
    playing = true;
  } else if (event.data == YT.PlayerState.PAUSED) {
    // 影片暫停
    $(".scroll-down").fadeIn(400);
    playing = false;
  }
  if (event.data === 0) {
    // 影片播畢
    $(".scroll-down").fadeIn(400);
  }
}

// 捐款按鈕動畫
var showBtn = function() {
  $(".control-bar").addClass("active");
  $("body").on(transitionEvent, ".control-bar.active", function(event) {
    $(".btn-donate").addClass("active");
  });
  $("body").on(transitionEvent, ".btn-donate.active", function(event) {
    $(".btn-share").addClass("active");
  });
};

// 點擊下滑
$(".scroll-down").on("touchend", function(e) {
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $(".control-bar").offset().top
      },
      450
    );
  showBtn();
  return false;
  e.preventDefault();
});

// 使用者自己下滑
var position = $(window).scrollTop(),
  deviceWidth = $(window).width(),
  deviceHeight = $(window).height();
// console.log("deviceWidth: " + deviceWidth);
// console.log("deviceHeight: " + deviceHeight);
if (deviceWidth <= 420) {
  $("body").addClass("scroll-trigger");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      $("body").removeClass("scroll-trigger");
      showBtn();
    }
    position = scroll;
  });
} else {
  showBtn();
}

if (deviceHeight >= 737) {
  $(".control-bar").hide();
  $("body").addClass("scroll-trigger");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      $("body").removeClass("scroll-trigger");
      showBtn();
    }
    position = scroll;
  });
}

// 點連結收起選單
$(".main-menu a").on("click", function() {
  setTimeout(function() {
    $(".hamburger, .main-menu").removeClass("active");
    $(".control-bar").removeClass("active");
  }, 800);
});

// 查看展覽簡介
var showDesc = function() {
  $("#desc").addClass("show");
  setTimeout(function() {
    // console.log("menu up");
    $(".hamburger, .main-menu").removeClass("active");
  }, 800);
};

// 關閉簡介
$("#desc .btn-close").on("click", function() {
  // $("#desc").fadeOut(450);
  $("#desc").removeClass("show");
});

// share this page to Facebook
var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function(e) {
  e.preventDefault();
  var facebookWindow = window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" + document.URL,
    "facebook-popup",
    "height=350,width=600"
  );
  if (facebookWindow.focus) {
    facebookWindow.focus();
  }
  return false;
};
