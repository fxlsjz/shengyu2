app.controller('analyComCtrl', function ($rootScope, $scope, $state, $stateParams,$location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$http,$timeout) {
	
	//全局按钮
	var sousuobuttonA = 'sousuobuttonCommon';
	var sousuobuttonB = 'click';
	var sousuobuttonC = 'sousuobuttonCommonS';
	//+监控
	var joinMonitorA = 'joinMonitorCommon';
	var joinMonitorB = 'click';
	var joinMonitorC = 'joinMonitorCommonS';
		//加入监控的“是”按钮
	var joinMonitorAddA = 'joinMonitorAddCommon';
	var joinMonitorAddB = 'click';
	var joinMonitorAddC = 'joinMonitorAddCommonS';
	//+收藏
	var joinCollectionA = 'joinCollectionCommon';
	var joinCollectionB = 'click';
	var joinCollectionC = 'joinCollectionCommonS';
		//+收藏的“是”按钮
	var collectionAddA = 'collectionAdd';
	var collectionAddB = 'click';
	var collectionAddC = 'collectionAddS';
	//加入黑名单
	var joinBlackListA = 'joinBlackListCommon';
	var joinBlackListB = 'click';
	var joinBlackListC = 'joinBlackListCommonS';
		//+黑名单的“是”按钮
	var backListAddA = 'backListAdd';
	var backListAddB = 'click';
	var backListAddC = 'backListAddS';
	//加入红名单
	var joinRedListA = 'joinRedListCommon';
	var joinRedListB = 'click';
	var joinRedListC = 'joinRedListCommonS';
		//+红名单的“是”按钮
	var redListAddA = 'redListAdd';
	var redListAddB = 'click';
	var redListAddC = 'redListAddS';
	//企业概况
	var enterpriseProfileA = 'enterpriseProfile';
	var enterpriseProfileB = 'click';
	var enterpriseProfileC = 'enterpriseProfileS';
	
	$scope.a = $state.current.name;
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.a = '/'+url[2];
	  	if($scope.a == "/enterprise"){
			_hmt.push(['_trackEvent', enterpriseProfileA, enterpriseProfileB, enterpriseProfileC]);
			console.log(enterpriseProfileC);
	  	}
	});

	
	
	$scope.info_red = userInfo.getObject('profile_info_red');//红名单权限
	
	/*
	 * 初始化数据
	 * 
	 */
	
	var companyId;//公司id
	var tampCompanyName;
	var companyName;//公司名称
	var creditCode; //统一社会信用代码
	var companyCode;//企业注册号
	$rootScope.searchKey = {
		text:''
	}
	/***************************弹窗 start*************************/
	$scope.errcodeBomb = false;
	$scope.supportPlay = false;
	$scope.addmonitorPlay = false;//监控
	$scope.addblackPlay = false;//黑名单
	$scope.addRedHtml = false;//红名单
	$scope.addcollectPlay = false;//收藏
	$scope.noshowDialog = false;
	$scope.tip = false;
	
	/*弹框*/
//   点击尽调支持
    $scope.supportColl = function(){
		$scope.supportPlay = true;
	}
	
	/*关闭弹出框*/
	$scope.noplayBox = function(){
		$scope.supportPlay = false;
		$scope.addmonitorPlay = false;//监控
		$scope.addblackPlay = false;//黑名单
		$scope.addRedHtml = false;//红名单
		$scope.addcollectPlay = false;//收藏
		$scope.noshowDialog = false;
		$scope.tip = false;
	}
    $scope.okplay = function(){
		$scope.supportPlay = false;
		$scope.addmonitorPlay = false;
		$scope.addcollectPlay = false;
		$scope.addblackPlay = false;
	}
	$scope.noplay = function(){
		$scope.supportPlay = false;
		$scope.addmonitorPlay = false;
		$scope.addcollectPlay = false;
		$scope.addblackPlay = false;
	}
	
	$scope.newClose = function(){
		$scope.tip = false;
	}
	
	$scope.closeMonitor = function(){
		$scope.addmonitorPlay = false;
	};
	// 错误信息
    $scope.noBomb = function(){
//  	e.stopPropagation();
		$scope.errcodeBomb = false;
	};
	$scope.okBomb = function(){
//		e.stopPropagation();
//		alert('sss');
		$scope.errcodeBomb = false;
	};
	/***************************弹窗 end*************************/

	//	4.2.企业预警信息
	/********************模拟数据 start*************************/
	
	
	/**********************模拟数据 end**********************/
	
    
    
