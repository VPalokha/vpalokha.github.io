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


$(".page-sections-link").on("click", function (e) {
  e.preventDefault();
  const href = $(this).attr("href");
  const offset = $(href).offset().top;
  $("html, body").animate({
    scrollTop: offset,
  }, 3000);
});