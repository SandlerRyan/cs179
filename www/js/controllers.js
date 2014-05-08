angular.module('starter.controllers', ["firebase","ui.bootstrap", 'ngCookies'])

.controller('AppCtrl', function($scope) {
})

//filter for home page
// .filter('pet_filter', function($cookieStore) {
//   return function (input) {
//     console.log(input.type);
//     $filter_type = $cookieStore.get('filter_type');
//     if ($filter_type) {
//       if (input.type===$filter_type) {
//       return input;
//       }
//     }
//     else{
//       return input;
//     }
    
//   };
// })

.controller('PetsCtrl', function($scope, $firebase, $cookieStore) {
	var petRef = new Firebase("https://petaway.firebaseio.com/Pets");
	$scope.pets = $firebase(petRef);


  //helper functions for the filter
  function check_type (atype, selected) {
    if (selected == 'All') {
      return true
    }
    else if (atype == selected.toLowerCase()) {
      return true
    }
    else {
      return false
    }
  }
  //function to filter cost and ratings
  function cost_in_range (cost, range) {
    if (range=='All'){
      return true
    }
    else if (range=='<$10'){
      if (cost < 10) {
        return true
      }
      else {return false}
    }
    else if (range=='$10-20'){
      if (cost >= 10 && cost < 20) {
        return true
      }
      else {return false}
    }
    else if (range=='$20-30'){
      if (cost >= 20 && cost < 30) {
        return true
      }
      else {return false}
    }
    else if (range=='$30+'){
      if (cost >= 30) {
        return true
      }
      else {return false}
    }
  }

  //function to filter cost and ratings
  function rating_in_range (rating, range) {
    if (range=='All'){
      return true
    }
    else if (range=='1+ stars'){
      if (rating >= 1) {
        return true
      }
      else {return false}
    }
    else if (range=='2+ stars'){
      if (rating >= 2) {
        return true
      }
      else {return false}
    }
    else if (range=='3+ stars'){
      if (rating >= 3) {
        return true
      }
      else {return false}
    }
    else if (range=='4+ stars'){
      if (rating >= 4) {
        return true
      }
      else {return false}
    }
    else if (range=='5 stars'){
      if (rating == 5) {
        return true
      }
      else {return false}
    }
  }

  $scope.pet_filter = function(pets) {
    $filter_type = $cookieStore.get('filter_type');
    $filter_cost = $cookieStore.get('filter_cost');
    $filter_rating = $cookieStore.get('filter_rating');
    var result = {};

      angular.forEach(pets, function(value,key) {
        if (check_type(value.type, $filter_type) &&
          cost_in_range(value.price, $filter_cost) &&
          rating_in_range(value.rating, $filter_rating)) 
        {
          result[key] = value;
        }
      });
      return result;

  }

})

.controller('FiltCtrl', function($scope, $firebase, $stateParams, $location, $cookieStore) {
 if($cookieStore.get('filter_type') == null){
  $cookieStore.put('filter_type', 'All');
 }
 if($cookieStore.get('filter_cost') == null){
  $cookieStore.put('filter_cost', 'All');
 }
 if($cookieStore.get('filter_rating') == null){
  $cookieStore.put('filter_rating', 'All');
 }

 $scope.type = $cookieStore.get('filter_type');
 $scope.cost = $cookieStore.get('filter_cost');
 $scope.rating = $cookieStore.get('filter_rating');
  $scope.filter = function(type, cost, rating) {
    $cookieStore.put('filter_type', type);
    $cookieStore.put('filter_cost', cost);
    $cookieStore.put('filter_rating', rating);
    $location.path("/app/home");
  }
})

// .controller('FiltedCtrl', function($scope, $firebase, $stateParams) {
//   var petRef = new Firebase("https://petaway.firebaseio.com/Pets");
//   $scope.pets = $firebase(petRef);

//   $scope.stype = $stateParams[0];

// })

