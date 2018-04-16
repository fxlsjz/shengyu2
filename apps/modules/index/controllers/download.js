'use strict';
//
app.controller('download', function ($rootScope, $scope, $state, $stateParams, $location, getInterface, userInfo,$sce,errorCode) {
	$scope.loadbutton = function(){
		window.location.href = "http://fund.test.chinamobo.com/uploads/download/FundManager.ipa";

	}
});
