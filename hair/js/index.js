const social = document.getElementById('mySocial');
const btn = document.getElementById("myBtn");
btn.onclick = function () {
  social.style.display = "block";
  btn.style.display = "none"
}
window.onclick = function (event) {
  if (event.target === social) {
    social.style.display = "none";
    btn.style.display = "inline"
  }
}

//
//
//

$(".page-sections-link").on("click", function (e) {
  e.preventDefault();
  const href = $(this).attr("href");
  const offset = $(href).offset().top;
  $("html, body").animate({
    scrollTop: offset,
  }, 3000);
});

//
//
//

$('.slick').slick({
  dots: true,
  infinite: true,
  touchThreshold: 100,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  pauseOnHover: true,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    }
  },
    {
      breakpoint: 559,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});