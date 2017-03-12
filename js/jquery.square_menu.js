! function(n) {
    var e = {
        flyDirection: "bottom",
        animationStyle: "vertical",
        closeButton: "X"
    };
    n.fn.square_menu = function(a) {
        var s = n.extend({}, e, a),
            i = n(this);
        n("body").addClass("fsm-body"), i.addClass("sm-menu sm-" + s.flyDirection + " sm-" + s.animationStyle), i.wrapInner("<div class='sm-wrapper'></div>"), i.find(".effect").addClass("sm-nav").wrapInner("<div class='nav-inner'></div>"), n.fn.closeMenu = function(selector, dtype) {if (dtype=='video')$(".nav-inner iframe").vimeo("unload"); n('#'+selector+".sm-menu").removeClass("animated").removeClass("re-rotate"), n('#'+selector+".sm-menu .sm-close").remove(), n('#'+selector+".sm-menu .sm-nav:first-child .nav-inner").removeClass("animated "+dtype), n(".sm-menu .sm-nav:nth-child(2) .nav-inner").removeClass("animated flyInRight"), n("body").hasClass("sm-activate") && (n('#'+selector+".sm-menu").find(".sm-nav").removeClass("animated"), n("body").removeClass("sm-activate"), n('#'+selector+".sm-menu").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                n("body").find('#'+selector+".sm-menu").removeClass("ff-hack");
                n("body").find(".sm-overlay").remove();
            }))
        }, n.fn.openMenu = function(selector, dtype,animtyp) {
			//alert(dtype);
			n('#'+selector+".sm-menu").addClass("animated").addClass("ff-hack"), n("body").hasClass("sm-activate") ? i.closeMenu(selector, dtype) : (n(".sm-overlay").length < 1 && n("<div class='sm-overlay'></div>").hide().prependTo("body"), n(".sm-overlay").fadeIn("fast", function() {
				n("body").addClass("sm-activate");
				var e = !1;
				n("body").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
					e || (e = !0, n('#'+selector+".sm-menu .sm-nav").addClass("animated"), n(".sm-overlay").addClass("clicked").click(function() {
						i.closeMenu(selector, dtype)
					}), n('#'+selector+".sm-menu  .nav-inner").addClass("animated " +animtyp), n('#'+selector+".sm-menu").prepend("<a href='#' class='sm-close'>" + s.closeButton + "</a>"), n(".sm-close").click(function() {
						return i.closeMenu(selector, dtype), !1
					}), n('#'+selector+".sm-menu .sm-nav").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
						("-webkit-transform" == e.originalEvent.propertyName || "transform" == e.originalEvent.propertyName || "-o-transform" == e.originalEvent.propertyName || "-moz-transform" == e.originalEvent.propertyName) && n('#'+selector+".sm-menu").addClass("re-rotate")
					}))
				})
			}))
	  }, 0 != s.button, n(".sm-button").on( "click", function(e) {
			e.preventDefault();
			var selector = $(this).attr('data-target');
			var dtype = $(this).attr('data-type'),animtyp="";
			if (dtype=='video')animtyp='flyIn'; else animtyp='flyInLeft';
		    return i.openMenu(selector , dtype , animtyp), !1
        })
    }
}(window.jQuery);