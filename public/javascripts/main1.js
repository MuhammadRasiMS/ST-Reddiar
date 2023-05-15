(function ($) {
  "use strict";

  /*-- Menu Sticky --*/
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $(".sticker").removeClass("stick");
    } else {
      $(".sticker").addClass("stick");
    }
  });

  /*-- Bootstrap Menu Fix For Mobile --*/
  $(document).on("click", ".navbar-collapse.in", function (e) {
    if ($(e.target).is("a")) {
      $(this).collapse("hide");
    }
  });

  /*-- portfolio --*/
  // images have loaded
  $(".portfolio-box").imagesLoaded(function () {
    // Isotop Active
    $(".portfolio-menu").on("click", "li", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });

    // Isotop Full Grid
    var $grid = $(".grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-item",
      },
    });
    // Isotop Menu Active
    $(".portfolio-menu li").on("click", function (event) {
      $(this).siblings(".active").removeClass("active");
      $(this).addClass("active");
      event.preventDefault();
    });
  });

  /*-- Magnific Popup --*/
  $(".img-poppu").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*-- scrollUp jquery active -- */
  $.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade",
  });

  /*-- counterUp -- */
  $(".count").counterUp({
    delay: 10,
    time: 5000,
  });
})(jQuery);