//to-do: make it go to actual stateParams
.controller('PetCtrl', function($scope, $firebase, $stateParams, $location) {
  var petRef = new Firebase("https://petaway.firebaseio.com/Pets/" + $stateParams.petId);
  $scope.pet = $firebase(petRef);


  $scope.book = function() {
    console.log('hello');
    $location.path("/app/book/" + $stateParams.petId);
  }

})

.controller('ManageCtrl', function($scope, $ionicPopup) {
	$scope.showConfirm = function() {
        $ionicPopup.confirm({
          title: 'Cancel Booking/Listing',
          content: 'Are you sure you want to cancel this booking or listing?'
        }).then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };    
})



.controller('DateCtrl', function($scope, $firebase, $stateParams, dates) {
   $scope.shouldDateBeDisabled = function(date, mode) {
      // your own logic to determine if a date should be disabled
      date1 = new Date(date);
      for(var i=0; i < dates.length; i++){
        console.log(dates[0]);
        var date2 = new Date(dates[i]);
        if (date1.getTime() === date2.getTime()) {

          return false;
        }
      }
      return true;
    };

  
  $scope.today = function() {
    $scope.dt = new Date();
  }
  $scope.today();

  $scope.showWeeks = false;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.visible = "display:none"

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[2];


  $scope.show = function($date) {
    $scope.times = ["1800", "2000"];
  }
     
})


.controller('RateCtrl', function($scope) {
  $scope.rate1 = 0;
  $scope.rateq = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.onLeave = function(value){
    $scope.rate = value;
  }

  $scope.setVal1 = function(value){
    $scope.rate1 = value;
  }

  $scope.setVal2 = function(value){
    $scope.rate2 = value;
  }
})

.controller('ListCtrl', function($scope, $firebase, $location, $window) {

  //var petRef = new Firebase("https://petaway.firebaseio.com/Available_pets");
  //$scope.pets = $firebase(petRef);

  //var typesRef = new Firebase("https://petaway.firebaseio.com/animal_types");
  //$scope.types = $firebase(typesRef);

  $scope.types = ["dog", "cat", "bird", "monkey", "bunny", "other"];


  //var breedsRef = new Firebase("https://petaway.firebaseio.com/Pets");
  //$scope.breeds = $firebase(breedsRef);

  var petRef = new Firebase("https://petaway.firebaseio.com/Pets");
  $scope.pets = $firebase(petRef);

  $scope.newPet = function(pet) {
    // if (pet.name == null) {
    //   $window.alert("Please fill in all required");
    //   console.log("hello")
    // }
    // else{
    //   var ref = petRef.push(pet);
    // }
    
    var ref = petRef.push(pet);
    var id = ref.name()
    $location.path("/app/list2/" + id);
  }

   $scope.newPet2 = function(pet) {
    var ref = petRef.push(pet);
    
    var id = ref.name()
    $location.path("/app/pets");
  }
})


.controller('List2Ctrl', function($scope) {
  $scope.oneAtATime = true;

  

  $scope.dates = [];
  for(var i =0;i<7;i++){
    var d = moment().add('days',i).calendar();
    var time = [];
    var now = moment().hour() + 1;
    if(i == 0){
      for(var j = now; j<22;j++){
        var t = moment().hour(j);
        time[j-now] = moment(t).format('hA');
      }
    }else {
      for(var j = 9;j<22;j++){
        var t = moment().hour(j);
        time[j-9] = moment(t).format('hA');
      }
    }

    $scope.dates[i] = 
    { day: d,
      times:time
    };
  }
})


/*
.controller('TimeCtrl', function($scope, $firebase, $stateParams) {
  var timesRef = new Firebase("https://petaway.firebaseio.com/Pet_Availability");

  $scope.newTimes = function() {
    var ref = timesRef.push({'pet_id': $stateParams.petId, 'date': '05/04/2014', 'start_time': '1100', 'end_time': '1400'});
    $location.path("/app/confirmation_list/" + $stateParams.petId);
  }

})
*/