//  $scope.b =function(colleList){
//		alert(colleList)
//		alert('调对应的接口')
//		$scope.colleList = colleList;
//		alert($scope.colleList)
//	}
    
    
	//监控收藏夹7.4
    var monitorJia = function() {
    	var options = {
	        service_code: 'WINMET_APP_MONITOR_SET_LIST',
	        params:{
	        	service_code: 'WINMET_APP_MONITOR_SET_LIST',
	        	type:1
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	$scope.monitorListS = results.results;
//          	alert(JSON.stringify($scope.monitorListS))
    			$scope.allListS = $scope.monitorListS;//监控文件夹的名字
//  			$scope.colleListOne = $scope.monitorListS[0].display_name;//默认为第一个
				if($scope.monitorListS.length > 0){
					$scope.monitorAllList = $scope.monitorListS[0].display_name;//监控默认的第一个
					$scope.addmonitorPlay = true;
				}else{
					$scope.addmonitorPlay = false;
					$scope.tip = true;
            		$scope.tipTxt = '请先创建文件夹';
				}
    			
			}		            	            
        });
	} 
// 	monitorJia();
	//+监控
	$scope.joinMonitorC = function(company_name){
		_hmt.push(['_trackEvent', joinMonitorA, joinMonitorB, joinMonitorC]);
		console.log(joinMonitorC)
//		alert(company_name)
		monitorJia();
//		alert($scope.colleListOne + '000000000')
//		$scope.addmonitorPlay = true;
		//$scope.showMonitor()
//		$scope.monitorAllList = $scope.allListS[0].display_name;
		//点击确认
		$scope.addCollection = function(monitorAllList){
			_hmt.push(['_trackEvent', joinMonitorAddA, joinMonitorAddB, joinMonitorAddC]);
			console.log(joinMonitorAddC)
//			alert(monitorAllList);
			monitorJia();//7.4
			for(var i =0; i<$scope.monitorListS.length; i++){
    			if($scope.monitorListS[i].display_name == monitorAllList){
	    			$scope.set_idMonitor = $scope.monitorListS[i].set_id;
			 	}
		 	}
			if($rootScope.$_userSearchData){
				creditCode = $rootScope.$_userSearchData.creditCode; //原统一社会信用代码
				companyCode = $rootScope.$_userSearchData.companyCode;//原企业注册号
				companyName = $rootScope.$_userSearchData.companyName;
			}
			//加入监控7.2
			var joinMonitor = function() {
		    	var options = {
			        service_code: 'WINMET_APP_ADD_MONITOR',
			        params:{
			        	service_code: 'WINMET_APP_ADD_MONITOR',
				        set_id:$scope.set_idMonitor,
				        company_code:companyCode,
				        credit_code:creditCode,
//				        entry_name:company_name
				        entry_name:companyName
			        }
		    	};
		        getInterface.jsonp(options, function (results) {
		            if(results.status == 'Y'){
		            	$scope.errcodeBomb = true;
						$scope.errcodeText = '加入成功';
		            	$scope.addmonitorPlay = false;//弹框消失
//		            	alert($scope.set_idMonitor)
//		            	alert(monitorAllList)
		            	$scope.getMonitorResults = [];
		            	$scope.getMonitorResults.push(monitorAllList);//文件名称
		            	$scope.getMonitorResults.push($scope.set_idMonitor);//文件名称的id
		            	$scope.$emit('joinMonitorSuccess', $scope.getMonitorResults);
					}	
					else{
						$scope.addmonitorPlay = false;
						$scope.tip = true;
						$scope.tipTxt = results.error_msg;
					}
		        });
			} 
		   	joinMonitor();
		}
	};		
	//取消监控
	$scope.removeMonitorC = function(company_name){
//		alert(company_name)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否取消监控？';
		$scope.noattent = function(){
			
//			alert('调取消监控的接口');
			//取消监控7.3
//			var cancelMonitor = function() {
//		    	var options = {
//			        service_code: 'WINMET_APP_CANCEL_MONITOR',
//			        params:{
//			        	service_code: 'WINMET_APP_CANCEL_MONITOR',
//				        set_id:,
//				        entry_id:company_name
//			        }
//		    	};
//		        getInterface.jsonp(options, function (results) {
//		            if(results.status == 'Y'){	
//		            	
//					}		            	            
//		        });
//			} 
//		   	cancelMonitor();
		}
	}
	
	//收藏夹6.4
	var favoritesGuanli = function() {
    	var options = {
	        service_code: 'WINMET_APP_COLLECTION_SET_LIST',
	        params:{
	        	service_code: 'WINMET_APP_COLLECTION_SET_LIST',
	        	type:1
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	$scope.itemListS = results.results;
    			$scope.allCollectList = $scope.itemListS;//收藏夹的名字
    			
    			if(results.counts != 0){
    				$scope.aCollect = $scope.itemListS[0].display_name;//默认为第一个
    				$scope.addcollectPlay = true;
    			}else{
    				$scope.addcollectPlay = false;
    				$scope.tip = true;
            		$scope.tipTxt = '请先创建文件夹';
    			}
    			
//  			$scope.colleList = $scope.itemListS[0].display_name;
			}		            	            
        });
	} 
