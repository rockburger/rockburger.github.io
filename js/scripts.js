/*
Theme Name: Nuuk
Author: Multia
Main Script
*/

/*Index*/
/*********************/
/*1) Windows Ready Function*/
	/*a)Random bg Image*/
	/*b)Home3 Init*/
	/*c)Home4, blog-page, project-detail-page-1 Init*/
	/*d)Home6 Init*/
	/*e)project-detail-page-type-1 Init*/
	/*f)singleblog-page, owl-carousel, project-detail-page-type-2 Init*/
	/*g)square-menu Init*/
	/*h)Taking Prominent Color*/
/*2) Windows Load Function Function*/
	/*a)Call for loads img*/
	/*b)Home5 and Gallery-style-page Init*/	
/*3) Home2 & Horizontal Gallery Init*/
/*4) Windows Height Function*/
/*5) Windows Resize Function*/
/*6) HeroParallax Function*/
/*7) Landing Page Click Events*/
/*8) ImgLoading Function*/
/*9) Scroll To Function*/
/*10) Function Masonry Portfolio*/
/*11) Click Events*/
/*12) some-structural*/
/*14) Instafeed*/
/*15) Subscribe JS*/
/*16) Contact Form Init*/



var $ = jQuery.noConflict();

/*--------------------------------------------------
Windows Ready Function Start
---------------------------------------------------*/
"use strict";

