'use strict';
//
app.controller('statementCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$sce) {
	
	//法律声明
	var legalStatementA = 'legalStatement';
	var legalStatementB = 'click';
	var legalStatementC = 'legalStatementS';
	_hmt.push(['_trackEvent', legalStatementA, legalStatementB, legalStatementC]);
	console.log(legalStatementC);
	
	var stateTxt = function() {
		var options = {
    		service_code: 'WINMET_APP_GET_CONTENT',
   			params:{
    			service_code: 'WINMET_APP_GET_CONTENT',
    			content_type:'content_law'
    		}
		};
  		getInterface.jsonp(options, function (results) {
      		if(results.status == 'Y'){
      			var info = results.results;
      			if( info == ''){
      				$scope.noDataIcon = true;
      			}else{
      				$scope.noDataIcon = false;
      				$scope.stateBook = info;
      			}
      			
			}		            	            
  		});
	} 
	stateTxt(); 
   	
});