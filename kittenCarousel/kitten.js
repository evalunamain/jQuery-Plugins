$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$activeImg = $('div.items img:first-child');
  this.$activeImg.addClass("active");
  var carousel = this;
  this.transitioning = false;

  $('.slide-left').on('click', function (event) {
    event.preventDefault();
    carousel.slide(-1);
  });

  $('.slide-right').on('click', function (event) {
    event.preventDefault();
    carousel.slide(1);
  });

};

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) {
    return;
  }

  this.transitioning = true;
  var $oldImg = this.$activeImg
  if (dir === -1) {
    this.activeIdx -= 1;
    if (this.activeIdx < 0) {
      this.activeIdx += 7;
    }

    $oldImg.addClass("right");

    var $img = this.$activeImg = this.$el.find('img').eq(this.activeIdx);

    $img.addClass("active").addClass("left");

    $oldImg.one('webkitTransitionEnd', function(e) {
      $oldImg.removeClass("right").removeClass("active");
      this.transitioning = false;
    }.bind(this));

    window.setTimeout( function() {
      $img.removeClass("left");
    },0);

  } else {
      this.activeIdx += 1;
      if (this.activeIdx > 6) {
        this.activeIdx -= 7;
      }

    $oldImg.addClass("left");
    var $img = this.$activeImg = this.$el.find('img').eq(this.activeIdx);

    $img.addClass("active").addClass("right");

    $oldImg.one('webkitTransitionEnd', function(e) {
      $oldImg.removeClass("left").removeClass("active");
      this.transitioning = false;
    }.bind(this));

    window.setTimeout( function() {
      $img.removeClass("right");
    }, 0);
  }


};


$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