$(document).ready(function(){
	elementHeight();
	heroParallax();
	/*Random bg Image Start*/
	var images = ['random1.jpg', 'random2.jpg', 'random3.jpg', 'random4.jpg', 'random5.jpg', 'random6.jpg', 'random7.jpg', 'random8.jpg', 'random9.jpg', 'random10.jpg'];
	$('.img-onload-wrap').css({'background': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ') no-repeat scroll center center / cover'});
	/*Random bg Image End*/
	
	/*Home3 Init*/
	if( $('.home-3').length > 0 ){	
		$('#split_slider').multiscroll({
			anchors: ['first', 'second', 'third'],
			menu: '#menu',
			navigation: true,
			navigationTooltips: ['', '', ''],
			loopBottom: true,
			loopTop: true,
			sectionSelector: '.section',
			leftSelector: '.left',
			rightSelector: '.right',
		});
		$('#split_slider .img-wrap-v').each(function(){ 
			var src = $(this).find('img').attr('src');
			$(this).find('img').css('display','none');
			$(this).css('backgroundImage','url('+src+')'); 
		});	
		
		$('.left-wrap').hover(function() {
			$( "#split_slider" ).addClass( 'opac' );
			}, function() {
			$( "#split_slider" ).removeClass( 'opac' );
		});
		$('.right-wrap').hover(function() {
			$( "#split_slider" ).addClass( 'opac' );
			}, function() {
			$( "#split_slider" ).removeClass( 'opac' );
		});
	}	
	
	/*Home4, blog-page, project-detail-page-1 Init*/
	if( $('.home-4,.blog-page,.project-detail-page-type-1').length > 0 ){
		$.browser = {};
		$.browser.msie = false;
		$.browser.version = 0;
		if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
			$.browser.msie = true;
			$.browser.version = RegExp.$1;
		}
		
		/*fade slider*/
		$('#maximage').maximage({
			cycleOptions: {
				fx: 'fade',
				speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
				timeout: 0,
				prev: '#arrow_left',
				next: '#arrow_right',
				pause: 1,
				before: function(last,current){
					if($(current).find('#player1').length > 0)
					$("#player1").vimeo("play");
				},
				after: function(last,current){
					if($(last).find('#player1').length > 0)
					$("#player1").vimeo("pause");
				}
			},
			onFirstImageLoaded: function(){
				$('#cycle-loader').hide();
				$('#maximage').fadeIn('fast');
			}
		});

		// Helper function to Fill and Center the HTML5 Video
		$('video,object').maximage('maxcover');

		// To show it is dynamic html text
		$('.in-slide-content').delay(1200).fadeIn();
		
		$('#arrow_left').hover(function() {
			$( ".anim-line" ).addClass( 'anim-lines' );
			}, function() {
			$( ".anim-line" ).removeClass( '.anim-lines' );
		});
		
		$(document).on( 'click', ".resizable", function (e) {
			$( ".wrapper" ).toggleClass( 'wrapper-anim' );
			$( "header,footer,.resizable .fa-expand,.resizable .fa-compress,.caption-slider,.project-detail-content" ).toggleClass( 'opac-hide' );
		});
	}
	
	/*Home6 Init*/
	if($('.home-6').length > 0){
		// initialize Packery
		masonryPortfolio();
		var $container = $('#portfolio');
		var $grid = $container.packery({
		  itemSelector: '.item',
		});

		// make all items draggable
		var $items = $grid.find('.item').draggable();
		// bind drag events to Packery
		$grid.packery( 'bindUIDraggableEvents', $items );
	}

	/*project-detail-page-type-1 Init*/
	if($('.project-detail-page-type-1').length > 0){
		$('.detail-dis').hide();
			var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
			var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
			var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
			var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
			if((is_chrome)||(is_explorer)||(is_firefox)||(is_opera)){
				$('.project-detail-content').niceScroll();
			}
		$(document).on( 'click', ".resizable-detail", function (e) {
				e.preventDefault();
				e.stopPropagation();
				if(!($('.project-detail-content').hasClass('expand-detail'))) {
					$('.short-dis').fadeOut(1000);
					$('.proj-nav').fadeOut(1000);
					setTimeout(function() { 
						$('.detail-dis').fadeIn(1000);
						$('.proj-nav').fadeIn(1000);
					},2000);
				}	
				setTimeout(function() { 
					$('.project-detail-content').addClass('expand-detail');
					$( ".resizable-detail .fa-expand" ).addClass( 'opac-hide' );
					$( ".resizable-detail .fa-compress" ).removeClass( 'opac-hide' );
					$( ".resizable-detail").addClass( 'close-dlog' );
				},1000);
				
			}),$(document).on( 'click', ".resizable-detail.close-dlog", function (e) {
				e.preventDefault();
				e.stopPropagation();
				if($('.project-detail-content').hasClass('expand-detail'))
					{	
						$('.detail-dis').fadeOut(1000);
						$('.proj-nav').fadeOut(1000);
						setTimeout(function() { 
							$('.short-dis').fadeIn(1000);
							$('.proj-nav').fadeIn(1000);
						},2000);
					}	
				setTimeout(function() { 
					$('.project-detail-content').removeClass('expand-detail');
					$( ".resizable-detail" ).removeClass( 'close-dlog' );
					$( ".resizable-detail .fa-expand" ).removeClass( 'opac-hide' );
					$( ".resizable-detail .fa-compress" ).addClass( 'opac-hide' );
				},1000);
				
			});		
	}
	
	/*singleblog-page, owl-carousel, project-detail-page-type-2 Init*/
	if( $('.singleblog-page .owl-carousel,.project-detail-page-type-2').length > 0 ){
		
		$(".owl-carousel .item").each(function(index, el) {
			var img = $(this).find('img.get-color'),
			img_h = $(this).parent().height(),
			img_o_w = img.attr('data-width'),
			img_o_h = img.attr('data-height'),
			img_c_w = img_h*img_o_w/img_o_h;
			img.width(img_c_w);
			$(this).width(img_c_w);
		});
			
		$('#galpost_owl').owlCarousel({
			autoWidth: true,
			margin: 30,
			items: 4,
			smartSpeed: 1300,
			loop: true,
			dots: false,
			autoplay:false,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			autoplaySpeed: 3600,
			responsive: false,
			nav:true,
			navText: [
			  "<img src='images/leftarrow-light.svg' alt='icon' />",
			  "<img src='images/rightarrow-light.svg' alt='icon' />"
			  ],
		});
	}
	
	/*square-menu Init*/
	if($('.sidemenu').length > 0)
	$(".sidemenu").square_menu();
	
	/*Taking Prominent Color Start*/
		$('.get-color').primaryColor({
		callback: function(color) {
			$(this).parent('div,a').css('background-color', 'rgb('+color+')');
		}
	});
});


/*--------------------------------------------------
Windows Ready Function End
---------------------------------------------------*/

