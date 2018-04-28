angular.module('Login', [])

.controller('LoginCtrl', function($state,$scope,$http,$rootScope,$ionicPopup,$ionicPlatform,$cordovaDevice) {
  
  // $ionicPlatform.ready(function() {
   
  //     var device = $cordovaDevice.getDevice();
  //     $scope.uuid = device.uuid;
  //     $scope.$apply();
  // });

  /*This is used to variable declaration using login page*/
  $scope.user = {
    email: '',
    password: ''
  }

  /*Click the login button to call the method  and check the response */
  $scope.login = function() {

    /*$state.go('dashboard');*/
    var data = {
      "email": $scope.user.email,
      "password": $scope.user.password,
      "device_id": '3EC5DA3E-A50C-4FCB-AB7E-EC6ACDEBB624'
    };

    $http({
      method: 'post',
      url: CommonURL + '/recruiters/login',
      data: data
    }).then(function(response) {
      if(response.data != false){
        $rootScope.company_Details=response.data.company;
        $rootScope.recruiters_Details=response.data.recruiter;
        $state.go('dashboard');
      }
      else{
        var loginalert = $ionicPopup.alert({
         title: 'Margino',
         template: 'Username or Password is invalid'
        })
      }
      
    })

  }

  $scope.forgot=function(){
    if($scope.user.email == ""){
      var forgotalert = $ionicPopup.alert({
        title: 'Margino',
        template: 'Please enter Email id'
      })
    }
    else{
      var data = {
        "email": $scope.user.email,
        "device_id": '3EC5DA3E-A50C-4FCB-AB7E-EC6ACDEBB624'
      };

      $http({
        method: 'post',
        url: CommonURL + '/recruiters/forget_password',
        data: data
      }).then(function(response) {
        if(response.data.result == "Invalid User"){
          var forgotresalert = $ionicPopup.alert({
           title: 'Margino',
           template: 'Please Enter Valid Email'
          })
        }
        else if(response.data.result == false){
          var mailalert = $ionicPopup.alert({
           title: 'Margino',
           template: 'Please check your mail'
          })
          // alert("Please check your mail");
          $state.go("register")
        }
        else{
          $rootScope.new_mail = $scope.user.email;
          $state.go("forgotPassword");
          
        }
        
      })
    }
  }

  /*To click the logout button using All pages and redirect to Login*/
  $scope.logout = function() {
    $state.go("login")
    //localStorage.clear();
  }

  // $scope.email = function() {
  //   alert("Cost Summary for James is send to your email.")
  //   $state.go("dashboard")
  // }

  


})

.controller('forgotCtrl',function($state,$http,$rootScope,$scope){
  $scope.forget={mail_id:$rootScope.new_mail,password:''}
  $scope.save=function(){
    var data = {
      "email": $scope.forget.mail_id,
      "new_password":$scope.forget.password
    };

    $http({
      method: 'post',
      url: CommonURL + '/recruiters/new_password_update',
      data: data
    }).then(function(response) {
      $state.go("login")
    })
  }
})