'use strict';
//
app.controller('aboutCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$sce) {
//	$scope.yijiulshow = flase;

	//关于胜遇
	var aboutShengA = 'aboutSheng';
	var aboutShengB = 'click';
	var aboutShengC = 'aboutShengS';
	_hmt.push(['_trackEvent', aboutShengA, aboutShengB, aboutShengC]);
	console.log(aboutShengC);

	var aboutTxt = function() {
		var options = {
    		service_code: 'WINMET_APP_GET_CONTENT',
   			params:{
    			service_code: 'WINMET_APP_GET_CONTENT',
    			content_type:'content_about'
    		}
		};
  		getInterface.jsonp(options, function (results) {
      		if(results.status == 'Y'){
      			var info = results.results;
      			if( info == ''){
      				$scope.noDataIcon = true;
      			}else{
      				$scope.noDataIcon = false;
      				$scope.aboutBook = info;
      			}
      			
			}		            	            
  		});
	} 
	aboutTxt();  
   	
});