/*--------------------------------------------------
Windows Load Function Function start
---------------------------------------------------*/
$(window).load(function(){
	
   /*Preloader*/
   $(".pre-loader").addClass("loaded");
  	setTimeout(function() { 
		$(".wrapper").addClass("wrapper-in"); 
		$("header").addClass("header-anim"); 
		$("footer.footer-type-2").addClass("footer-anim"); 
		$(".project-detail-content").addClass("proj-anim"); 
	}, 1000);
   $(".pre-loader-anim").fadeOut();
   $(".pre-loader").delay(2000).fadeOut("slow");
   $("body").css("overflow-y","auto");
	
	/*Call for loads img*/
    if( $('.home-2,.home-3,.home-5,.gallery-style-page').length > 0 ){
	   imgLoading();
    }
	
	/*Home5 and Gallery-style-page Init*/
	if( $('.home-5,.gallery-style-page').length > 0 ){
		masonryPortfolio();
	}
	
});	
/*--------------------------------------------------
Windows Load Function Function end
---------------------------------------------------*/

/*--------------------------------------------------
Home2 & Horizontal Gallery Init start
---------------------------------------------------*/
if( $('.home-2,.horizontal-gallery').length > 0 ){
	
	var horgal = $("#horizontal_gal"), w = $(window);
	var horizontalGal = function(){
		var a = $(window).height(), 
		e = $(".gallery_horizontal") , 
		ww = $(window).width();
	  
		if (w.width() > 1023){
			$(".owl-carousel .item").each(function(index, el) {
				var img = $(this).find('img.get-color'),
				img_h = $(this).parent().height(),
				img_o_w = img.attr('data-width'),
				img_o_h = img.attr('data-height'),
				img_c_w = img_h*img_o_w/img_o_h;
				img.width(img_c_w);
				$(this).width(img_c_w);
			});
			
			horgal.owlCarousel({
				autoWidth: true,
				margin: 30,
				items: 4,
				smartSpeed: 1300,
				loop: true,
				nav: false,
				dots: false,
				autoplay:false,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				autoplaySpeed: 3600,
				responsive: false
			});
			if (!($('.portfolio-page').length > 0)){
				$('.zoomslider-item a').off('click');
				zoomslider();
			}
		} 
		else {
			horgal.trigger("destroy.owl.carousel");
			horgal.html(horgal.find('.owl-stage-outer').html()).removeClass('owl-loaded');
			horgal.attr('style','').find('.item , img').attr('style','');
			if (!($('.portfolio-page').length > 0)){
				$('.zoomslider-item a').off('click');
				zoomslider();
			}	
		}
	}
	horgal.on("mousewheel", ".owl-stage", function(e) {
		if (e.deltaY < 0) horgal.trigger("next.owl"); else horgal.trigger("prev.owl");
		e.preventDefault();
	});
}
/*--------------------------------------------------
Home2 & Horizontal Gallery Init end
---------------------------------------------------*/

/*--------------------------------------------------
Windows Height Function start
---------------------------------------------------*/
var elementHeight = function() {
	var height = $(window).height();
	var width = $(window).width();
	$('.full-height').css('height', (height));
	$('.full-height').css('height', (height));
	$('.content-without-footer').css('min-height', (height - 350));
	$('.content-without-hfsec-type').css('height', (height - 122));
};
/*--------------------------------------------------
Windows Height Function end
---------------------------------------------------*/

/*--------------------------------------------------
Windows Resize Function start
---------------------------------------------------*/
$(window).on("resize", function() {
    elementHeight();
	var width = $(window).width();
	var height = 0;
	
	if( $('.home-2').length > 0 )
		setTimeout(horizontalGal, 150);
		
	if($('.home-3').length > 0 ){
		if(width <= 1608 ) {
			 $('#copyright').detach().insertAfter($('.footer-type-2 > div'));
		}
		else
			$('#copyright').detach().appendTo($('.footer-type-2 > div > ul > li:nth-child(3)'));
	}

}).resize();	
/*--------------------------------------------------
Windows Resize Function end
---------------------------------------------------*/

