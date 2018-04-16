'use strict';
//
app.controller('instructCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$sce) {
	
	//使用说明
	var instructionA = 'instruction';
	var instructionB = 'click';
	var instructionC = 'instructionS';
	_hmt.push(['_trackEvent', instructionA, instructionB, instructionC]);
	console.log(instructionC);
	//左边的“使用说明”
	var instructionLeftA = 'instructionLeft';
	var instructionLeftB = 'click';
	var instructionLeftC = 'instructionLeftS';
	
	$scope.addUse = function(){
		_hmt.push(['_trackEvent', instructionLeftA, instructionLeftB, instructionLeftC]);
		console.log(instructionLeftC);
	}
			
	$scope.instructName = $state.current.name;
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.instructName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.instructName == "/statement" || $scope.instructName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
//	  	alert($scope.aboutName)
	});
    
	var instructions = function() {
		var options = {
    		service_code: 'WINMET_APP_GET_CONTENT',
   			params:{
    			service_code: 'WINMET_APP_GET_CONTENT',
    			content_type:'content_use'
    		}
		};
  		getInterface.jsonp(options, function (results) {
      		if(results.status == 'Y'){
      			$scope.explainBook = results.results;
			}		            	            
  		});
	} 
	instructions();   
	
   	
});