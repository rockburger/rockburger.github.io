// JavaScript Document

/*========== Animated Progress start ================*/


$('.pie_progress').asPieProgress({namespace: 'pie_progress',  speed: 70});

$(window).on("scroll",function() {
var hT = $('.expertise_style-1, .expertise_style-2, .expertise_style-3').prev().offset().top;
   hH = $('.expertise_style-1, .expertise_style-2, .expertise_style-3').prev().outerHeight()+($('.expertise_style-1, .expertise_style-2, .expertise_style-3').prev().outerHeight()/2);
   wH = $(window).height();
   wS = $(this).scrollTop();
   if (wS > (hT+hH-wH)){ $('.pie_progress').asPieProgress('start'); }
   return false;
});

/*========== Animated Progress end  ================*/