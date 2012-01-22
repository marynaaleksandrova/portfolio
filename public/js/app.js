/**
 * License
 *
 *(The MIT License)
 *
 * Copyright (c) 2011 Aleksandrova Maryna <hello@marynaaleksandrova.info>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
move.select = function(selector){
  return $(selector).get(0);
};
var App = {
  init: function(){
    this.appView = new AppView();  
    this.router = new AppRouter();
    Backbone.history.start({pushState: true, root: ''});
  }
};

var AppView = Backbone.View.extend({
  el: $('body'),
  $dashboard: $('#dashboard-container'),
  events: {
    'click .portfolio-item-preview': 'clickPortfolioItem',
    'click a.nav-link': 'gotoNavLink'
  },
  initialize: function(){
    _.bindAll(this, 'clickPortfolioItem', 'showPortfolioItem', 'showDashboard', 'rightOffscreenPosition', 
      'leftOffscreenPosition', 'moveRightOffscreen', 'gotoNavLink');
    this.moveRightOffscreen($('.page-container.inactive'));
  },
  // Calculate position for the page that should be placed out off the screen - on the left side.
  leftOffscreenPosition: function(){ return -1 * this.rightOffscreenPosition(); },

  // Calculate position for the page that should be placed out off the screen - on the right side.
  rightOffscreenPosition: function(){ return $(window).width() + 10; },

  // Move page right off the screen.
  moveRightOffscreen: function(el){ return el.css("left", this.rightOffscreenPosition()); },

  // Go to link without refreshing the whole page.
  gotoNavLink: function(e){
    e.preventDefault();
    var link = $(e.currentTarget).attr('href');
    App.router.gotoPath(link);
  },
  clickPortfolioItem: function(e){
    var item = $(e.currentTarget),
        itemId = $(item).data('porfolio-item-id');
    this.showPortfolioItem(itemId);
  },
  showPortfolioItem: function(itemId){
    var itemPage = $('#' + itemId),
        dashboardPage = this.$dashboard;
    this.$(this.el).scrollTop(0);
    move(dashboardPage)
      .set('left', -2000)
      .end(function(){
        itemPage.removeClass('inactive').addClass('active');
        dashboardPage.removeClass('active').addClass('inactive');
        move(itemPage)
          .set('left', 0)
          .end(function(){
          });
      });
  },
  showDashboard: function(){
    var itemPage = $('.portfolio-item.active'),
        dashboardPage = this.$dashboard;
    move(dashboardPage)
      .set('left', 0)
      .end(function(){
        dashboardPage.removeClass('inactive').addClass('active');
        if(itemPage){
          itemPage.removeClass('active').addClass('inactive');
          //move(itemPage)
           // .set('left', -2000)
           // .end(function(){
            //});
        }
      });
  }

});

var AppRouter = Backbone.Router.extend({
  routes:{
    '/': 'showDashboard',
    '/works/:id': 'showItem',
  },
  gotoPath: function(path){
    this.navigate(path, true);
  },
  showDashboard: function(){
    App.appView.showDashboard();
  },
  showItem: function(id){	
    App.appView.showPortfolioItem(id);
  }
});
