angular.module('Setting', [])

.controller('SettingCtrl', function($scope,$state,$http,$rootScope,$ionicPopup) {
	$scope.changePassword=function(){
		$state.go('changePassword')
	}
})