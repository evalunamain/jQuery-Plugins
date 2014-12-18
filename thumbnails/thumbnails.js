$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$activeImg = this.$el.find("img:first-child");
  this.activate(this.$activeImg);

  this.$gutterImages = this.$el.find('.gutter-images');
  this.$images = this.$gutterImages.find('img');

  this.gutterIdx = 0;

  this.fillGutterImages();

  this.installImgHandlers();
  this.installNavHandlers();
};

$.Thumbnails.IMGCOUNT = 10;

$.Thumbnails.prototype.installImgHandlers = function () {
    this.$gutterImages.on('click', 'img', function (event) {
      var $target = $(event.currentTarget);
      this.$activeImg = $target;
      this.activate($target);
    }.bind(this));

    this.$gutterImages.on('mouseenter', 'img', function (event) {
      var $target = $(event.currentTarget);
      this.activate($target);
    }.bind(this));

    this.$gutterImages.on('mouseleave', 'img', function (event) {
      this.activate(this.$activeImg);
    }.bind(this));
};

$.Thumbnails.prototype.installNavHandlers = function () {
    $('.left').on('click', function (event) {
      event.preventDefault();
      this.gutterIdx -= 1;
      this.fillGutterImages();
    }.bind(this));

    $('.right').on('click', function (event) {
      event.preventDefault();
      this.gutterIdx += 1;
      this.fillGutterImages();
    }.bind(this));
};

$.Thumbnails.prototype.activate = function ($img) {
  this.$el.find('.active').empty();
  var $clonedImg = $img.clone();
  this.$el.find('.active').append($clonedImg);
};

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$gutterImages.empty();
  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    var j = i;
    if (i >= $.Thumbnails.IMGCOUNT) {
      j -= $.Thumbnails.IMGCOUNT;
    } else if (i < 0) {
      j += $.Thumbnails.IMGCOUNT;
    }

    var $img = this.$images.eq(j);
    this.$gutterImages.append($img);
  };
};


$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