// 	favoritesGuanli();
	//+收藏
	$scope.joinCollectC = function(company_name){
		_hmt.push(['_trackEvent', joinCollectionA, joinCollectionB, joinCollectionC]);
		console.log(joinCollectionC)
//		alert(company_name)
		favoritesGuanli();//6.4
//		$scope.addcollectPlay = true;
		//点击确认
		$scope.okAdd = function(aCollect){
			_hmt.push(['_trackEvent', collectionAddA, collectionAddB, collectionAddC]);
			console.log(collectionAddC)
//			alert(aCollect)
//			favoritesGuanli();//6.4
			for(var i =0; i<$scope.itemListS.length; i++){
    			if($scope.itemListS[i].display_name == aCollect){
	    			$scope.set_idCollection = $scope.itemListS[i].set_id;
			 	}
		 	}
			if($rootScope.$_userSearchData){
				creditCode = $rootScope.$_userSearchData.creditCode; //原统一社会信用代码
				companyCode = $rootScope.$_userSearchData.companyCode;//原企业注册号
				companyName = $rootScope.$_userSearchData.companyName;
			}
//			alert(creditCode)
//			alert(companyCode)
//			alert(companyName)
			//+收藏6.2
			var joinColl = function() {
		    	var options = {
			        service_code:'WINMET_APP_ADD_COLLECTION',
			        params:{
			        	service_code:'WINMET_APP_ADD_COLLECTION',
				        set_id:$scope.set_idCollection,
				        company_code:companyCode,
				        credit_code:creditCode,
//				        entry_name:company_name
				        entry_name:companyName
			        }
		    	};
		        getInterface.jsonp(options, function (results) {
		            if(results.status == 'Y'){
		            	$scope.errcodeBomb = true;
						$scope.errcodeText = '加入成功';
		            	$scope.addcollectPlay = false;
//		            	alert($scope.set_idCollection)//得到文件名称的id
		            	$scope.getCollectResults = [];
		            	$scope.getCollectResults.push(aCollect);//文件名称
		            	$scope.getCollectResults.push($scope.set_idCollection);//文件名称的id
//		            	aCollect
		            	$scope.$emit('joinSuccess', $scope.getCollectResults);
					}
		            else{
		            	$scope.addcollectPlay = false;
		            	$scope.tip = true;
						$scope.tipTxt = results.error_msg;
		            }
		        });
			} 
		   	joinColl();
		}
	}
		
	//取消收藏
	$scope.removeCollectC = function(company_name){
//		alert(company_name)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否取消收藏';
		$scope.noattent = function(){
			
//			alert('调取消收藏的接口')
			//取消收藏6.3
//			var cancelCollection = function() {
//		    	var options = {
//			        service_code: 'WINMET_APP_CANCEL_COLLECTION',
//			        params:{
//			        	service_code: 'WINMET_APP_CANCEL_COLLECTION',
//				        set_id:,
//				        entry_id:company_name
//			        }
//		    	};
//		        getInterface.jsonp(options, function (results) {
//		            if(results.status == 'Y'){	
//		            	
//					}		            	            
//		        });
//			} 
//		   	cancelCollection();
		}
	}
	//管理黑名单8.4
	var blackListGuanli = function() {
    	var options = {
	        service_code: 'WINMET_APP_BLACK_SET_LIST',
	        params:{
	        	service_code: 'WINMET_APP_BLACK_SET_LIST',
	        	type:1
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){	
            	$scope.blackListName = results.results;
//          	alert($scope.blackListName.length)
//          	if($scope.blackListName.length != 0){
//          		
//          	}
//          	$scope.addBlackLists = $scope.blackListName[0].display_name;
//          	alert($scope.blackListName)
            	if($scope.blackListName != ''){
            		$scope.addBlackLists = $scope.blackListName[0].display_name;
            		$scope.addblackPlay = true;
            	}else{
            		$scope.addblackPlay = false;//黑名单
		           	$scope.tip = true;
					$scope.tipTxt = '请先创建文件夹';
            	}
    			
    			//黑名单8.1
//				var oldBlackList = function() {
//				  	var options = {
//				        service_code: 'WINMET_APP_BLACK_LIST',
//				        params:{
//				        	service_code: 'WINMET_APP_BLACK_LIST',
//				        	set_id:$scope.set_id
//				        }
//				  	};
//				    getInterface.jsonp(options, function (results) {
//				        if(results.status == 'Y'){	
//				          	$scope.blackList = results.results.list;
//						}		            	            
//				    });
//				} 
//			 	oldBlackList();
			}
        });
	} 
