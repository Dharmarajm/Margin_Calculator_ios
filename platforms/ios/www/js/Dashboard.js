angular.module('Dashboard', [])

.controller('DashCtrl', function($scope,$state,$http,$rootScope,$cordovaSocialSharing,$cordovaInAppBrowser,$ionicPopup) {
  $rootScope.company_name=$rootScope.company_Details.company_name;
  $http.get(CommonURL + "/recruiters/configuration_details?company_id=50")
    .then(function(response) {
        $rootScope.OverAllData = response.data;
   });
 
  $scope.start = function() {
    $state.go("tab.consultant")
  }

  $scope.boom = function(val) {
    console.log(val);
  };

   $scope.sharetwitter=function(message, image, link){
   $cordovaSocialSharing
    .shareViaTwitter(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
      // alert(err)
    });
   }

   $scope.sharefb=function(message, image, link){
    $cordovaSocialSharing
    .shareViaFacebook(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // if (err == false) {

      //       var options = {
      //         location: 'yes',
      //         clearcache: 'yes',
      //         toolbar: 'no'
      //       };


      //       $cordovaInAppBrowser.open('https://play.google.com/store/apps/details?id=com.facebook.katana', '_blank', options)
      //         .then(function(event) {

      //         })
      //         .catch(function(event) {

      //         })


      //       $cordovaInAppBrowser.close();

      //       /*window.open('https://plus.google.com/+NicRaboy', '_system', 'location=yes'); return false; */
      //     }
      // An error occurred. Show a message to the user
     });
   }

   $scope.shareInsta=function(social,message,subject,image,link){
    $cordovaSocialSharing
    .canShareVia(social,message,subject,image,link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
      // alert(err)
    });
   } 
})

