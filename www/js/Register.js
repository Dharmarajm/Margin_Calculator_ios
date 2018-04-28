angular.module('Register', [])

.controller('RegisterCtrl', function($ionicPlatform,$scope, $state, $http, $rootScope,$ionicPopup,$cordovaDevice) {


  $ionicPlatform.ready(function() {
  
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
      console.log(device,$scope.uuid);
 });
  
  $scope.user = {
    email: '',
    active: '',
    password: '',
    confirm_password: ''
  }
  

 /* alert($cordovaDevice.getUUID());
  console.log($cordovaDevice.getUUID())*/
 
  $scope.register = function() {
    if ($scope.user.password != $scope.user.confirm_password) {
      var registeralert = $ionicPopup.alert({
        title: 'Margino',
        template: 'Password does not matching'
      })
    } else {
      var data = {
        "email": $scope.user.email,
        "activation_code": $scope.user.active,
        "password": $scope.user.password,
        "device_id":$scope.uuid
      };
      console.log(data)
      $http({
        method: 'post',
        url: CommonURL + '/recruiters/recuriter_register',
        data: data
      }).then(function(response) {
        if(response.data.data != 'Invalid User') {
          localStorage.setItem("user", 0)
          $state.go('login');
        } else {
          var registerInvalert = $ionicPopup.alert({
           title: 'Margino',
           template: 'Your Email id or Activation code is invalid'
          })
        }


      })
    }
    /*localStorage.setItem("user", 0)*/
    /*$state.go('login');*/
  }



})

.controller('changePasswordCtrl',function($scope,$rootScope,$http,$state){
  
  $scope.change={new_password:'',old_password:''}
  $scope.ConfirmChange=function(){
    var data = {
      "recruiter_id": $rootScope.recruiters_Details.id,
      "old_password": $scope.change.old_password,
      "new_password": $scope.change.new_password
    };
    $http({
      method: 'post',
      url: CommonURL + '/recruiters/change_password',
      data: data
    }).then(function(response) {
      if(response.data.result != 'Invalid') {
        localStorage.setItem("user", 0)
        $state.go('login');
      } else {
        var confirmalert = $ionicPopup.alert({
          title: 'Margino',
          template: 'Old password is wrong'
        })
      }
    })
  }


  $scope.cancel=function(){
    $state.go("dashboard")
  }
})