// 	blackListGuanli();
	//加入黑名单
	$scope.joinBlackC = function(company_name){
		_hmt.push(['_trackEvent', joinBlackListA, joinBlackListB, joinBlackListC]);
		console.log(joinBlackListC)
//		alert(company_name)
		blackListGuanli();//8.4
//		$scope.addblackPlay = true;
//		alert($scope.nameBlack)
		//点击确认
		$scope.okplayBlack = function(addBlackLists){
			_hmt.push(['_trackEvent', backListAddA, backListAddB, backListAddC]);
			console.log(backListAddC)
//			alert(addBlackLists)
//			blackListGuanli();//8.4
			for(var i =0; i<$scope.blackListName.length; i++){
    			if($scope.blackListName[i].display_name == addBlackLists){
	    			$scope.set_idBlack = $scope.blackListName[i].set_id;
			 	}
		 	}
			if($rootScope.$_userSearchData){
				creditCode = $rootScope.$_userSearchData.creditCode; //原统一社会信用代码
				companyCode = $rootScope.$_userSearchData.companyCode;//原企业注册号
				companyName = $rootScope.$_userSearchData.companyName;
			}
			//加入黑名单8.2
			var joinBlacklist = function() {
		    	var options = {
			        service_code: 'WINMET_APP_ADD_BLACK',
			        params:{
			        	service_code: 'WINMET_APP_ADD_BLACK',
				        set_id:$scope.set_idBlack,
				        company_code:companyCode,
				        credit_code:creditCode,
//				        entry_name:company_name
				        entry_name:companyName
			        }
		    	};
		        getInterface.jsonp(options, function (results) {
		            if(results.status == 'Y'){
		            	$scope.errcodeBomb = true;
						$scope.errcodeText = '加入成功';
		            	$scope.addblackPlay = false;//黑名单
		            	
//			          	alert($scope.set_idBlack)
//		            	alert(addBlackLists)
						$scope.getBlackListResults = [];
						$scope.getBlackListResults.push(addBlackLists);//文件名称
						$scope.getBlackListResults.push($scope.set_idBlack);//文件名称的id
						$scope.$emit('joinBlackSuccess', $scope.getBlackListResults);
		            	
		            	if($scope.nameBlack == addBlackLists){
//		            		blackListGuanli();//8.4
							//8.1
							var newBlackList = function() {
							  	var options = {
							        service_code: 'WINMET_APP_BLACK_LIST',
							        params:{
							        	service_code: 'WINMET_APP_BLACK_LIST',
							        	set_id:$scope.set_idBlack
							        }
							  	};
							    getInterface.jsonp(options, function (results) {
							        if(results.status == 'Y'){	
//							        	alert($scope.set_idBlack)
							          	$scope.blackList = results.results.list;
//							          	alert($scope.blackList + 'ccccccccccc')
									}		            	            
							    });
							}							
		            	}		            	
					}
		            else{
		            	$scope.addblackPlay = false;//黑名单
		            	$scope.tip = true;
						$scope.tipTxt = results.error_msg;
		            }
		        });
			} 
		   	joinBlacklist();
		}
	}
	//取消黑名单
	$scope.removeBlackC = function(company_name){
//		alert(company_name)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否移除黑名单';
		$scope.noattent = function(){
			
//			alert('调取消黑名单的接口')
			//取消黑名单8.3
//			var cancelBlack = function() {
//		    	var options = {
//			        service_code: 'WINMET_APP_CANCEL_BLACK',
//			        params:{
//			        	service_code: 'WINMET_APP_CANCEL_BLACK',
//				        set_id:,
//				        entry_id:company_name
//			        }
//		    	};
//		        getInterface.jsonp(options, function (results) {
//		            if(results.status == 'Y'){	
//		            	
//					}		            	            
//		        });
//			} 
//		   	cancelBlack();
		}
	}
	
	
  	//管理红名单9.4
	var redListGuanli = function() {
    	var options = {
	        service_code: 'WINMET_APP_RED_SET_LIST',
	        params:{
	        	service_code: 'WINMET_APP_RED_SET_LIST',
	        	type:1
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
            	$scope.redListName = results.results;
            	if($scope.redListName !=''){
            		$scope.addRedLists = $scope.redListName[0].display_name;
            		$scope.addRedHtml = true;
            	}else{
            		$scope.addRedHtml = false;
            		$scope.tip = true;
            		$scope.tipTxt = '请先创建文件夹';
            	}
    			
			}		            	            
        });
	} 