/*--------------------------------------------------
HeroParallax Function start
---------------------------------------------------*/
var heroParallax = function() {
	var page_title = $('body');
		var block_intro = page_title.find('#hero');
		if( block_intro.length > 0 ) var block_intro_top = block_intro.offset().top;	
	$( window ).scroll(function() {
		var current_top = $(document).scrollTop(); 
		var hero_height = $('#hero').height();
		if( $('#hero').hasClass('parallax-hero')){			  
			block_intro.css('top', (current_top*0.5));			
		}
		if( $('#hero').hasClass('static-hero')){			  
			block_intro.css('top', (current_top*1));			
		}
		if( $('#hero').hasClass('opacity-hero')){				 
			block_intro.css('opacity', (1 - current_top/hero_height*1));
		}
	});
};
/*--------------------------------------------------
HeroParallax Function end
---------------------------------------------------*/

/*--------------------------------------------------
Landing Page Click Events Start
---------------------------------------------------*/
	$(document).on( 'click', ".goto-work", function (e) {
		e.preventDefault();
		scrollToProjects();
		masonryPortfolio();
		imgLoading();
		$('.main-content').css('height', 'auto');
	});
	$(document).on( 'click', ".goto-top > a", function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('.wrapper').offset().top+1
		}, 1000);
	});
	$(document).on( 'click', ".pre-click", function (e) {
		e.preventDefault();
	});
	$(document).on( 'click', ".submenu-wrap", function (e) {
		$(this).not(this).find('.submenu').removeClass('.menu-open');
		$( this ).find('.submenu').toggleClass( 'menu-open');
	});
	$(document).on( 'click', "button.trigger-overlay", function (e) {
		$(this ).toggleClass( 'open');
	});
/*--------------------------------------------------
Landing Page Click Events end
---------------------------------------------------*/


/*--------------------------------------------------
ImgLoading Function start
---------------------------------------------------*/
var imgLoading = function(){
	var delay = 0;
	$('.item').each(function(){ 
		$(this).appear(function() {							
			$(this).find('img').delay(delay).animate({
				opacity:1,
			});
			delay += 100;
		});
	});
    if( $('.home-3').length > 0 ){
		setTimeout(function() { 
			$('#split_slider .img-wrap-v div').fadeOut(2000); 
		}, 2000);
		setTimeout(function() { 
			$("#multiscroll-nav").addClass("nav-visible"); 
		}, 1500);
	}	
};
/*--------------------------------------------------
ImgLoading Function end
---------------------------------------------------*/

/*--------------------------------------------------
Scroll To Function start
---------------------------------------------------*/	
var scrollToProjects = function(){
	$('html, body').animate({
		scrollTop: $('.main-content').offset().top+1
	}, 1000, function(){
		$('#hero').remove();
		$('header').css({position: "fixed"});
		$(window).scrollTop(0);
	});
};
/*--------------------------------------------------
Scroll To Function end
---------------------------------------------------*/	


