$(function () {
  var $heroCarousel = $(".hero-carousel");
  var autoplayDelay = 2600;
  var transitionSpeed = 900;
  var currentIndex = 0;
  var direction = 1;
  var autoplayId = null;

  if (!$heroCarousel.length || typeof $heroCarousel.owlCarousel !== "function") {
    return;
  }

  function updateAnimations() {
    var carousel = $heroCarousel.data("owl.carousel");

    if (!carousel) {
      return;
    }

    if (direction === 1) {
      carousel.settings.animateIn = "hero-slide-in-right";
      carousel.settings.animateOut = "hero-slide-out-left";
      return;
    }

    carousel.settings.animateIn = "hero-slide-in-left";
    carousel.settings.animateOut = "hero-slide-out-right";
  }

  function moveCarousel() {
    var totalSlides = $heroCarousel.find(".owl-item:not(.cloned)").length;
    var nextIndex = currentIndex + direction;

    if (totalSlides < 2) {
      return;
    }

    if (nextIndex >= totalSlides) {
      direction = -1;
      nextIndex = currentIndex - 1;
    } else if (nextIndex < 0) {
      direction = 1;
      nextIndex = currentIndex + 1;
    }

    updateAnimations();
    $heroCarousel.trigger("to.owl.carousel", [nextIndex, transitionSpeed, true]);
  }

  function scheduleNextMove() {
    window.clearTimeout(autoplayId);
    autoplayId = window.setTimeout(moveCarousel, autoplayDelay);
  }

  $heroCarousel.owlCarousel({
    items: 1,
    loop: false,
    rewind: false,
    margin: 0,
    dots: false,
    nav: false,
    autoplay: false,
    smartSpeed: transitionSpeed,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    animateIn: "hero-slide-in-right",
    animateOut: "hero-slide-out-left",
  });

  $heroCarousel.on("translated.owl.carousel", function (event) {
    currentIndex = event.item.index;
    scheduleNextMove();
  });

  scheduleNextMove();
});
