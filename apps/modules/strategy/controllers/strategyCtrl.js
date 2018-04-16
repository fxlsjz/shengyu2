'use strict';
//
app.controller('strategyCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll) {
	
//	var _hmt = _hmt || [];
	var strategyA = 'tabStrategy';//策略管理
	var strategyB = 'click';
	var strategyC = 'strategy';
	_hmt.push(['_trackEvent', strategyA, strategyB, strategyC]);

	/*选项卡切换*/
	$scope.changeActive=1;
    $scope.changes=function(index,id){
    	$scope.changeActive=index;
    	$location.hash(id);
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
    }

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.strategyName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.strategyName == "/statement" || $scope.strategyName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
	});
   	
});
