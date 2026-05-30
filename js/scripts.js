(function ($) {
    "use strict";

    // ---- Theme toggle (single class drives everything via CSS vars) ----
    var $toggle = $('#dark-mode');

    function applyTheme(isLight) {
        if (isLight) {
            $('body').addClass('light-mode');
            $('.circle').addClass('circle-light');
            $('.circle2').addClass('circle2-light');
        } else {
            $('body').removeClass('light-mode');
            $('.circle').removeClass('circle-light');
            $('.circle2').removeClass('circle2-light');
        }
    }

    // Restore saved preference (default: dark)
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var startLight = saved === 'light';
    $toggle.prop('checked', startLight);
    applyTheme(startLight);

    $toggle.on('change', function () {
        var isLight = $(this).prop('checked');
        applyTheme(isLight);
        try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (e) {}
    });

    // ---- Smooth scrolling ----
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({ scrollTop: target.offset().top - 71 }, 800, 'easeInOutExpo');
                return false;
            }
        }
    });

    // ---- Scroll-to-top button ----
    $(document).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // ---- Close responsive menu on link click ----
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // ---- Scrollspy ----
    $('body').scrollspy({ target: '#mainNav', offset: 80 });

    // ---- Navbar shrink on scroll ----
    var navbarCollapse = function () {
        if ($('#mainNav').offset().top > 100) {
            $('#mainNav').addClass('navbar-shrink');
        } else {
            $('#mainNav').removeClass('navbar-shrink');
        }
    };
    navbarCollapse();
    $(window).scroll(navbarCollapse);

})(jQuery);