/*--------------------------------------------------
Function Masonry Portfolio start
---------------------------------------------------*/	
	var masonryPortfolio = function (suffle) {
		if( $('#portfolio-wrap').length > 0 ){	
			var $container = $('#portfolio');
			
			$('.cat-filter').click(function(){
				$('.cat-filter').removeClass('active');
				$('.reset-layout').removeClass('opac-disable');
				$('.reset-layout').addClass('opac-enable');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$container.isotope({ 
					filter: selector 
				});		
				return false;
			});
			$('.reset-layout.cat-filter').click(function(){
				$('.reset-layout').addClass('opac-disable');
				$('.reset-layout').removeClass('opac-enable');
			});
			var activate_port= (function(){
				$container.isotope({
				itemSelector: '.item',
				layoutMode: 'packery',
				transitionDuration: "0.8s",
				filter: '*'
			});		
			});
			
					
			$(window).on( 'resize', function () {
				var data_reset = $( "#portfolio" ).data( "col");
				var winWidth = window.innerWidth;
				columnNumb = 1;			
				var attr_col = $('#portfolio').attr('data-col');
			    	if (winWidth >= 1843) {
					$('#portfolio-wrap').css({width : winWidth + 'px'});
					var portfolioWidth = $('#portfolio-wrap').width();
					$('#portfolio-wrap.no-gutter').css( {width : 1280  + 'px'});			
					
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $( "#portfolio" ).data( "col");
					} else columnNumb = 4;
						
					var postWidth = Math.floor(portfolioWidth / columnNumb)
				
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 70 + 'px',
							height : 'auto', 
							margin : 35 + 'px' 
						});
						
						var height = $('.item').height();
						
						$('.item').css( { 
							height : height + 'px', 
						});
						
						$('.masonry .item').css( { 
							width : postWidth - 70 + 'px',
							height : 'auto',
							margin : 35 + 'px' 
						});
						
						$('.masonry .item.gap').css( { 
							width : postWidth - 70 + 'px',
							height : postWidth - 70 + 'px',
							margin : 35 + 'px', 
							padding :100 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 70 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 70 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.taller').css( {
							height : postWidth * 1.7 - 70 + 'px'  
						});
						$('.no-gutter .item.taller').css( {
							height : postWidth * 1.7  + 'px'  
						});
						$('.item.tallest').css( {
							height : postWidth * 1.2 - 70 + 'px'  
						});
						$('.no-gutter .item.tallest').css( {
							height : postWidth * 1.2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 70 + 'px',
							height : postWidth * 1.5 - 70 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
					
					
				} else if (winWidth > 1600) {
							
					$('#portfolio-wrap').css({width : winWidth + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 940  + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
								
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $( "#portfolio" ).data( "col");
					} else columnNumb = 4;
					
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						   
						$('.item').css( { 
							width : postWidth - 60 + 'px',
							height :'auto',
							margin : 30 + 'px' 
						});
						var height = $('.item').height();
						$('.item').css( { 
							height : height + 'px', 
						});
						$('.masonry .item').css( { 
							width : postWidth - 60 + 'px',
							height : 'auto',
							margin : 30 + 'px' 
						});
						$('.masonry .item.gap').css( { 
							width : postWidth - 60 + 'px',
							height : postWidth * 1.6 - 60 + 'px',
							margin : 30 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 60 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 60 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.taller').css( {
							height : postWidth * 1.7 - 60 + 'px'  
						});
						$('.no-gutter .item.taller').css( {
							height : postWidth * 1.7  + 'px'  
						});
						$('.item.tallest').css( {
							height : postWidth * 1.2 - 60 + 'px'  
						});
						$('.no-gutter .item.tallest').css( {
							height : postWidth * 1.2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 60 + 'px',
							height : postWidth * 1.5 - 60 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});	
					
				} else if (winWidth > 1024) {
					
					$('#portfolio-wrap').css({width : winWidth + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 940  + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
					if (suffle==1) {
						columnNumb = $( "#portfolio" ).data( "col");
					}
					else columnNumb = 3;
					
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 60 + 'px',
							height :'auto',
							margin : 30 + 'px' 
						});
						var height = $('.item').height();
						$('.item').css( { 
							height : height + 'px', 
						});
						$('.masonry .item').css( { 
							width : postWidth - 60 + 'px',
							height : 'auto',
							margin : 30 + 'px' 
						});
						$('.masonry .item.gap').css( { 
							width : postWidth - 60 + 'px',
							height : postWidth * 1.6 - 60 + 'px',
							margin : 30 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px',
							margin : 0 + 'px' 
						});
						if (columnNumb ==1) {
							$('.item.wide').css( { 
								width : postWidth - 60 + 'px'
							});
						}
						else {						
							$('.item.wide').css( { 
								width : postWidth * 2 - 60 + 'px'  
							});
						}
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 60 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.taller').css( {
							height : postWidth * 1.7 - 60 + 'px'  
						});
						$('.no-gutter .item.taller').css( {
							height : postWidth * 1.7  + 'px'  
						});
						$('.item.tallest').css( {
							height : postWidth * 1.2 - 60 + 'px'  
						});
						$('.no-gutter .item.tallest').css( {
							height : postWidth * 1.2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 60 + 'px',
							height : postWidth * 1.5 - 60 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
								
				}else if (winWidth > 767) {
					
					$('#portfolio-wrap').css({width : winWidth + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 600  + 'px'});
					
					var portfolioWidth = $('#portfolio-wrap').width();
					if (suffle==1) {
						columnNumb = $( "#portfolio" ).data( "col");
					}
					else
					columnNumb = 2;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 40 + 'px',
							height :'auto',
							margin : 20 + 'px' 
						});
						var height = $('.item').height();
						$('.item').css( { 
							height : height + 'px', 
						});
						$('.item.gap').css( { 
							height : postWidth* 0.75 - 40 + 'px',
						});
						$('.masonry .item').css( { 
							width : postWidth - 40 + 'px',
							height : 'auto',
							margin : 20 + 'px' 
						});
						$('.masonry .item.gap').css( { 
							width : postWidth - 40 + 'px',
							height : postWidth * 1.6 - 40 + 'px',
							margin : 20 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px',
							margin : 0 + 'px' 
						});
						if (columnNumb ==1) {
							$('.item.wide').css( { 
								width : postWidth - 40 + 'px',
							});
							
						}
						else 
						{
							$('.item.wide').css( { 
								width : postWidth * 2 - 40 + 'px'  
							});
						}	
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 40 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.taller').css( {
							height : postWidth * 1.7 - 40 + 'px'  
						});
						$('.no-gutter .item.taller').css( {
							height : postWidth * 1.7  + 'px'  
						});
						$('.item.tallest').css( {
							height : postWidth * 1.2 - 40 + 'px'  
						});
						$('.no-gutter .item.tallest').css( {
							height : postWidth * 1.2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 40 + 'px',
							height : postWidth * 1.5 - 40 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 1.5  + 'px'  
						});
					});
					
					
				}	else if (winWidth > 479) {
					
					$('#portfolio-wrap').css({width : winWidth + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 400  + 'px'});
					
					var portfolioWidth = $('#portfolio-wrap').width();
					if (suffle==1) {
						columnNumb = $( "#portfolio" ).data( "col");
					}
					else
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 40 + 'px',
							height :'auto',
							margin : 20 + 'px' 
						});
						var height = $('.item').height();
						$('.item').css( { 
							height : height + 'px', 
						});
						$('.masonry .item').css( { 
							width : postWidth - 40 + 'px',
							height : 'auto',
							margin : 20 + 'px' 
						});
						$('.masonry .item.gap').css( { 
							width : postWidth - 40 + 'px',
							height : postWidth * 1.6 - 40 + 'px',
							margin : 20 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px',
							margin : 0 + 'px' 
						});
						
						$('.item.wide').css( { 
							width : postWidth - 40 + 'px', 
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 40 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.taller').css( {
							height : postWidth * 1.7 - 40 + 'px'  
						});
						$('.no-gutter .item.taller').css( {
							height : postWidth * 1.7  + 'px'  
						});
						$('.item.tallest').css( {
							height : postWidth * 1.2 - 40 + 'px'  
						});
						$('.no-gutter .item.tallest').css( {
							height : postWidth * 1.2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth - 40 + 'px',
							height : postWidth * 1.6 - 40 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px'  
						});
					});
				}
				
				else if (winWidth <= 479) {
					
					$('#portfolio-wrap').css({width : winWidth + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 240  + 'px'});
					
					var portfolioWidth = $('#portfolio-wrap').width();
					if (suffle==1) {
						columnNumb = $( "#portfolio" ).data( "col");
					}
					else
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						
						$('.item').css( { 
							width : postWidth - 40 + 'px',
							height :'auto',
							margin : 20 + 'px' 
						});
						var height = $('.item').height();
						$('.item').css( { 
							height : height + 'px', 
						});
						$('.masonry .item').css( { 
							width : postWidth - 20 + 'px',
							height : 'auto',
							margin : 10 + 'px' 
						});
						$('.masonry .item.gap').css( { 
							width : postWidth - 20 + 'px',
							height : postWidth * 1.6 - 20 + 'px',
							margin : 10 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 1.6  + 'px',
							margin : 0 + 'px' 
						});
						
						$('.item.wide').css( { 
							width : postWidth - 20 + 'px', 
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 40 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.taller').css( {
							height : postWidth * 1.7 - 40 + 'px'  
						});
						$('.no-gutter .item.taller').css( {
							height : postWidth * 1.7  + 'px'  
						});
						$('.item.tallest').css( {
							height : postWidth * 1.2 - 40 + 'px'  
						});
						$('.no-gutter .item.tallest').css( {
							height : postWidth * 1.2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth - 40 + 'px',
							height : postWidth * 1.6 - 40 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth + 'px',
							height : postWidth * 1.6  + 'px'  
						});
					});
				}		
				return columnNumb;
			
			}).resize();
			suffle=0;
			activate_port();
		}
	};

