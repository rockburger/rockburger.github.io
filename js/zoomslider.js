/*!
 * zoom-slider
 */
function zoomslider() { 
var mouse = {x: 0, y: 0};
	var $container=$('.zoomslider');
		$('.zoomslider-item a').on('click', function(e){
			e.preventDefault();
			$('body').append('<div class="image-viewer"><img class="active-img" src="'+$(this).attr('href')+'" /></div>');
			$container.find('.zoomslider-item a').not(this).each(function () { 
				$('.image-viewer').append('<img src="'+$(this).attr('href')+'" />');
				$('.image-viewer img').panzoom({
					 minScale: 1,
				});
			});
			// Remove duplicate images
			$(function(){
				var srcs = [],
					temp;
				$(".image-viewer img").filter(function(){
					temp = $(this).attr("src");
					if($.inArray(temp, srcs) < 0){
						srcs.push(temp);   
						return false;
					}
					return true;
				}).remove();
			});
			if(!($('.zoomslider-item').hasClass('single-image')))
				$('body').append('<div class="close-btn"></div><div class="next"></div><div class="prev"></div>');
				else
					{
						$('body').append('<div class="close-btn"></div>');
						$('.image-viewer img').panzoom({
							 minScale: 1,
						});
					}	
			
			// Next Prev Arrow Navigations
			$(".next").on('click', function(e){
				next();
			});

			$(".prev").on('click', function(e){
				prev();
			});
			$(".close-btn").on('click', function(e){
				closeviewer();
			});
			// Key Bindings
			$(document).keydown(function(e) {
				switch(e.which) {
					case 37: // left
						prev();
					break;

					case 27: // esc
					$('.image-viewer').removeClass('visible');
					$('.next,.prev').remove();
					setTimeout(function(){
						$('.image-viewer').remove();
					}, 500);
					break;

					case 39: // right
						next();
					break;
					case 38: // up
						$('img.active-img').css('top', 0);
					break;
					case 40: // down
						var img_height=$('img.active-img').height();
						var window_height=$(window).height();
						var top_val= img_height-window_height;
						$('img.active-img').css('top', -top_val+'px');
					break;
					default: return; // exit this handler for other keys
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});
			
			// Image Loads
			$('.image-viewer').imagesLoaded(function(){
				mousemoveFullscreen();
				$('.image-viewer').addClass('visible');
				$('.image-viewer').on('mousemove', mousemoveFullscreen);

			}).on('click', function(e){
				e.preventDefault();
				closeviewer();
			});
			
				function closeviewer(e){
					$('.image-viewer').removeClass('visible');
					$('.next,.prev,.close-btn').remove();
					setTimeout(function(){
						$('.image-viewer').remove();
					}, 500);
					
				};
			// Next & Prev Functions
			function next(e){
				var $toHighlight = $('.active-img').next().length > 0 ? $('.active-img').next() : $('.image-viewer img').first();
				$('.active-img').removeClass('active-img');
				$toHighlight.addClass('active-img');
				$('.image-viewer').unbind('mousemove');
				mousemoveFullscreen();
				$('.image-viewer').on('mousemove', mousemoveFullscreen);
				
			};
			function prev(e){
				var $toHighlight = $('.active-img').prev().length > 0 ? $('.active-img').prev() : $('.image-viewer img').last();
				$('.active-img').removeClass('active-img');
				$toHighlight.addClass('active-img');
				$('.image-viewer').unbind('mousemove');
				mousemoveFullscreen();
				$('.image-viewer').on('mousemove', mousemoveFullscreen);
			};
			
		});
		
		// Mousemove Functions
		function mousemoveFullscreen(e,imgHeight){
			// Container Data
			//alert();
			var $section = $('.image-viewer'),
			 $object = $('.image-viewer');

			if(typeof e != "undefined") {
				var posY = e.clientY;
				
			}
			else {
				var posY = mouse.y;
			}
			if(imgHeight != undefined) {
				var midY = $section.height() / 2;
			}
			else {
				var midY = $object.height() / 2;
			}

			var percY = 0;

			// Image Data
			var $img = $('img.active-img', $object);
			if(imgHeight != undefined) {
				var extraY = (imgHeight - $section.height()) / 2;
			} else {
				var extraY = ($img.height() - $object.height()) / 2;
			}
			var posTop = 0;

			// Top

			if(posY < midY){
				percY = (midY - posY) / midY;
				posTop = - extraY + (percY * extraY);
			}
			// Bottom
			else {
				percY = - ((posY - midY) / midY);
				posTop = - extraY+(percY * extraY);
			}


			if(e != '') $('img.active-img', $object).css('top', posTop+'px');
			else return posTop;
		}
}
zoomslider();		