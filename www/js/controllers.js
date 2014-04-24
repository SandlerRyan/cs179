angular.module('starter.controllers', ["firebase","ui.bootstrap"])

.controller('AppCtrl', function($scope) {
})

//todo- send each pet's name to scope
.controller('PetsCtrl', function($scope, $firebase) {
	var petRef = new Firebase("https://petaway.firebaseio.com/Pets");
	$scope.pets = $firebase(petRef);

})

//to-do: make it go to actual stateParams
.controller('PetCtrl', function($scope, $firebase, $stateParams) {
  var petRef = new Firebase("https://petaway.firebaseio.com/Pets/" + $stateParams.petId);
  $scope.pet = $firebase(petRef);
  $scope.petId = $stateParams.petId;

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

.controller('DateCtrl', function($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
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
    $scop.today();
  };

  $scope.visible = "display:none"

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[2];

var dates = [new Date("04/19/2014"), new Date("04/22/2014"), new Date("05/11/2014")];
// var arrayOfDatesToDisable = [...];
$scope.shouldDateBeDisabled = function(date, mode) {
  // your own logic to determine if a date should be disabled
  date1 = new Date(date);
  for(var i=0; i<dates.length;i++){
    if (date1.getTime() === dates[i].getTime()) {
    return true;
    }
  }

  // if (dateIsInArray(date,arrayOfDatesToDisable) {
  //   return true;
  // }

  return false;
};

})
     


.controller('ListCtrl', function($scope, $firebase, $location) {

  //var petRef = new Firebase("https://petaway.firebaseio.com/Available_pets");
  //$scope.pets = $firebase(petRef);

  //var typesRef = new Firebase("https://petaway.firebaseio.com/animal_types");
  //$scope.types = $firebase(typesRef);

  $scope.types = ["dog", "cat", "bird", "monkey", "bunny", "other"];

  var breedsRef = new Firebase("https://petaway.firebaseio.com/Pets");
  $scope.breeds = $firebase(breedsRef);

  $scope.newPet = function(pet) {
    var ref = petRef.push(pet);
    
    var id = ref.name()
    $location.path("/app/addtimes/" + id);
  }
})

.controller('List2Ctrl', function($scope) {
  $scope.oneAtATime = true;

  

  $scope.dates = [];
  for(var i =0;i<7;i++){
    var d = moment().add('days',i).calendar();
    
    var time = [];
    if(i === 0){
      var left = moment().endOf('day').fromNow();
      for(var j = 0; j<left;j++){
        // var t = moment().hour();
        // time[j] = moment(now).format('hA');
      }
    }else {
      for(var j = 0;j<24;j++){
        var t = moment().hour(j);
        time[j] = moment(t).format('hA');
      }
    }

    $scope.dates[i] = 
    { day: d,
      times:time
    };
  }



  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };
})


/*
.controller('TimeCtrl', function($scope, $firebase, $stateParams) {
  var petRef = new Firebase("https://petaway.firebaseio.com/Available_pets" + $stateParams);
  $scope.pets = $firebase(petRef);

  $scope.newPet = function(pet) {
    var ref = $scope.pets.$add(pet);
    $location.path("/#/app/addtimes");
  }
})
*/