/*--------------------------------------------------
Function Masonry Portfolio end
---------------------------------------------------*/	

/*--------------------------------------------------
Click Events start
---------------------------------------------------*/
if( $('#portfolio').length > 0 ){	
	$(document).on( 'click', ".one", function () {
			$( "#portfolio" ).data( "col", 1 );
			masonryPortfolio(1);
	});
	$(document).on( 'click', ".two", function () {
			$( "#portfolio" ).data( "col", 2 );
			masonryPortfolio(1);
	});	
	$(document).on( 'click', ".three", function () {
			$( "#portfolio" ).data( "col", 3 );
			masonryPortfolio(1);
	});
	$(document).on( 'click', ".four", function () {
			$( "#portfolio" ).data( "col", 4 );
			masonryPortfolio(1);
	});	
	$(document).on( 'click', ".five", function () {
			$( "#portfolio" ).data( "col", 5 );
			masonryPortfolio(1);
	});			
} 		
$(document).on( 'click', "#b_load", function () {
			$('#b_load').fadeOut('fast');
			$('.blog-block').each(function () {
				$(this).fadeIn();
			}); 
	});	
/*--------------------------------------------------
Click Events end
---------------------------------------------------*/	

/*--------------------------------------------------
some-structural start
---------------------------------------------------*/	
$( ".social-icons" ).clone().addClass("only-touch-device").appendTo( "header" );
/*--------------------------------------------------
some-structural start
---------------------------------------------------*/	

