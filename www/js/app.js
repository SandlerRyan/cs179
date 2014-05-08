// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'firebase','ui.bootstrap', 'ngCookies'])

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

    .state('app.filtered', {
      url: "/filtered/type/:type/",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'FiltedCtrl'
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

    .state('app.addpet', {
      url: "/addpet",
      views: {
        'menuContent' :{
          templateUrl: "templates/addpet.html",
          controller: 'ListCtrl'
        }
      }
    })

    .state('app.pets', {
      url: "/pets",
      views: {
        'menuContent' :{
          templateUrl: "templates/pets.html",
          controller: "PetsCtrl"
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
    .state('app.rentals', {
      url: "/rentals",
      views: {
        'menuContent' :{
          templateUrl: "templates/rentals.html",
          controller: 'PetsCtrl'
        }
      }
    })

    .state('app.rate_pet', {
      url: "/rate_pet",
      views: {
        'menuContent' :{
          templateUrl: "templates/rate_pet.html",
          controller: 'RateCtrl'
        }
      }
    })

    .state('app.listings', {
      url: "/listings",
      views: {
        'menuContent' :{
          templateUrl: "templates/listings.html",
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
      url: "/book/:petId",
      views: {
        'menuContent' :{
          templateUrl: "templates/book.html",
          controller:"DateCtrl",
          resolve: {
            dates: function($stateParams){
              var dates = new Array();
              //pull pet availability from database
              var availRef = new Firebase("https://petaway.firebaseio.com/Pet_Availability");
              
              availRef.once('value', function(dataSnapshot) {
                snap = dataSnapshot;
              });

              snap.forEach(function(childSnapshot) {
                  var pet = childSnapshot.val();
                  if (pet.pet_id == $stateParams.petId) {
                    var date = pet.date;
                    dates.push(date);
                  }
                });
              return dates;
              }

            }
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
          templateUrl: "templates/filter.html",
          controller: 'FiltCtrl'
        }
      }
    })
    .state('app.list2', {
      url: "/list2/:petId",
      views: {
        'menuContent' :{
          templateUrl: "templates/list2.html",
          controller: 'List2Ctrl'
        }
      }
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

