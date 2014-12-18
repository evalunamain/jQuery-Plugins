$.Tabs = function (el) {
  this.$el = $(el);

  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = this.$contentTabs.find(".active");
  var tabs = this;
  this.$el.on("click", "a", function (event) {
    event.preventDefault();
    tabs.clickTab(event);
    });
 };

 $.Tabs.prototype.clickTab = function (event) {
   $('a.active').removeClass("active");

   this.$activeTab.toggleClass("active");
   this.$activeTab.toggleClass("transitioning");
   var $target = $(event.currentTarget);

   this.$activeTab.one('webkitTransitionEnd', function(e) {
     this.$activeTab.toggleClass('transitioning');
     $target.toggleClass("active");

     var id = $target.attr('href');
     var $newActiveTab = $(id);
     $newActiveTab.toggleClass("active").toggleClass("transitioning");
     window.setTimeout(function () {
       $newActiveTab.toggleClass("transitioning");
     },0);

     this.$activeTab = $newActiveTab;
   }.bind(this));

 };

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