/*--------------------------------------------------
Instafeed  start
---------------------------------------------------*/
if( $('.about-page').length > 0 ){
	$('#instafeed').instagramLite({
		username: 'greatnorthco',
		clientID: '199554eb34504658a4770d2859b5a583',
		urls: true,
		load_more: '.il-foodnetwork-load-more',
		error: function(errorCode, errorMessage) {
		
			console.log('There was an error');
		
			if(errorCode && errorMessage) {
		
				alert(errorCode +': '+ errorMessage);
			
			}
		}
	});
	$("#touchScroller").simplyScroll({
            autoMode: 'loop'
    });
}
/*--------------------------------------------------
Instafeed  end
---------------------------------------------------*/
	
/*--------------------------------------------------
Subscribe JS start
---------------------------------------------------*/
if( $('#notifyMe').length > 0 )
$("#notifyMe").notifyMe();
/*--------------------------------------------------
Subscribe JS end
---------------------------------------------------*/	

/*--------------------------------------------------
Contact Form Init start
---------------------------------------------------*/
$( "#btn_submit" ).on( "click", function(e) {
  e.preventDefault();
  var mydata = $("form").serialize();
  
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "contact.php",
		data: mydata,
		success: function(data) {
			if( data["type"] == "error" ){
				$("#alert-msg").html(data["msg"]);
				$("#alert-msg").removeClass("alert-msg-success");
				$("#alert-msg").addClass("alert-msg-failure");
				$("#alert-msg").show();
			} else {
				$("#alert-msg").html(data["msg"]);
				$("#alert-msg").addClass("alert-msg-success");
				$("#alert-msg").removeClass("alert-msg-failure");					
				$("#input_name").val("");
				$("#input_email").val("");
				$("#textarea_message").val("");
				$(".btn").blur();
				$("#alert-msg").show();				
			}				
		},
		error: function(xhr, textStatus, errorThrown) {
		}
	});
	return false;
	$('#contact-form').attr("action", "saveQuery").submit();
});
/*--------------------------------------------------
Contact Form Init end
---------------------------------------------------*/			