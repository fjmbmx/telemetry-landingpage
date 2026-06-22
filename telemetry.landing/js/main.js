(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Cerrar el menú móvil al tocar un enlace o el logo
    $('#navbarCollapse .nav-link, .navbar-brand').on('click', function () {
        var $collapse = $('#navbarCollapse');
        if ($collapse.hasClass('show')) {
            var bsCollapse = bootstrap.Collapse.getInstance($collapse[0])
                || new bootstrap.Collapse($collapse[0], { toggle: false });
            bsCollapse.hide();
        }
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    
    // Back to top button + mostrar WhatsApp tras bajar 10%
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > 700) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }

        // WhatsApp aparece después de bajar el 10% de la página
        var docHeight = $(document).height() - $(window).height();
        if (docHeight > 0 && scrollTop / docHeight >= 0.10) {
            $('.wa__btn_popup').addClass('wa-visible');
        } else {
            $('.wa__btn_popup').removeClass('wa-visible');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 100, 'easeInOutExpo');
        return false;
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 800,
        items: 1,
        dots: true,
        loop: true,
        responsive: {
            768: { items: 2 },
            1200: { items: 3 }
        }
    });

    // Animated counters — stats overlay visible on load, trigger after short delay
    setTimeout(function () {
        $('.counter-value').each(function () {
            var $el = $(this);
            var target = parseInt($el.data('target'));
            var suffix = $el.data('suffix') || '';
            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $el.text(Math.floor(this.count) + suffix);
                },
                complete: function () {
                    $el.text(target + suffix);
                }
            });
        });
    }, 600);

    // Cookie consent
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(function () { $('#cookie-consent').fadeIn(400); }, 1500);
    }
    $('#cookie-accept').on('click', function () {
        localStorage.setItem('cookieConsent', 'accepted');
        $('#cookie-consent').fadeOut(300);
    });
    $('#cookie-decline').on('click', function () {
        localStorage.setItem('cookieConsent', 'declined');
        $('#cookie-consent').fadeOut(300);
    });

    
    
})(jQuery);

