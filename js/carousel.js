// Categories Carousel
const swiperCategories = new Swiper('.categories-wrapper.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.categories-wrapper .swiper-button-next',
    prevEl: '.categories-wrapper .swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  centerInsufficientSlides: true,
  watchOverflow: true,
  // edgeSwipeDetection: true
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  width: 152,
});

// Subcategories Carousel
const swiperSubcategories = new Swiper('.subcategories-wrapper.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.subcategories-wrapper .swiper-button-next',
    prevEl: '.subcategories-wrapper .swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  centerInsufficientSlides: true,
  watchOverflow: true,
  edgeSwipeDetection: true,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  width: 120,
});
