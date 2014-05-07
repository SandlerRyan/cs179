angular.module('starter.controllers', ["firebase","ui.bootstrap"])

.controller('AppCtrl', function($scope) {
})


.controller('PetsCtrl', function($scope, $firebase) {
	var petRef = new Firebase("https://petaway.firebaseio.com/Pets");
	$scope.pets = $firebase(petRef);

})
.controller('FiltCtrl', function($scope, $firebase, $stateParams) {
 
  $scope.filter = function($type, $cost) {
    $location.path("/app/filtered/type" + $type + "/cost/" + $cost);
  }
})

.controller('FiltedCtrl', function($scope, $firebase, $stateParams) {
  var petRef = new Firebase("https://petaway.firebaseio.com/Pets");
  $scope.pets = $firebase(petRef);

  $scope.stype = $stateParams[0];
  $scope.scost = $stateParams[1];

})

//to-do: make it go to actual stateParams
.controller('PetCtrl', function($scope, $firebase, $stateParams) {
  var petRef = new Firebase("https://petaway.firebaseio.com/Pets/" + $stateParams.petId);
  $scope.pet = $firebase(petRef);
  $scope.pet.pet_id = $stateParams.petId;

  //wtf wont go to book...
  $scope.book = function() {
    $location.path("/app/book/");
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

.controller('ListCtrl', function($scope, $firebase, $location) {

  //var petRef = new Firebase("https://petaway.firebaseio.com/Available_pets");
  //$scope.pets = $firebase(petRef);

  //var typesRef = new Firebase("https://petaway.firebaseio.com/animal_types");
  //$scope.types = $firebase(typesRef);

  $scope.types = ["dog", "cat", "bird", "monkey", "bunny", "other"];


  //var breedsRef = new Firebase("https://petaway.firebaseio.com/Pets");
  //$scope.breeds = $firebase(breedsRef);

  var petRef = new Firebase("https://petaway.firebaseio.com/Pets");

  $scope.newPet = function(pet) {
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
      console.log(time);
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
