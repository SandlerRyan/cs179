// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'firebase','ui.bootstrap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'PetsCtrl'
        }
      }
    })

    .state('app.list', {
      url: "/list",
      views: {
        'menuContent' :{
          templateUrl: "templates/list.html",
          controller: 'ListCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html"
        }
      }
    })
    .state('app.manage', {
      url: "/manage",
      views: {
        'menuContent' :{
          templateUrl: "templates/manage.html",
          controller: 'PetsCtrl'
        }
      }
    })
    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/logout.html"
        }
      }
    })
    .state('app.profile', {
      url: "/profile/:petId",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'PetCtrl'
        }
      }
    })
    .state('app.confirmation_book', {
      url: "/confirmation_book",
      views: {
        'menuContent' :{
          templateUrl: "templates/confirmation_book.html"
        }
      }
    })
    .state('app.confirmation_list', {
      url: "/confirmation_list",
      views: {
        'menuContent' :{
          templateUrl: "templates/confirmation_list.html"
        }
      }
    })
    .state('app.book', {
      url: "/book",
      views: {
        'menuContent' :{
          templateUrl: "templates/book.html",
          controller:"DateCtrl"
        }
      }
    })
    .state('app.AddTimes', {
      url: "/addtimes/:petId",
      views: {
        'menuContent' :{
          templateUrl: "templates/AddTimes.html",
          controller: 'TimeCtrl'
        }
      }
    })
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"
        }
      }
    })
    .state('app.register', {
      url: "/register",
      views: {
        'menuContent' :{
          templateUrl: "templates/register.html"
        }
      }
    })
    .state('app.filter', {
      url: "/filter",
      views: {
        'menuContent' :{
          templateUrl: "templates/filter.html"
        }
      }
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