// 	redListGuanli();
  	//加入红名单
	$scope.joinRedC = function(company_name){
		_hmt.push(['_trackEvent', joinRedListA, joinRedListB, joinRedListC]);
		console.log(joinRedListC)
//		alert(company_name)
		redListGuanli();
//		$scope.addRedHtml = true;
		//点击确认
		$scope.okplayRed = function(addRedLists){
			_hmt.push(['_trackEvent', redListAddA, redListAddB, redListAddC]);
			console.log(redListAddC)
//			alert(addRedLists);
			for(var i =0; i<$scope.redListName.length; i++){
    			if($scope.redListName[i].display_name == addRedLists){
	    			$scope.set_idRed = $scope.redListName[i].set_id;
			 	}
		 	}
			if($rootScope.$_userSearchData){
				creditCode = $rootScope.$_userSearchData.creditCode; //原统一社会信用代码
				companyCode = $rootScope.$_userSearchData.companyCode;//原企业注册号
				companyName = $rootScope.$_userSearchData.companyName;
			}
			//加入红名单9.2
			var joinRedList = function() {
		    	var options = {
			        service_code: 'WINMET_APP_ADD_RED',
			        params:{
			        	service_code: 'WINMET_APP_ADD_RED',
				        set_id:$scope.set_idRed,
				        company_code:companyCode,
				        credit_code:creditCode,
//				        entry_name:company_name
				        entry_name:companyName
			        }
		    	};
		        getInterface.jsonp(options, function (results) {
		            if(results.status == 'Y'){	
		            	$scope.errcodeBomb = true;
						$scope.errcodeText = '加入成功';
		            	$scope.addRedHtml = false;//红名单
		            	
//		            	alert($scope.set_idRed)
//		            	alert(addRedLists)
						$scope.getRedListResults = [];
						$scope.getRedListResults.push(addRedLists);//文件名称
						$scope.getRedListResults.push($scope.set_idRed);//文件名称的id
						$scope.$emit('joinRedSuccess', $scope.getRedListResults);
						
					}	
					else{
						$scope.addRedHtml = false;//红名单
						$scope.tip = true;
						$scope.tipTxt = results.error_msg;
					}
		        });
			} 
		   	joinRedList();
		}
	}
  	
	
    //企业是否被用户收藏、监控、加入黑名单4.1
	var oneJudge = function() {
	  	var options = {
		        service_code: 'WINMET_APP_COMPANY_COLLECT_STATE',
		        params:{
		        	service_code: 'WINMET_APP_COMPANY_COLLECT_STATE',
			        company_name:companyName
		        }
	  	};
	     getInterface.jsonp(options, function (results) {
	         if(results.status == 'Y'){	
//	          	alert(1);
	          	$scope.newsOne = results.message;
				}		            	            
	     });
	} 
	
    if($rootScope.$_userSearchData){
		creditCode = $rootScope.$_userSearchData.creditCode; //原统一社会信用代码
		companyCode = $rootScope.$_userSearchData.companyCode;//原企业注册号
	}

    //企业信息4.2
    if($rootScope.$_userSearchData){
    	if($rootScope.$_userSearchData.searchKey && !$rootScope.$_collection){
			$scope.unWaring = true;//接口报错，灯为灰色
		}else{
			$scope.unWaring = false;//接口报错，灯为灰色
		}	
    }
	
	var collectionIndex = function() {
    	var options = {
	        service_code: 'WINMET_APP_COMPANY_WARNING',
	        params:{
	        	service_code: 'WINMET_APP_COMPANY_WARNING',
		        company_code:companyCode,//企业注册号
		        credit_code:creditCode//统一社会信用代码
//		        company_name:'海航集团有限公司'
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){	
				$scope.collection = results.results;
				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 365);
				$cookies.putObject('collection', $scope.collection, {'path': '/', 'expires': expireDate});
				$rootScope.$_collection = $cookies.getObject('collection');
				$scope.unWaring = false;//接口成功
			}else{
				$scope.unWaring = true;//接口报错，灯为灰色
				$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
				//没有权限
				$cookies.remove('collection');
				$rootScope.$_collection = {};
			}
        });
	} 


	/***************************搜索 start*************************/
	
	/*搜索出来的列表点击某一项*/
	var bFlag = false;
	var numLimt = 0;
	$scope.sousuoname = function(data){
		tampCompanyName = data;
		$rootScope.searchKey.text = data;
		bFlag = true;
		numLimt = 0;
		angular.forEach($scope.datas,function(value,index){
			if($rootScope.searchKey.text == value){
				document.getElementById('sousuocon').style.display = 'none';
			}
		})
	}
	// 4.7接口
	$scope.sousukeyup = function(searchKey,e){
    	if(searchKey){
    		bFlag = false;
			var options = {
				service_code: 'WINMET_APP_ANALY_COMPANY_SEARCH_RESULT',
				params: {
					service_code:'WINMET_APP_ANALY_COMPANY_SEARCH_RESULT',
					search_str:searchKey
				}
			};
            getInterface.jsonp(options, function (results) {
				if(results.status == 'Y'){
					if(results.results.company_name){
						$scope.datas = results.results.company_name;
						document.getElementById('sousuocon').style.display = 'block';
					}
				}else{
					$scope.errcodeBomb = true;
					$scope.errcodeText = results.error_msg;
				}
           });
		}else{
			document.getElementById('sousuocon').style.display = 'none';
		}

	}
	
	
    //企业工商简况4.3
	var fourThreePresent = function() {
    	var options = {
	        service_code: 'WINMET_APP_COMPANY_BRIEF',
	        params:{
	        	service_code: 'WINMET_APP_COMPANY_BRIEF',
		        company_name:$rootScope.searchKey.text
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
				$scope.collectionPresent = results.results;
				if(!$scope.collectionPresent.company_name){
            		$scope.errcodeBomb = true;
					$scope.errcodeText = '暂无相关数据';
					$scope.noDataIcon = true; //请搜索或选择企业
					$scope.$parent.datailConIcon = false;//工商详情内容隐藏
					$scope.unWaring = false;//接口报错，灯为灰色
					$cookies.remove('userSearch');
					$rootScope.$_userSearchData = {};
		
				
					
					$cookies.remove('collection');
					$rootScope.$_collection = {};
					$rootScope.$_collection.company_id = undefined;
					console.log($rootScope.$_collection);

					
//					$cookies.remove('colCompanyDatails');
					$scope.$parent.$_colCompanyDatails = {};
					$scope.$parent.$_colCompanyDatails.company_name = undefined;

					$scope.isShowTip = true;
		
					return;
            }
//				companyId = $scope.collectionPresent.company_id;
				companyName = $scope.collectionPresent.company_name;
				creditCode = $scope.collectionPresent.credit_code;
				companyCode = $scope.collectionPresent.company_code;//企业注册号
				
//				$cookies.remove('userSearch', {'path': '/'});
				var expireDate = new Date();
		        expireDate.setDate(expireDate.getDate() + 1);
		        //companyId:companyId,//公司id
		        var data = {
		        	searchKey:$scope.searchKey.text,
		        	companyName:companyName,//公司名称
		        	creditCode:creditCode,//统一社会信用代码
		        	companyCode:companyCode//企业注册号
		        }
		        $cookies.putObject('userSearch', data, {'path': '/', 'expires': expireDate});
		        $rootScope.$_userSearchData = $cookies.getObject('userSearch');
		       	$rootScope.$broadcast('tampSearch',search);
		       	if(creditCode || companyCode){
		       		$timeout(function(){
		       			collectionIndex();//4.2
		       			$timeout(function(){
			       			messPresent();//4.4
			       		},100);
		       		},100);
		       	 	
		       		
		        }
		       	
			}else{
				$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
				if($rootScope.$_userSearchData){
					$cookies.remove('userSearch');
					$rootScope.$_userSearchData = {};
				}
				
			}
        });
	} 
  

	
	
	/*搜索查询的按钮*/
	$rootScope.sousuobutton = function(){
		_hmt.push(['_trackEvent', sousuobuttonA, sousuobuttonB, sousuobuttonC]);
		console.log(sousuobuttonC)
		numLimt++;
		if(numLimt == 1){
			if(bFlag){
				//第一次有数据，第二次无数据
				$scope.unWaring = false;
				
				$scope.isShowTip = false;//是否显示搜索提示语
				fourThreePresent();
			}
		}else{
			$scope.errcodeBomb = true;
			$scope.errcodeText = '请勿重复点击';	
		}
		
		
	}
	
	// 回车
    $rootScope.myKeyup = function(e){
		e = window.event || e;
		var keycode = e.keyCode || e.which || e.charCode;  
        if(keycode == 13){
        	$scope.sousuobutton();
          
        }
    };

 	//企业工商简况4.4
 	//$scope.noDataIcon = false;//暂无数据
 	if($scope.$parent.$_colCompanyDatails && $scope.$parent.$_colCompanyDatails.company_name){
 		$scope.$parent.datailConIcon = true; //内容隐藏(分析模块)
 	}
 	//console.log($rootScope.$_colCompanyDatails.company_name);
 	//接口报错
 	if($rootScope.$_userSearchData){
    	if($rootScope.$_userSearchData.searchKey && !$scope.$parent.$_colCompanyDatails){
			$scope.$parent.NodatailConIcon = true;   //无数据
		}
    }
	var messPresent = function() {
        var startTime = new Date().getTime();
        $scope.$parent.isLoadingPer = true; //正在加载。。。
        $scope.$parent.datailConIcon = false; //内容隐藏
        $scope.$parent.NodatailConIcon = false;   //无数据
        $scope.$parent.$_colCompanyDatails = {};
        $scope.$parent.$_colCompanyDatails.company_name = '--';
        $scope.$parent.$_colCompanyDatails.representative = "--";
        $scope.$parent.$_colCompanyDatails.establish_time = '--';
        $scope.$parent.$_colCompanyDatails.address = '--';
        $scope.$parent.$_colCompanyDatails.company_type ='--';
        $scope.$parent.$_colCompanyDatails.registered_capital = '--';
    	var options = {
	        service_code: 'WINMET_APP_COMPANY_DETAILS',
	        params:{
	        	service_code: 'WINMET_APP_COMPANY_DETAILS',
		        company_code: companyCode,//企业注册号
				credit_code:creditCode//统一社会信用代码
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){
                var loadTimes = new Date().getTime() - startTime;//毫秒
                if(loadTimes < $rootScope.loadingTimeLimt){
                    $timeout(function(){
                        $scope.$parent.isLoadingPer = false;
                        $scope.$parent.$_colCompanyDatails = results.results;
                        var $_colCompanyDatails = false;
                        for(var name in $scope.$parent.$_colCompanyDatails){
                        	if(name){
                        		$_colCompanyDatails = true;//有数据
                        		break;
                        	}
                        }
                        if($scope.$parent.$_colCompanyDatails && !$_colCompanyDatails){//没有数据
                            $scope.noDataIcon = true;//（请搜索图标提示语）
                            $scope.$parent.datailConIcon = false;
                            $scope.$parent.NodatailConIcon = true;   //无数据
                        }else{//有数据
                            $scope.noDataIcon = false;//（请搜索图标提示语）
                            $scope.$parent.datailConIcon = true;
                            $scope.$parent.NodatailConIcon = false;   //无数据
                        }
                    },1000);
                }else{
                    $scope.$parent.isLoadingPer = false;
                    $scope.$parent.$_colCompanyDatails = results.results;
                    var $_colCompanyDatails = false;
                    for(var name in $scope.$parent.$_colCompanyDatails){
                    	if(name){
                    		$_colCompanyDatails = true;//有数据
                    		break;
                    	}
                    }
                    if($scope.$parent.$_colCompanyDatails && !$_colCompanyDatails){//没有数据
                        $scope.noDataIcon = true;
                        $scope.$parent.datailConIcon = false;
                        $scope.$parent.NodatailConIcon = true;   //无数据
                    }else{//有数据
                        $scope.noDataIcon = false;
                        $scope.$parent.datailConIcon = true;
                        $scope.$parent.NodatailConIcon = false;   //无数据
                    }
                }

			}else{
				$scope.noDataIcon = true;//接口报错无数据
                $scope.$parent.datailConIcon = false;////接口报错内容隐藏
                $scope.$parent.NodatailConIcon = true;   //无数据
                $scope.$parent.isLoadingPer = false; //正在加载。。。
				$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
				//没有权限
				$scope.$parent.$_colCompanyDatails = {};
//				$cookies.remove('colCompanyDatails');
//				$rootScope.$_colCompanyDatails = {};
				
			}
        });
	} 

	$scope.change=function(x){
	    $rootScope.searchKey.text=x;  
	   	$rootScope.hidden = true;  
	}  
	/*执行实时搜索的方法*/
	var searchmethod = function(){
	   	$rootScope.datas = []; //下拉框选项  
	    $scope.tempdatas = $rootScope.datas; //下拉框选项副本  
		$rootScope.hidden=true;//选择框是否隐藏  
		$rootScope.searchKey.text='';//文本框数据  
		//将下拉选的数据值赋值给文本框  
		
		//获取的数据值与下拉选逐个比较，如果包含则放在临时变量副本，并用临时变量副本替换下拉选原先的数值，如果数据为空或找不到，就用初始下拉选项副本替换  
//		$rootScope.changeKeyValue=function(v){ 
//		    var newDate=[];  //临时下拉选副本  
//		    //如果包含就添加  
//		    angular.forEach($rootScope.datas ,function(data,index,array){  
//		        if(data.indexOf(v)>=0){  
//		            newDate.unshift(data);  
//		        }  
//		    });  
//		    //用下拉选副本替换原来的数据  
//		    $rootScope.datas=newDate;  
//		    //下拉选展示  
//		    $rootScope.hidden=false;  
//		    //如果不包含或者输入的是空字符串则用初始变量副本做替换  
//		    if($rootScope.datas.length==0 || ''==v){  
//		        $rootScope.datas=$scope.tempdatas;  
//		    }  
//		}
	}
