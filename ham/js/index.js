// SECTION-2
$(document).ready(function () {
    $('.services-list-item').on('click', function () {
        $(this).addClass('services-list-active')
            .siblings()
            .removeClass('services-list-active');
        const dataList = $(this).data('list');
        $('.services-content')
            .find(`[data-content = ${dataList}]`)
            .addClass('services-content-active')
            .siblings()
            .removeClass('services-content-active');
    });
});

// SECTION-4
$(document).ready(function () {
    const amazingList = $('.amazing-list-item');
    const amazingContent = $('.amazing-content-item');
    $(amazingList).on('click', function () {
        const filter = $(this).attr('data-filter');
        $(this).addClass('amazing-list-active');
        $(this).siblings().removeClass('amazing-list-active');
        if (filter === 'all') {
            $(amazingContent).hide();
            $(amazingContent).slice(0, 12).show();
            $(".load-more").show();
        } else {
            $(amazingContent).not('.' + filter).hide();
            $(amazingContent).filter('.' + filter).show();
            $('.load-more').hide();
        }
    });

// LOAD MORE
    let clicked = 0;
    $('#loader').hide();
    for (let i = 0; i < 12; i++) {
        $(amazingContent[i]).show();
    }
    $('.load-more').on('click', function () {
        clicked++;
        $('#loader').show();
        $('.load-more').hide();
        if (clicked === 1) {
            setTimeout(function () {
                $('#loader').hide();
                for (let i = 12; i < 24; i++) {
                    $(amazingContent[i]).fadeIn('slow');
                }
                $('.load-more').show();
            }, 2000);
        }
        if (clicked === 2) {
            setTimeout(function () {
                $('#loader').hide();
                for (let i = 24; i < amazingContent.length; i++) {
                    $(amazingContent[i]).fadeIn('slow');
                }
                $('.load-more').hide();
            }, 2000);
        }
    });
});

// SECTION-6
$(document).ready(function () {
    $('.reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        fade: true,
        asNavFor: '.reviews-slider-nav',
    });
    $('.reviews-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        draggable: true,
        focusOnSelect: true,
        pauseOnHover: true,
        centerMode: true,
        prevArrow: "<span class='slick  slick-prev'><i class='fa fa-chevron-left'></i></span>",
        nextArrow: "<span class='slick slick-next'><i class='fa fa-chevron-right'></i></span>",
        asNavFor: '.reviews-slider',
    });
});