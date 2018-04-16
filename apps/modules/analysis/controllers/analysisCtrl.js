'use strict';
//
app.controller('analysisCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll) {
	
//	var _hmt = _hmt || [];
	var analysisA = 'tabAnalysis';//分析工具
	var analysisB = 'click';
	var analysisC = 'analysis';
	_hmt.push(['_trackEvent', analysisA, analysisB, analysisC]);
	//工商信息
	var businessInformationA = 'businessInformation';
	var businessInformationB = 'click';
	var businessInformationC = 'businessInformationS';
	//信用风险评析
	var creditRiskAnalysisA = 'creditRiskAnalysis';
	var creditRiskAnalysisB = 'click';
	var creditRiskAnalysisC = 'creditRiskAnalysiS';
	//主体财务状况评分
	var principalScoreA = 'principalScore';
	var principalScoreB = 'click';
	var principalScoreC = 'principalScoreS';
	//风险传导
	var riskConductionA = 'riskConduction';
	var riskConductionB = 'click';
	var riskConductionC = 'riskConductionS';
	//高危经营模式
	var highRiskModelA = 'highRiskModel';
	var highRiskModelB = 'click';
	var highRiskModelC = 'highRiskModelS';
	
	
	$scope.analysisName = $state.current.name;
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.analysisName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.analysisName == "/statement" || $scope.analysisName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
//	  	alert($scope.aboutName)
	});
	/*选项卡切换*/
	$scope.changeActive=1;
    $scope.changes=function(index){
//  	alert(index);
    	$scope.changeActive=index;
    	$scope.changeActiveul = "";
    	$location.hash('');
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
    }
    $scope.changeul=function(id){
    	if(id == 'analysis_b'){
    		_hmt.push(['_trackEvent', businessInformationA, businessInformationB, businessInformationC]);
    		console.log(businessInformationC);
    	}else if(id == 'analysis_xyfxfx'){
    		_hmt.push(['_trackEvent', creditRiskAnalysisA, creditRiskAnalysisB, creditRiskAnalysisC]);
    		console.log(creditRiskAnalysisC);
    	}else if(id == 'analysis_c'){
    		_hmt.push(['_trackEvent', principalScoreA, principalScoreB, principalScoreC]);
    		console.log(principalScoreC);
    	}else if(id == 'analysis_p'){
    		_hmt.push(['_trackEvent', riskConductionA, riskConductionB, riskConductionC]);
    		console.log(riskConductionC);
    	}else if(id == 'analysis_q'){
    		_hmt.push(['_trackEvent', highRiskModelA, highRiskModelB, highRiskModelC]);
    		console.log(highRiskModelC);
    	}
    	$scope.changeActiveul=id;
    	$location.hash(id);
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
		//3.7点击锚点调用一次3.7接口，这样就可以实现会话时间（10分钟）重新开始往后延长至10分钟。
		var threeSeven = function(){
			var options = {
		        service_code: 'WINMET_APP_KEEP_ALIVE',
		        params:{
		        	service_code: 'WINMET_APP_KEEP_ALIVE'
		        }
			};
		    getInterface.jsonp(options, function (results) {
		        if(results.status == 'Y'){	
//		        	alert(1)
				}
//		        else{
//		        	alert(results.error_msg)
//		        }
		    });
		}
		threeSeven();
    }
    

	
   	
});