//	searchmethod();
	/***************************搜索 end*************************/
	
	var init = function (){
		if($rootScope.$_userSearchData){//如果有搜索的关键字，调用4.4接口
			if($rootScope.$_userSearchData.searchKey){
				$scope.isShowTip = false; //是否显示提示语
				companyCode = $rootScope.$_userSearchData.companyCode;
				creditCode = $rootScope.$_userSearchData.creditCode;
				if(companyCode ||　creditCode){
					$timeout(function(){
		       			collectionIndex();//4.2
		       			$timeout(function(){
			       			messPresent();//4.4
			       		},100);
		       		},100);
				}
			}
		}else{
			$scope.isShowTip = true;
		}
	}
	var init2 = function (){
		if($rootScope.$_userSearchData){//如果有搜索的关键字，调用4.4接口
			if($rootScope.$_userSearchData.searchKey){
				$scope.isShowTip = false; //是否显示提示语
				companyCode = $rootScope.$_userSearchData.companyCode;
				creditCode = $rootScope.$_userSearchData.creditCode;
				if(companyCode ||　creditCode){
					$timeout(function(){
		       			collectionIndex();//4.2
		       		},100);
				}
			}
		}else{
			$scope.isShowTip = true;
		}
	}
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	var analysisName = '/'+url[2];
	  	if(analysisName == '/financial' || analysisName == '/associat' || analysisName == '/risk'){
	  		init2();
	  	}
	  	if(analysisName == '/enterprise' || toState.url == '/collection' || toState.url == '/nameList'){
	  		init();
	  	}
	  	
	});

	$scope.$on('reSearch',function(){
		$scope.isShowTip = false;
		$cookies.remove('userSearch', {'path': '/'});
		$rootScope.$_userSearchData.companyCode = '';
		$rootScope.$_userSearchData.creditCode = '';
		$rootScope.searchKey.text = $rootScope.$_userSearchData.searchKey;
		fourThreePresent();
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
   	
});