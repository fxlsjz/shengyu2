'use strict';
/***
 * 收藏监控
 */
app.controller('collectionCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$http,commonSearch) {
	
//	var _hmt = _hmt || [];
	var collectionA = 'tabCollection';
	var collectionB = 'click';
	var collectionC = 'collection';
	_hmt.push(['_trackEvent', collectionA, collectionB, collectionC]);
	//查找企业
	var findCompanyA = 'findCompany';
	var findCompanyB = 'click';
	var findCompanyC = 'findCompanyCollection';
	//收藏列表
	var collectionListA = 'collectionList';
	var collectionListB = 'click';
	var collectionListC = 'collectionListCollection';
	//收藏夹管理
	var favoritesManageA = 'favoritesManage';
	var favoritesManageB = 'click';
	var favoritesManageC = 'favoritesManageCollection';
	//监控列表
	var monitorListA = 'monitorList';
	var monitorListB = 'click';
	var monitorListC = 'monitorListCollection';
	//监控夹管理
	var monitorManageA = 'monitorManage';
	var monitorManageB = 'click';
	var monitorManageC = 'monitorManageCollection';
	//收藏列表的“所选加监控”按钮
	var selectMonitorCollectionA = 'selectMonitorCollection';
	var selectMonitorCollectionB = 'click';
	var selectMonitorCollectionC = 'selectMonitorCollectionS';
	//收藏列表的“所选加监控”的弹框的“是”
	var addCollectionListA = 'addCollectionList';
	var addCollectionListB = 'click';
	var addCollectionListC = 'addCollectionListS';
	//收藏列表的'删除选中'
	var delectCollectionsA = 'delectCollections';
	var delectCollectionsB = 'click';
	var delectCollectionsC = 'delectCollectionsS';
	//收藏列表的'删除选中'的“是”
	var noAttentA = 'noAttent';
	var noAttentB = 'click';
	var noAttentC = 'noAttentS';
	//收藏夹管理的“创建”
	var setupA = 'setupCollection';
	var setupB = 'click';
	var setupC = 'setupCollectionS';
	//收藏夹管理的“重命名”
	var renameA = 'renameCollection';
	var renameB = 'click';
	var renameC = 'renameCollectionS';
	//收藏夹管理的重命名弹框的"是"按钮
	var renameNoAttentA = 'renameNoAttent';
	var renameNoAttentB = 'click';
	var renameNoAttentC = 'renameNoAttentS';
	//收藏夹管理的“删除”
	var delectA = 'delectColl';
	var delectB = 'click';
	var delectC = 'delectCollS';
	//收藏夹管理的“删除”弹框的“是”按钮
	var noattentGuanA = 'noattentGuanColl';
	var noattentGuanB = 'click';
	var noattentGuanC = 'noattentGuanCollS';
	//监控列表的“删除选中”
	var delectMonitorListA = 'delectMonitorList';
	var delectMonitorListB = 'click';
	var delectMonitorListC = 'delectMonitorListS';
	//监控夹的'创建'
	var setupThreeA = 'setupJiankong';
	var setupThreeB = 'click';
	var setupThreeC = 'setupJiankongS';
	//监控夹的‘重命名’
	var renameThreeA = 'renameJiankong';
	var renameThreeB = 'click';
	var renameThreeC = 'renameJiankongS';
	//监控夹管理的重命名弹框的"是"按钮
	var noattentJiankongA = 'renameYes';
	var noattentJiankongB = 'click';
	var noattentJiankongC = 'renameYesS';
	//监控管理夹的“删除”
	var delectThreeA = 'delectThreeMonitor';
	var delectThreeB = 'click';
	var delectThreeC = 'delectThreeMonitorS';
	//监控管理夹的删除弹框的“是”
	var noattentThreeA = 'delectMonitorJia';
	var noattentThreeB = 'click';
	var noattentThreeC = 'delectMonitorJiaS';
	
//	console.log(userInfo.getObject('profile_info_red'));
	$scope.info_red = userInfo.getObject('profile_info_red');//红名单权限
//	console.log($scope.info_red)

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.collectionName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.collectionName == "/statement" || $scope.collectionName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
	});
	
	$scope.$on('joinSuccess',function(event,data){
		console.log(JSON.stringify(data));
		console.log(data[0]);
		if($scope.colleList == data[0]){
//			alert($scope.colleList)//文件名称
//			alert(data[1])//文件名称的id
			//6.1
			var colleListSuccess = function() {
	  			var options = {
	        		service_code: 'WINMET_APP_COLECTION_LIST',
	       			params:{
	        			service_code: 'WINMET_APP_COLECTION_LIST',
	        			set_id:data[1]
	        		}
	  			};
	      		getInterface.jsonp(options, function (results) {
	          		if(results.status == 'Y'){
	          			$scope.collectionJia = results.results.list;
	          			$scope.collectionCounts = results.results.total_count;
	          			$scope.paginationCollection.totalItems = results.results.total_count;
	          			$scope.paginationCollection.currentPage = 1;
					}		            	            
	      		});
			} 
			colleListSuccess();
//			$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', colleListSuccess);
		}
	});
	
	/*选项卡切换*/
	$scope.changeActive=1;
    $scope.changes=function(index,id){
    	$scope.changeActive=index;
    	$location.hash(id);
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
		if(index == 1){
			_hmt.push(['_trackEvent', findCompanyA, findCompanyB, findCompanyC]);
			console.log(findCompanyC)
		}else if(index == 2){
			_hmt.push(['_trackEvent', collectionListA, collectionListB, collectionListC]);
			console.log(collectionListC)
		}else if(index == 3){
			_hmt.push(['_trackEvent', favoritesManageA, favoritesManageB, favoritesManageC]);
			console.log(favoritesManageC)
		}else if(index == 4){
			_hmt.push(['_trackEvent', monitorListA, monitorListB, monitorListC]);
			console.log(monitorListC)
		}else if(index == 5){
			_hmt.push(['_trackEvent', monitorManageA, monitorManageB, monitorManageC]);
			console.log(monitorManageC)
		}
		//3.7
		var threeSeven = function(){
			var options = {
		        service_code: 'WINMET_APP_KEEP_ALIVE',
		        params:{
		        	service_code: 'WINMET_APP_KEEP_ALIVE'
		        }
			};
		    getInterface.jsonp(options, function (results) {
		        if(results.status == 'Y'){	
				}

		    });
		}
		threeSeven();
		
    }
	//$scope.tip = false;
    /*关闭弹出框*/
	$scope.noplayBox = function(){
		$scope.supportPlay = false;
		$scope.addmonitorPlay = false;//监控
		$scope.addblackPlay = false;//黑名单
		$scope.addRedHtml = false;//红名单
		$scope.addcollectPlay = false;//收藏
		$scope.noshowDialog = false;
		$scope.reName = false;//重命名的弹框
		$scope.tip =! $scope.tip;//文件夹名称为空的弹框
	}
	$scope.newClose = function (){
		$scope.tip = false;
		$scope.reNameSet = false;
	}
	$scope.newCloseTwo = function(){
		$scope.tip = false;
		$scope.reNameSet = false;
	}
	//是否删除弹框
	$scope.closeToggle = function(){
		$scope.noshowDialog = false;
	}
	//是否重命名弹框
	$scope.closeRename = function(){
		$scope.reNameSet = false;
	}
	//所选是否加监控弹框
	$scope.closeMonitor = function(){
		$scope.addmonitorPlay = false;
		$scope.addmonitorPlayTwo = false;
		
	}
	
	$scope.a=function(monitorAllList){
//		alert(monitorAllList);
	};
	
	
	
	
//	var init = function (){
//		if($rootScope.$_userSearchData){//
//			if($rootScope.$_userSearchData.searchKey){
//				$rootScope.isShowTip = false; //是否显示提示语
//			}
//		}else{
//			$rootScope.isShowTip = true;
//			alert('没有搜索的关键字');
//		}
//	}
//	init();
	
	//企业工商简况4.4
//	var messPresent = function() {
//  	var options = {
//	        service_code: 'WINMET_APP_COMPANY_DETAILS',
//	        params:{
//	        	service_code: 'WINMET_APP_COMPANY_DETAILS',
//		        company_code: companyCode,//企业注册号
//				credit_code:creditCode//统一社会信用代码
//	        }
//  	};
//      getInterface.jsonp(options, function (results) {
//          if(results.status == 'Y'){	
////          	alert('123456789');
//          	$scope.collectionPresent = results.results;
////          	alert(JSON.stringify($scope.collectionPresent))
//			}		            	            
//      });
//	} 
	var companyCode;
    var creditCode;
//  var init = function (){
//		if($rootScope.$_userSearchData){//如果有搜索的关键字，调用4.4接口
//			if($rootScope.$_userSearchData.searchKey){
//				$scope.isShowTip = false; //是否显示提示语
////				console.log($rootScope.$_userSearchData);
//				companyCode = $rootScope.$_userSearchData.companyCode,//企业注册号
//				creditCode = $rootScope.$_userSearchData.creditCode//统一社会信用代码
//				if(companyCode){
//					messPresent();//4.4
//				}
//			}
//		}else{
//			$scope.isShowTip = true;
////			alert('没有搜索的关键字');
//		}
//	}
//	init();

//	$rootScope.$watch('$_userSearchData.searchKey',function(val1,val2){
//		if($rootScope.$_userSearchData){
//			if(val1 != val2){
//				companyCode = $rootScope.$_userSearchData.companyCode,//企业注册号
//				creditCode = $rootScope.$_userSearchData.creditCode//统一社会信用代码
//				if(companyCode){
//					messPresent();//4.4
//				}
//				
//			}
//		}
//		
//	},true);
	
	
	
	var companyId;//公司id
	var companyName;//公司名称
	if($rootScope.$_userSearchData){
		if($rootScope.$_userSearchData.searchKey){//如果有搜索的关键字，调用4.1,4.2,4.3,4.4接口
//			alert($rootScope.$_userSearchData.searchKey);
//			alert('已经有搜索的关键字');
		}else{//否则调用4.5sug搜索，会返回一个企业id,企业名称，根据返回的企业id,企业名称调4.1,4.2,4.3,4.4接口，此时需要将搜索的key赋值给$rootScope.searchKey
//			alert('没有搜索的关键字');
		}
	}
	$scope.searchGo = function(){
//		alert($scope.souSearch)
		$cookies.remove('userSearch', {'path': '/'});
		var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365);
        var data = {
        	searchKey:$scope.souSearch,//搜索的关键字
        	companyId:companyId, //公司id
        	companyName:companyName//公司名称
        }
        $cookies.putObject('userSearch', data, {'path': '/', 'expires': expireDate});
//		commonSearch.hold();
	}
	
//收藏夹	start

	$scope.checks = false;
	//input点击事件
    	//点击全选
	$scope.checkAll = function(){
		$scope.checks =!$scope.checks;
		if($scope.checks == true){
			angular.forEach($scope.collectionJia,function(value, index){
	        	value.$selected = true;
	       	});
	       		//删除选中
	       	$scope.delectCollection = function(){
	       		_hmt.push(['_trackEvent', delectCollectionsA, delectCollectionsB, delectCollectionsC]);
				console.log(delectCollectionsC);
	       		$scope.collectionListAlls = [];//全选的数组
				angular.forEach($scope.collectionJia,function(data,index){
					if(data.$selected == true){
						var value = JSON.stringify(data);
						$scope.collectionListAlls.push(value);
					}else{

					}

			   	});

				if($scope.collectionListAlls != ''){
					$scope.noshowDialog = true;
					$scope.tanTxt = '是否删除？';
				}
				else{
//					$scope.noshowDialog = true;
		  			$scope.tip = true;
					$scope.tipTxt = '请选择企业';

				}
				$scope.noattent = function(){
					_hmt.push(['_trackEvent', noAttentA, noAttentB, noAttentC]);
					console.log(noAttentC);
					$scope.setIdArrayAll = [];//文件夹id
					$scope.entryIdArrayAll = [];//项目id(即企业id)

				   	for(var c=0; c<$scope.collectionListAlls.length;c++){
//				   		console.log(JSON.parse ($scope.collectionListAlls[c]).set_id);
//						console.log(JSON.parse ($scope.collectionListAlls[c]).entry_id);

						//文件夹id
						var valueSetIdAll = JSON.parse ($scope.collectionListAlls[c]).set_id;
						$scope.setIdArrayAll.push(valueSetIdAll);

						//项目id(即企业id)
						var valueEntryIdAll = JSON.parse ($scope.collectionListAlls[c]).entry_id;
						$scope.entryIdArrayAll.push(valueEntryIdAll);
					}

					//拼接企业code
					var entryId = "";

					angular.forEach($scope.selectedClassList,function(value,index){
						entryId = entryId + value.entry_id + ","
					})
					//去掉最后一个逗号
					entryId = entryId.substring(0,entryId.length-1);

					//6.3
					var removeCollectionAll = function(){
						var options = {
					        service_code: 'WINMET_APP_CANCEL_COLLECTION',
					        params:{
					        	service_code: 'WINMET_APP_CANCEL_COLLECTION',
					        	set_id:$scope.currentFavorite.set_id,
					        	entry_id:entryId
					        }
					  	};
					  	getInterface.jsonp(options, function (results) {
			          		if(results.status == 'Y'){
								//新增 从新请求当前收藏列表
								getCollectList();

								//旧的
								$scope.colleList = $scope.colleList;//当前文件夹的名称
			        			$scope.noshowDialog = false;//弹框消失
			        			$scope.checks = false;//全选取消
			        			//6.4
			        			var getCollectionTwo = function(){
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
						        			var itemListSLength = $scope.itemListS;
						        			for(var i =0; i<itemListSLength.length; i++){
				        						if($scope.itemListS[i].display_name == $scope.colleList){
						    						$scope.set_id = $scope.itemListS[i].set_id;
//							    						alert($scope.set_id)
						    						//6.1
													var colleListTwo = function() {
											  			var options = {
											        		service_code: 'WINMET_APP_COLECTION_LIST',
											       			params:{
											        			service_code: 'WINMET_APP_COLECTION_LIST',
											        			set_id:$scope.set_id
											        		}
											  			};
											      		getInterface.jsonp(options, function (results) {
											          		if(results.status == 'Y'){
											          			$scope.checks = false;//取消全选
											          			$scope.collectionJia = results.results.list;
											          			$scope.paginationCollection.totalItems = results.results.total_count;
											          			$scope.collectionCounts=results.results.total_count
															}
											      		});
													}
//					 									colleListTwo();
				 									$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', colleListTwo);

								 				}
							 				}
										}
						    		});
			        			}
			        			getCollectionTwo();
							}
			          		else{
			          			$scope.noshowDialog = false;//弹框消失
			          			$scope.tip = true;
								$scope.tipTxt = results.error_msg;
			          		}
			      		});
					};
					removeCollectionAll();

//				   	console.log($scope.setIdArrayAll)
				}
	       	}
	       	//全选加入监控
	       	$scope.addMonitorJia = function(){
	       		_hmt.push(['_trackEvent', selectMonitorCollectionA, selectMonitorCollectionB, selectMonitorCollectionC]);
				console.log(selectMonitorCollectionC);
	       		monitorJiaColl();

//	       		alert(1111)
	       		$scope.setNewMoJia = [];
				angular.forEach($scope.collectionJia,function(data,index){
					if(data.$selected == true){
						var value = JSON.stringify(data);
						$scope.setNewMoJia.push(value);
					}else{

					}

			   	});
			   	if($scope.setNewMoJia != ''){
//			   		$scope.addmonitorPlay = true;//弹框显示
			   		$scope.addmonitorPlayTwo = true;

			   	}
			   	else{
//			   		$scope.addmonitorPlay = false;
		   			$scope.tip = true;
					$scope.tipTxt = '请选择企业';
			   	}

//				$scope.addmonitorPlay = true;//弹框显示
				$scope.addCollection = function(monitorAllList){
					_hmt.push(['_trackEvent', addCollectionListA, addCollectionListB, addCollectionListC]);
					console.log(addCollectionListC);
//					alert(monitorAllList);//文件夹名称
					for(var h=0; h<$scope.monitorListS.length;h++){
						if($scope.monitorListS[h].display_name == monitorAllList){
			    			$scope.set_idColl = $scope.monitorListS[h].set_id;//得到文件名称对应的id
					 	}
					}

					$scope.companyCodeArrayAll = [];//企业注册号
					$scope.creditCodeArrayAll = [];//统一社会信用代码
					$scope.companyNameArrayAll = [];//企业name
				   	for(var i=0; i<$scope.setNewMoJia.length;i++){
//						console.log(JSON.parse ($scope.setNewMoJia[i]).set_id);//文件夹id
//						console.log(JSON.parse ($scope.setNewMoJia[i]).company_code);//企业注册号
//						console.log(JSON.parse ($scope.setNewMoJia[i]).credit_code);//统一社会信用代码
//						console.log(JSON.parse ($scope.setNewMoJia[i]).company_name);//企业name

						//企业注册号
						var valueCompanyCodeAll = JSON.parse($scope.setNewMoJia[i]).company_code;
						$scope.companyCodeArrayAll.push(valueCompanyCodeAll);

						//企业注册号
						var valueCreditCodeAll = JSON.parse($scope.setNewMoJia[i]).credit_code;
						$scope.creditCodeArrayAll.push(valueCreditCodeAll);

						//企业注册号
						var valueCompanyNameCodeAll = JSON.parse($scope.setNewMoJia[i]).company_name;
						$scope.companyNameArrayAll.push(valueCompanyNameCodeAll);

				   	}

					//拼接企业code name
					var companyCode = "";
					var creditCode = "";
					var entryName = "";

					angular.forEach($scope.selectedClassList,function(value,index){
						companyCode = companyCode + value.company_code + ",";
						creditCode = creditCode + value.credit_code + ",";
						entryName = entryName + value.entry_name + ","
					})
					//去掉最后一个逗号
					companyCode = companyCode.substring(0,companyCode.length-1);
					creditCode = creditCode.substring(0,creditCode.length-1);
					entryName = entryName.substring(0,entryName.length-1);

				   	//加入监控7.2
					var joinAddMonitorAll = function(){
						var options = {
					        service_code: 'WINMET_APP_ADD_MONITOR',
					        params:{
					        	service_code: 'WINMET_APP_ADD_MONITOR',
						        set_id:$scope.set_idColl,
						        company_code:companyCode,
					        	credit_code:creditCode,
					        	entry_name:entryName
					        }
					  	};
					    getInterface.jsonp(options, function (results) {
					        if(results.status == 'Y'){
					        	$scope.addmonitorPlay = false;//弹框消失
					        	$scope.addmonitorPlayTwo = false;
					        	$scope.tip = true;
								$scope.tipTxt = '加入成功';
							}
							else{
								$scope.addmonitorPlay = false;//下拉框消失
								$scope.addmonitorPlayTwo = false;
								$scope.tip = true;
								$scope.tipTxt = results.error_msg;
							}
					    });
					}
					joinAddMonitorAll();

				}
	       	}
		}else{
			angular.forEach($scope.collectionJia,function(value, index){
	        	value.$selected = false;
	       	});
		}
	}
    	//单个点击
	$scope.check = function(item,index){
		item.$selected = !item.$selected;
//		alert(item.$selected)
		//只要有1个为false,全选就会为false
		if(item.$selected == false){
			$scope.checks = false;
		}
		var selected = $scope.collectionJia;
		for(var i = 0; i<selected.length;i++){
			if(selected[i].$selected == false || selected[i].$selected == undefined){
				$scope.checks = false;
				return false;
			}
			if(selected[i].$selected == true){
				$scope.checks = true;
			}
		}
	}

	//点击'删除收藏'
	$scope.delectCollection = function(){
		_hmt.push(['_trackEvent', delectCollectionsA, delectCollectionsB, delectCollectionsC]);
		console.log(delectCollectionsC);
		$scope.seletS = [];
		angular.forEach($scope.collectionJia,function(data,index){
//			alert(JSON.stringify(data));
			if(data.$selected == true){
				var value = JSON.stringify(data);
				$scope.seletS.push(value);
			}else{

			}

	    });
		if($scope.seletS != ''){
			$scope.noshowDialog = true;
			$scope.tanTxt = '是否删除？';
		}
		else{
			if($scope.selectedClassList.length == 0){
				$scope.tip = true;
				$scope.tipTxt = '请选择企业';
			}

		}
		$scope.noattent = function(){
			_hmt.push(['_trackEvent', noAttentA, noAttentB, noAttentC]);
			console.log(noAttentC)
			$scope.setIdCodeArray = [];//文件夹id
			$scope.entryIdArray = [];//项目id(即企业id)

	    	for(var i=0; i<$scope.seletS.length;i++){
//				console.log(JSON.parse ($scope.seletS[i]))
//				console.log(JSON.parse ($scope.seletS[i]).set_id);
//				console.log(JSON.parse ($scope.seletS[i]).entry_id);

				//文件夹id
				var valueSetId = JSON.parse ($scope.seletS[i]).set_id;
				$scope.setIdCodeArray.push(valueSetId);

				//项目id(即企业id)
				var valueEntryId = JSON.parse ($scope.seletS[i]).entry_id;
				$scope.entryIdArray.push(valueEntryId);
			}

			//拼接企业code
			var entryId = "";

			angular.forEach($scope.selectedClassList,function(value,index){
				entryId = entryId + value.entry_id + ","
			})
			//去掉最后一个逗号
			entryId = entryId.substring(0,entryId.length-1);

			//取消收藏6.3
			var removeCollection = function(){
				var options = {
			        service_code: 'WINMET_APP_CANCEL_COLLECTION',
			        params:{
			        	service_code: 'WINMET_APP_CANCEL_COLLECTION',
			        	set_id:$scope.currentFavorite.set_id,
			        	entry_id:entryId
			        }
			  	};
		    	getInterface.jsonp(options, function (results) {
		        	if(results.status == 'Y'){
						//新增 从新请求当前收藏列表
						getCollectList();

						$scope.noshowDialog = false;
		        		//6.4
		        		var getCollectionTwo = function(){
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
					        		var itemListSLength = $scope.itemListS;
					        		for(var i =0; i<itemListSLength.length; i++){
			        					if($scope.itemListS[i].display_name == $scope.colleList){
					    					$scope.set_id = $scope.itemListS[i].set_id;
//							    					alert($scope.set_id)
					    					//6.1
											var colleListTwo = function() {
									  			var options = {
									        		service_code: 'WINMET_APP_COLECTION_LIST',
									       			params:{
									        			service_code: 'WINMET_APP_COLECTION_LIST',
									        			set_id:$scope.set_id
									        		}
									  			};
									      		getInterface.jsonp(options, function (results) {
									          		if(results.status == 'Y'){
									          			$scope.checks = false;//取消全选
									          			$scope.collectionJia = results.results.list;
									          			$scope.collectionCounts = results.results.total_count;
//										          			alert($scope.collectionCounts)
													}
									      		});
											}
				 							colleListTwo();
							 			}
						 			}
								}
					    	});
		        		}
		        		//getCollectionTwo();
					}
					else{
						$scope.noshowDialog = false;
						$scope.tip = true;
						$scope.tipTxt = results.error_msg;
					}
		    	});
			}
			removeCollection();


		}
	}
	//监控收藏夹7.4
    var monitorJiaColl = function() {
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
            	$scope.allListS = results.results;
            	$scope.monitorAllList = $scope.monitorListS[0].display_name;//默认为第一个    监控夹
			}
        });
	}
	//所选加监控
	$scope.addMonitorJia = function(){
		_hmt.push(['_trackEvent', selectMonitorCollectionA, selectMonitorCollectionB, selectMonitorCollectionC]);
		console.log(selectMonitorCollectionC);
		monitorJiaColl();

		$scope.setNewCoJia = [];
		angular.forEach($scope.collectionJia,function(data,index){
			if(data.$selected == true){
				var value = JSON.stringify(data);
				$scope.setNewCoJia.push(value);
			}else{

			}

	   	});
		if($scope.setNewCoJia != ''){
//			$scope.addmonitorPlay = true;//弹框显示
			$scope.addmonitorPlayTwo = true;

		}
		else{
			if($scope.selectedClassList.length == 0){
				$scope.tip = true;
				$scope.tipTxt = '请选择企业';
			}
		}


//		$scope.addmonitorPlay = true;//弹框显示
		$scope.addCollection = function(monitorAllList){
			_hmt.push(['_trackEvent', addCollectionListA, addCollectionListB, addCollectionListC]);
			console.log(addCollectionListC);
//			alert(monitorAllList);//文件夹名称
			for(var a=0; a<$scope.monitorListS.length;a++){
				if($scope.monitorListS[a].display_name == monitorAllList){
	    			$scope.set_idMon = $scope.monitorListS[a].set_id;//得到文件名称对应的id
			 	}
			}
			$scope.companyCodeArray = [];//企业注册号
			$scope.creditCodeArray = [];//统一社会信用代码
			$scope.companyNameArray = [];//企业name
	   		for(var i=0; i<$scope.setNewCoJia.length;i++){
//				console.log(JSON.parse ($scope.setNewCoJia[i]).set_id);//文件夹id
//				console.log(JSON.parse ($scope.setNewCoJia[i]).company_name);//企业name
//				console.log(JSON.parse ($scope.setNewCoJia[i]).company_code);//企业注册号
//				console.log(JSON.parse ($scope.setNewCoJia[i]).credit_code);//统一社会信用代码

				//企业注册号
				var valueCompanyCode = JSON.parse($scope.setNewCoJia[i]).company_code;
				$scope.companyCodeArray.push(valueCompanyCode);
//					console.log(valueCompanyCode)

				//统一社会信用代码
				var valueCreditCode = JSON.parse($scope.setNewCoJia[i]).credit_code;
				$scope.creditCodeArray.push(valueCreditCode);
//					console.log(valueCreditCode)

				//企业name
				var valueCompanyName = JSON.parse($scope.setNewCoJia[i]).company_name;
				$scope.companyNameArray.push(valueCompanyName);
//					console.log(valueCompanyName)
	   		}
//		   	console.log($scope.companyCodeArray)
		   	console.log($scope.companyNameArray);


			//拼接企业code name
			var companyCode = "";
			var creditCode = "";
			var entryName = "";

			angular.forEach($scope.selectedClassList,function(value,index){
				companyCode = companyCode + value.company_code + ",";
				creditCode = creditCode + value.credit_code + ",";
				entryName = entryName + value.entry_name + ","
			})
			//去掉最后一个逗号
			companyCode = companyCode.substring(0,companyCode.length-1);
			creditCode = creditCode.substring(0,creditCode.length-1);
			entryName = entryName.substring(0,entryName.length-1);

		   	//加入监控7.2
			var joinAddMonitor = function(){
				var options = {
			        service_code: 'WINMET_APP_ADD_MONITOR',
			        params:{
			        	service_code: 'WINMET_APP_ADD_MONITOR',
				        set_id:$scope.set_idMon,
				        company_code:companyCode,
			        	credit_code:creditCode,
			        	entry_name:entryName
			        }
			  	};
			    getInterface.jsonp(options, function (results) {
			        if(results.status == 'Y'){
//					   	$scope.addmonitorPlay = false;//弹框消失
			        	$scope.addmonitorPlayTwo = false;
					    $scope.tip = true;
						$scope.tipTxt = '加入成功';
					}
					else{
//						$scope.addmonitorPlay = false;//下拉框消失
						$scope.addmonitorPlayTwo = false;

						$scope.tip = true;
						$scope.tipTxt = results.error_msg;
					}
			    });
			}
			joinAddMonitor();
//
		}
	}
	
	
//收藏夹	end
	$scope.paginationCollection = {
        currentPage: 1,//当前页
        itemsPerPage: 20,//每页多少条数据
        pagesLength:15//步长（如果设置建议设置为奇数）
    };
	//收藏文件夹列表6.4
	var getCollection = function() {
	  	var options = {
	        service_code: 'WINMET_APP_COLLECTION_SET_LIST',
	        params:{
	        	service_code: 'WINMET_APP_COLLECTION_SET_LIST',
		        display_name:$scope.fileName,
		        type:1
	        }
	  	};
	    getInterface.jsonp(options, function (results) {
	        if(results.status == 'Y'){
	        	$scope.itemListS = results.results;
	        	$scope.collectionCounts = results.results.total_count;
	        	$scope.collectionAllCounts = results.counts;//文件夹的个数
//	        	alert($scope.collectionAllCounts)
	        	$scope.allCollectList = $scope.itemListS;//收藏夹的名字
	        	//如果文件的个数为0，显示无图数据
	        	if($scope.collectionAllCounts == 0){
	        		$scope.collectionCounts = 0;
	        	}
	        	if($scope.collectionAllCounts != 0){
	        		$scope.aCollect = $scope.itemListS[0].display_name;//默认为第一个
    				$scope.colleList = $scope.itemListS[0].display_name;//默认为第一个
    				$scope.set_id = $scope.itemListS[0].set_id;
	        	}

//  			alert($scope.set_id)
    			//收藏列表6.1
				var getCollectionList = function() {

				  	var options = {
				        service_code: 'WINMET_APP_COLECTION_LIST',
				        params:{
				        	service_code: 'WINMET_APP_COLECTION_LIST',
				        	set_id:$scope.set_id,
				        	current_index:($scope.paginationCollection.currentPage - 1)*20,
	        				page_size:$scope.paginationCollection.itemsPerPage
				        }
				  	};
			      	getInterface.jsonp(options, function (results) {
			          	if(results.status == 'Y'){
			          		$scope.checks = false;//取消全选
			          		$scope.collectionJia = results.results.list;
//			          		$scope.collectionCounts = results.results.total_count;
							$scope.paginationCollection.totalItems = results.results.total_count;
							$scope.collectionCounts = results.results.total_count;

								//获取下标值
							var indexValue = ($scope.paginationCollection.currentPage - 1)*20;
							if(indexValue != 0){
								$location.hash('jumpListHigh');
    							$anchorScroll.yOffset = 100;
								$anchorScroll();
							}
						}
			      	});
				}
//			 	getCollectionList();
			 	$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', getCollectionList);

    			$scope.b =function(colleList){
    				$scope.colleList = colleList;
    				$scope.checks = false;//全选为false
    				var collectionListLength = $scope.itemListS;
    				for(var i =0; i<collectionListLength.length; i++){
	        			if($scope.itemListS[i].display_name == colleList){
			    			$scope.set_id = $scope.itemListS[i].set_id;
//			    			alert($scope.set_id)
//			    			getCollectionList();//6.1
			    			$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', getCollectionList);
					 	}
				 	}

				}
			}else{
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}
	    });
	}
 	getCollection();

//	收藏列表新增接口
	/**
	 * 新增调取接口  页面首次展示
	 * 6.4	获取收藏文件夹列表
	 * 6.1	获取收藏列表
	 * 10.1	财务风险预测  4.3	企业工商简况
	 * 6.8	收藏企业信息
	 */

	 /**
	 * 新增调取接口 页面操作接口
	  * 	批量收藏
	 * 7.2	加入监控
	 * 6.3	取消收藏
	 */

//	6.4	获取收藏文件夹列表
	$scope.favoritesList = []; //收藏文件夹列表
	$scope.currentFavorite = {}; //当前所选文件夹对象
	$scope.showCollectView = false; //请求完所有接口置为true

	var getFavoritesList = function() {
		var options = {
			service_code: 'WINMET_APP_COLLECTION_SET_LIST',
			params:{
				service_code: 'WINMET_APP_COLLECTION_SET_LIST',
				type:1
			}
		};
		getInterface.jsonp(options, function (results) {
			if(results.status == 'Y'){
				$scope.favoritesList = results.results;
				if($scope.favoritesList.length){
					$scope.currentFavorite = $scope.favoritesList[0];//默认取第一个
					$scope.currentModel = $scope.currentFavorite;

					getCollectList();
				}
			}else{
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}
		});
	}
	getFavoritesList();

	//切换收藏文件夹
	$scope.changeFolder = function(currentModel){
		$scope.currentFavorite = currentModel;
		$scope.classlist = [];
		getCollectList();
		$scope.showCollectView = false; //请求完所有接口置为true

	}

//	6.1	获取收藏列表
	$scope.currentIndex = 0;
	$scope.collection = {}; //收藏接口结果
	$scope.collectionList = []; //收藏企业列表
	var getCollectList = function() {
		var options = {
			service_code: 'WINMET_APP_COLECTION_LIST',
			params:{
				service_code: 'WINMET_APP_COLECTION_LIST',
				page_size:20,
				current_index:$scope.currentIndex,
				set_id:$scope.currentFavorite['set_id']
			}
		};
		getInterface.jsonp(options, function (results) {
			if(results.status == 'Y'){
				$scope.collection = results.results;

				//使用企业名称循环调工商简况接口
				$scope.collectionList = $scope.collection['list'];
				$scope.totalCount = $scope.collection['total_count'];//记录总条数

				//$scope.paginationConf.totalItems = $scope.collectionList.count;

				if($scope.collectionList){

					angular.forEach($scope.collectionList,function(value, index){
						//获取工商简况接口
						getCompanyIndustryContent(value.company_name);
						//获取评分接口
						loadFinanceData(value.company_name);
					})

				//收藏列表为空	 清空数据
				}else{
					$scope.companyBriefs = [];
					$scope.collection = {};
					$scope.collectionList = [];
					$scope.bonddetails = [];
					$scope.collecttionInf = {};
					$scope.classlist = [];
				}

			}else{
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}
		});
	}


	//10.1	财务风险预测
	$scope.bonddetails = []; //财务风险预测结果
	var loadFinanceData = function(companyName) {
		var options = {
			service_code: 'WINMET_APP_FINANCIAL_RISK',
			params: {
				service_code: 'WINMET_APP_FINANCIAL_RISK',
				company_name: companyName //企业名称
			}
		};
		getInterface.jsonp(options, function(results) {
			if(results.status == 'Y') {
				$scope.bonddetails.push(results.results);

				//评分小分项
				var bonddetails0 = $scope.bonddetails[0];
				var littleGrade = bonddetails0.little_grade;

				angular.forEach(littleGrade,function(value, index){
					switch(index){
						case 0:
							$scope.gradeSonTitle1 = value.score_card_titile;
							break;
						case 1:
							$scope.gradeSonTitle2 = value.score_card_titile;
							break;
						case 2:
							$scope.gradeSonTitle3 = value.score_card_titile;
							break;
						case 3:
							$scope.gradeSonTitle4 = value.score_card_titile;
							break;
					}
				})
				//去掉"评分"
				$scope.gradeTotalTitle = "总分";
				$scope.gradeSonTitle1 = $scope.gradeSonTitle1.substring(0,$scope.gradeSonTitle1.length-2);
				$scope.gradeSonTitle2 = $scope.gradeSonTitle2.substring(0,$scope.gradeSonTitle2.length-2);
				$scope.gradeSonTitle3 = $scope.gradeSonTitle3.substring(0,$scope.gradeSonTitle3.length-2);
				$scope.gradeSonTitle4 = $scope.gradeSonTitle4.substring(0,$scope.gradeSonTitle4.length-2);


			} else {
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}

		});
	};

	//4.3	企业工商简况
	//$scope.companyBrief = []; //一个企业的工商简况
	$scope.companyBriefs = []; 	//一个收藏文件夹下所有企业的工商简况
	$scope.companyCodes = ""; 	//一个收藏文件夹下所有企业注册号,逗号分隔
	$scope.creditCodes = "";  	//一个收藏文件夹下所有企业统一社会信用代码,逗号分隔
	var getCompanyIndustryContent = function(companyName) {
		var options = {
			service_code: 'WINMET_APP_COMPANY_BRIEF',
			params:{
				service_code: 'WINMET_APP_COMPANY_BRIEF',
				company_name: companyName
			}
		};
		getInterface.jsonp(options, function (results) {
			if(results.status == 'Y'){
				$scope.companyBriefs.push(results.results);
				console.log("所有工商简况列表");
				console.log($scope.companyBriefs);
				//拼接企业code
				$scope.companyCodes = '';
				$scope.creditCodes = '';
				if($scope.companyBriefs) {
					angular.forEach($scope.companyBriefs,function(value, index){
						$scope.companyCodes = $scope.companyCodes + value.company_code + ",";
						$scope.creditCodes = $scope.creditCodes + value.credit_code + ",";
					})
					//去掉最后一个逗号
					$scope.companyCodes = $scope.companyCodes.substring(0,$scope.companyCodes.length-1);
					$scope.creditCodes = $scope.creditCodes.substring(0,$scope.creditCodes.length-1);

					getCollecttionInformation();
				}

			}else{
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}
		});
	}
	//6.8	收藏企业信息 一次请求一个文件夹下所有的数据
	$scope.collecttionInf = {};
	var getCollecttionInformation = function() {
		var options = {
			service_code: 'WINMET_APP_MODIFY_COLLECTION_GRADE',
			params: {
				service_code: 'WINMET_APP_MODIFY_COLLECTION_GRADE',
				company_code: $scope.companyCodes,
				credit_code: $scope.creditCodes
			}
		};
		getInterface.jsonp(options, function (results) {
			if (results.status == 'Y') {
				console.log("所有收藏企业信息列表");
				$scope.collecttionInf = results.results

				//重构数据结构
				reconfigurableArchitecture();

			} else {
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}
		});
	}

	/**
	 * 	重构数据结构
	 *
	 *	$scope.collection     		 //收藏接口结果
	 *	$scope.collectionList		//收藏企业列表
	 *	$scope.bonddetails 			//财务风险预测结果
	 *	$scope.companyBriefs  		//一个收藏文件夹下所有企业的工商简况
	 *	$scope.collecttionInf		//一个文件夹下所有的企业信息数据
	 */


	var reconfigurableArchitecture = function(){

		if($scope.collectionList.length && $scope.bonddetails.length && $scope.companyBriefs.length && $scope.collecttionInf.title.length){

			//评分小分项
			var bonddetails0 = $scope.bonddetails[0];
			var littleGrade = bonddetails0.little_grade;

			angular.forEach(littleGrade,function(value, index){
				switch(index){
					case 0:
						$scope.gradeSonTitle1 = value.score_card_titile;
						break;
					case 1:
						$scope.gradeSonTitle2 = value.score_card_titile;
						break;
					case 2:
						$scope.gradeSonTitle3 = value.score_card_titile;
						break;
					case 3:
						$scope.gradeSonTitle4 = value.score_card_titile;
						break;
				}
			})
			//去掉"评分"
			$scope.gradeTotalTitle = "总分";
			$scope.gradeSonTitle1 = $scope.gradeSonTitle1.substring(0,$scope.gradeSonTitle1.length-2);
			$scope.gradeSonTitle2 = $scope.gradeSonTitle2.substring(0,$scope.gradeSonTitle2.length-2);
			$scope.gradeSonTitle3 = $scope.gradeSonTitle3.substring(0,$scope.gradeSonTitle3.length-2);
			$scope.gradeSonTitle4 = $scope.gradeSonTitle4.substring(0,$scope.gradeSonTitle4.length-2);
			//其他表头文案
			$scope.headerCode = "代码";
			$scope.headerName = "名称";
			$scope.headerGtade = "评分";

			$scope.title = $scope.collecttionInf.title;
			console.log("标题");
			console.log($scope.title);

			var number = 0;
			angular.forEach($scope.title,function(value, index){
				number += value.son_list.length;
			})

			$scope.fixedWidth = {
				width: (1638.0 - 100 - 100 - 300 - 80 - 60)/number + 'px'
			};

			//是否显示代码 0不显示 1显示
			$scope.isShowCode = $scope.collecttionInf.ishow_code;

			$scope.classlist = [];

			$scope.gradeList = []; //评分集合
			$scope.dataList = [];	//其他数据集合

			//遍历该页所有企业工商简况 (每个企业都会有工商简况)
			angular.forEach($scope.collectionList,function(value, index){
				//收藏列表字段
				var colModel = {
					set_id:value.set_id,
					entry_id:value.entry_id,
					is_strategy:value.is_strategy,
					is_warning:value.is_warning,
					is_risk:value.is_risk,
				};

				//企业工商简况
				var briefsValue = $scope.companyBriefs[index];
				var briefsModel = {
					company_id:briefsValue.company_id,
					company_name:briefsValue.company_name,
					company_code:briefsValue.company_code,
					credit_code:briefsValue.credit_code,
				}

				//评分集合
				var gradeValue = $scope.bonddetails[index];
				var gradeModel = gradeValue.main_score_card; //总体评分对象
				var gradeList = gradeValue.little_grade; //其他评分集合
				var gradeValue1 = gradeList[0];
				var gradeValue2 = gradeList[1];
				var gradeValue3 = gradeList[2];
				var gradeValue4 = gradeList[3];

				$scope.gradeList = [
					gradeModel.score_card_value,
					gradeValue1.score_card_value,
					gradeValue2.score_card_value,
					gradeValue3.score_card_value,
					gradeValue4.score_card_value,
				];

				//评级信息集合
				var dataListCopy = $scope.collecttionInf.data_list;
				if(dataListCopy.length > index){
					var companyList = dataListCopy[index];
				}
				var companyCode = "";
				$scope.isShowCode = $scope.collecttionInf.ishow_code;

				//不定几个评级循环
				angular.forEach(companyList,function(value, index){
					if(index == 0){
						companyCode = value;
					}else{
						$scope.dataList.push(value);
					}
				})

				//重构的数据模型
				var model = {
					code:companyCode,   //从dataList集合取出第一个赋给code
					//工商简况 从4.3接口获取
					company_id:briefsModel.company_id,
					company_name:briefsModel.company_name,
					company_code:briefsModel.company_code,
					credit_code:briefsModel.credit_code,

					//预警 从收藏列表接口获取6.1
					set_id:colModel.set_id,
					entry_id:colModel.entry_id,
					is_strategy:colModel.is_strategy,
					is_warning:colModel.is_warning,
					is_risk:colModel.is_risk,
					gradeList:$scope.gradeList,
					dataList:$scope.dataList,
					isselected:false  //是否选中
				}
				$scope.classlist.push(model);
			})

			layui.use(['laypage', 'layer'], function(){
				var laypage = layui.laypage
						,layer = layui.layer;

				laypage({
					cont: 'demo1'
					,pages: Math.ceil($scope.totalCount/nums)   //总页数
					,groups: 5 									//连续显示分页数
				});

				var nums = 20; //每页出现的数据量

				//调用分页
				laypage({
					cont: 'demo1'
					,pages: Math.ceil($scope.totalCount/nums) //得到总页数
					,jump: function(obj){
						$scope.currentIndex = obj.curr - 1;
						getCollectList();
					}
				});

			});

			$scope.showCollectView = true; //请求完所有接口置为true

			console.log("classlist列表");
			console.log($scope.classlist);

		}
	}
	//选择
	$scope.selectedClassList = []; //已选列表
	$scope.selectedClass = function(item,index){
		if(item.isselected){
			item.isselected = false;
			for (var i = 0; i < $scope.selectedClassList.length; i++) {
				if (item.company_id == $scope.selectedClassList[i].company_id) {
					$scope.selectedClassList.splice(i, 1);
				}
			}
		}else{
			item.isselected = true;
			$scope.selectedClassList.push(item);
		}
		$scope.classlist[index] = item;
	}
	//全选
	$scope.allSelected = false;
	$scope.selectedAllClass = function(){
		$scope.allSelected = !$scope.allSelected;

		angular.forEach($scope.classlist,function(value,index){
			if($scope.allSelected){
				value.isselected = true;
			}else{
				value.isselected = false;
			}
			$scope.classlist[index] = value;
		})

		if($scope.allSelected){
			$scope.selectedClassList = $scope.classlist;
		}else{
			$scope.selectedClassList = [];

		}



	}

//	批量收藏
	$scope.batchCollection = function(){
		$scope.isShowBatchCollection = true;
	}
	//批量收藏传的企业名称
	$scope.batchCollectComName = {};

	//确认批量收藏
	$scope.tipConfirm = function(){
		$scope.isShowBatchCollection = false;

		var options = {
				service_code: 'WINMET_APP_ADD_COLLECTION',
				params:{
					service_code: 'WINMET_APP_ADD_COLLECTION',
					set_id:$scope.currentFavorite.set_id,
					entry_name:$scope.batchCollectComName.text
				}
			};
		getInterface.jsonp(options, function (results) {
			if (results.status == 'Y') {
				console.log("批量收藏企业成功");

				//重构数据结构
				reconfigurableArchitecture();

			} else {
				$scope.tip = true;
				$scope.tipTxt = results.error_msg;
			}
		});

	}
	$scope.closeBatchCollectionView = function(){
		$scope.isShowBatchCollection = false;

	}
	//所选加监控
	//$scope.addMonitoring = function(){
		////拼接企业code name
		//var companyCode = "";
		//var creditCode = "";
		//var entryName = "";
        //
		//angular.forEach($scope.selectedClassList,function(value,index){
		//	companyCode = companyCode + value.company_code + ",";
		//	creditCode = creditCode + value.credit_code + ",";
		//	entryName = entryName + value.entry_name + ","
		//})
		////去掉最后一个逗号
		//companyCode = companyCode.substring(0,companyCode.length-1);
		//creditCode = creditCode.substring(0,creditCode.length-1);
		//entryName = entryName.substring(0,entryName.length-1);

		//var options = {
		//	service_code: 'WINMET_APP_ADD_MONITOR',
		//	params:{
		//		service_code: 'WINMET_APP_ADD_MONITOR',
		//		set_id:$scope.currentFavorite.set_id,
		//		company_code:companyCode,
		//		credit_code:creditCode,
		//		entry_name:entryName
		//	}
		//};
		//getInterface.jsonp(options, function (results) {
		//	if (results.status == 'Y') {
		//		console.log("批量加入监控成功");
		//		//刷新监控列表
        //
		//	} else {
		//		$scope.tip = true;
		//		$scope.tipTxt = results.error_msg;
		//	}
		//});

	//}
	//删除选中
	//$scope.addMonitoring = function(){
	//	//拼接企业code
	//	var entryId = "";
    //
	//	angular.forEach($scope.selectedClassList,function(value,index){
	//		entryId = entryId + value.entry_id + ","
	//	})
	//	//去掉最后一个逗号
	//	entryId = entryId.substring(0,entryId.length-1);
    //
	//	var options = {
	//		service_code: 'WINMET_APP_CANCEL_COLLECTION',
	//		params:{
	//			service_code: 'WINMET_APP_CANCEL_COLLECTION',
	//			set_id:$scope.currentFavorite.set_id,
	//			company_code:companyCode,
	//			credit_code:creditCode,
	//			entry_name:entryName
	//		}
	//	};
	//	getInterface.jsonp(options, function (results) {
	//		if (results.status == 'Y') {
	//			console.log("批量加入监控成功");
	//			//刷新监控列表
    //
	//		} else {
	//			$scope.tip = true;
	//			$scope.tipTxt = results.error_msg;
	//		}
	//	});
	//}

//管理收藏夹
	//创建文件夹
	$scope.setup = function(){
		_hmt.push(['_trackEvent', setupA, setupB, setupC]);
		console.log(setupC);
		if($scope.fileName == undefined){
			$scope.tip = true;
			$scope.tipTxt = '文件夹名称不能为空'
		}else{
			//调接口6.5
			if($scope.fileName.length > 15){
				$scope.tip = true;
				$scope.tipTxt = '文件名称不能超过15个字'
			}
			else{
				//新建收藏6.5
			  	var setNewCollection = function() {
				  	var options = {
				        service_code: 'WINMET_APP_ADD_COLLECTION_SET',
				        params:{
				        	service_code: 'WINMET_APP_ADD_COLLECTION_SET',
					        display_name:$scope.fileName
				        }
				  	};
				    getInterface.jsonp(options, function (results) {
				        if(results.status == 'Y'){	
				        	getCollection();//6.4
				        	$scope.fileName = '';//清空输入框的内容
						}else{
							$scope.tip = true;
							$scope.tipTxt = results.error_msg;
						}		            	            
				    });
				} 
			 	setNewCollection();
			}
		}
		
	}
	//重命名
	$scope.rename = function(set_id,display_name){
		_hmt.push(['_trackEvent', renameA, renameB, renameC]);
		console.log(renameC);
//		alert(set_id)//得到对应的文件夹id
//		alert(display_name)//得到对应的文件夹的名称
		$scope.reNameSet = true;
		$scope.noattent = function(fileNewName){
			_hmt.push(['_trackEvent', renameNoAttentA, renameNoAttentB, renameNoAttentC]);
			console.log(renameNoAttentC);
//			alert(fileNewName)
//			alert(display_name)
			if(fileNewName == undefined){
				$scope.tip = true;
				$scope.tipTxt = '文件夹名称不能为空'
			}else{
				if(fileNewName.length > 15){
					$scope.tip = true;
					$scope.tipTxt = '文件名称不能超过15个字'
				}else{
					//修改文件夹名称接口6.7
				  	var setRenameCollection = function() {
					  	var options = {
						        service_code: 'WINMET_APP_MODIFY_COLLECTION_SET',
						        params:{
						        	service_code: 'WINMET_APP_MODIFY_COLLECTION_SET',
						        	set_id:set_id,
							        display_name:fileNewName
						        }
					  	};
					    getInterface.jsonp(options, function (results) {
					        if(results.status == 'Y'){
					        	
					        	$scope.reNameSet = false;
					        	//如果重命名的文件夹和收藏夹的名字相同，刷新
					        	if(display_name == $scope.colleList){
					        		getCollection();//6.4
					        	}
					        	//否则不刷新上面
					        	else{
					        		//只刷新自己6.4
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
								  		}
								  		
								  	})
					        	}
//					        	getCollection();//6.4
							}	
							else{
								$scope.tip = true;
								$scope.tipTxt = results.error_msg
							}		            	            
					    });
					} 
				 	setRenameCollection();
				}
			}
		}
	}
	//点击删除
	$scope.delect = function(set_id){
		_hmt.push(['_trackEvent',delectA, delectB, delectC]);
		console.log(delectC);
//		alert(set_id)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否删除？';
		//点击确定
		$scope.noattent = function(){
			_hmt.push(['_trackEvent',noattentGuanA, noattentGuanB, noattentGuanC]);
			console.log(noattentGuanC);
//			alert(set_id)
			//删除收藏文件夹6.6
			var deleteJiaBlack = function() {
			  	var options = {
			        service_code: 'WINMET_APP_DELETE_COLLECTION_SET',
			        params:{
			        	service_code: 'WINMET_APP_DELETE_COLLECTION_SET',
			        	set_id:set_id
			        }
			  	};
			    getInterface.jsonp(options, function (results) {
			        if(results.status == 'Y'){	
			        	$scope.noshowDialog = false;
			        	getCollection();//6.4
					}		            	            
			    });
			} 
		 	deleteJiaBlack();
		};
		
	}
	//收藏夹列表的切换显示
	$scope.listToggle = function(){
		$scope.showHideToggle = !$scope.showHideToggle;
	}
	
	
	//收藏夹-企业名称
	$scope.reSearch = function(companyName){
		$rootScope.$_userSearchData = {};
		$rootScope.$_userSearchData.searchKey = companyName;
		$rootScope.$broadcast('reSearch',search);
		scrollTo(0,0);
	};
	
	/********************************************/
	
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.monitorName = '/'+url[2];
//	  	alert($scope.monitorName)
	  	$scope.yijiulshwo = true;
	  	if($scope.monitorName == "/statement" || $scope.monitorName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
	});
    
    $scope.$on('joinMonitorSuccess',function(event,data){
		console.log(JSON.stringify(data));
		console.log(data[0]);
		if($scope.monitorList == data[0]){
//			alert($scope.monitorList)//文件名称
//			alert(data[1])//文件名称的id
			//7.1
			var monitorJiaListSuccess = function(){
  				var options = {
	        		service_code: 'WINMET_APP_MONITOR_LIST',
	       			params:{
	        			service_code: 'WINMET_APP_MONITOR_LIST',
	        			set_id:data[1]
	        		}
	  			};
	  			getInterface.jsonp(options, function (results) {
	          		if(results.status == 'Y'){
	          			$scope.monitorJia = results.results.list;
	          			$scope.monitorListCounts = results.results.total_count;
	          			$scope.paginationMonitor.totalItems = results.results.total_count;
	          			$scope.paginationMonitor.currentPage = 1;
					}		            	            
	      		});
			}
			monitorJiaListSuccess();
//			$scope.$watch('paginationMonitor.currentPage + paginationMonitor.itemsPerPage',monitorJiaListSuccess);

		}
	});
    
    //企业工商简况4.4
//	var monitorFour = function() {
//  	var options = {
//	        service_code: 'WINMET_APP_COMPANY_DETAILS',
//	        params:{
//	        	service_code: 'WINMET_APP_COMPANY_DETAILS',
//		        company_code: companyCode,//企业注册号
//				credit_code:creditCode//统一社会信用代码
//	        }
//  	};
//      getInterface.jsonp(options, function (results) {
//          if(results.status == 'Y'){	
//          	$scope.collectionPresent = results.results;
//			}		            	            
//      });
//	} 
    var companyCode;
    var creditCode;
    
    
    /*关闭弹出框*/
	$scope.noplayBox = function(){
		$scope.supportPlay = false;
		$scope.addmonitorPlay = false;//监控
		$scope.addblackPlay = false;//黑名单
		$scope.addcollectPlay = false;//收藏
		$scope.noshowDialog = false;
		$scope.reName = false;//重命名的弹框
		$scope.tip = false;//文件夹名称为空的弹框
	}
	$scope.okplay = function(){
		$scope.supportPlay = false;
	}
	
	$scope.newClose = function (){
//		_hmt.push(['_trackEvent', closeTipSelectA, closeTipSelectB, closeTipSelectC]);
		$scope.tip = false;
		$scope.reNameSet = false;
	}
	$scope.newCloseTwo = function(){
		$scope.tip = false;
		$scope.reNameSet = false;
	}
	//是否删除弹框
	$scope.closeToggle = function(){
		$scope.noshowDialog = false;
	}
	//是否重命名弹框
	$scope.closeRename = function(){
		$scope.reNameSet = false;
	}
	
	
	$scope.checkMonitorS = false;
    //input点击事件
    	//点击全选
	$scope.checkAllMonitor = function(){
		$scope.checkMonitorS =!$scope.checkMonitorS;
		if($scope.checkMonitorS == true){
			angular.forEach($scope.monitorJia,function(value, index){
	        	value.$selected = true;
	       	});
	       	$scope.deleteMonitorFours = function(){
	       		_hmt.push(['_trackEvent', deleteMonitorFoursA, deleteMonitorFoursB, deleteMonitorFoursC]);
	       		console.log(deleteMonitorFoursC);
				$scope.monitorListAlls = [];//全选的数组
				angular.forEach($scope.monitorJia,function(data,index){
					if(data.$selected == true){
						var value = JSON.stringify(data);
						$scope.monitorListAlls.push(value);
					}else{
						
					}
			    	
			   	});
//				console.log('dfghjk')
				if($scope.monitorListAlls != 0){
					$scope.noshowDialog = true;
					$scope.tanTxt = '是否删除？';
				}
				else{
					$scope.noshowDialog = false;
				   	$scope.tip = true;
					$scope.tipTxt = '请选择企业';
				}
				$scope.noattent = function(){
					_hmt.push(['_trackEvent', delectMonitorListA, delectMonitorListB, delectMonitorListC]);
		console.log(delectMonitorListC);
					$scope.setIdAll = [];//文件夹id
					$scope.entryIdAll = [];//项目id(即企业id)

			   		for(var i=0; i<$scope.monitorListAlls.length;i++){
//							console.log(JSON.parse ($scope.monitorListAlls[i]).set_id);
//							console.log(JSON.parse ($scope.monitorListAlls[i]).entry_id);
						
						//文件夹id
						var valueSetIdAlls = JSON.parse ($scope.monitorListAlls[i]).set_id;
						$scope.setIdAll.push(valueSetIdAlls);
					
						//项目id(即企业id)
						var valueEntryIdAlls = JSON.parse ($scope.monitorListAlls[i]).entry_id;
						$scope.entryIdAll.push(valueEntryIdAlls);
						
					}
					
					//7.3
					var abolishMonitorAll = function(){
						var options = {
					        service_code: 'WINMET_APP_CANCEL_MONITOR',
					        params:{
					        	service_code: 'WINMET_APP_CANCEL_MONITOR',
						        set_id:$scope.setIdAll,
					        	entry_id:$scope.entryIdAll
					        }
					  	};
				  		getInterface.jsonp(options, function (results) {
		          			if(results.status == 'Y'){
			          			$scope.monitorList = $scope.monitorList;//当前文件夹的名称
			        			$scope.noshowDialog = false;//弹框消失
			        			$scope.checkMonitorS = false;//全选取消
			        			$scope.tip = true;
								$scope.tipTxt = '删除成功';
		        				//7.4
								var monitorJiaTwo = function(){
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
					          				var monitorListSLength = $scope.monitorListS;
					          					for(var i =0; i<monitorListSLength.length; i++){
					          						if($scope.monitorListS[i].display_name == $scope.monitorList){
					          						$scope.set_id = $scope.monitorListS[i].set_id;
					          						//7.1
							          				var monitorJiaListTwo = function(){
								          				var options = {
											        		service_code: 'WINMET_APP_MONITOR_LIST',
											       			params:{
											        			service_code: 'WINMET_APP_MONITOR_LIST',
											        			set_id:$scope.set_id
											        		}
											  			};
											  			getInterface.jsonp(options, function (results) {
											          		if(results.status == 'Y'){
											          			$scope.checkMonitorS = false;//取消全选
											         $scope.monitorJia = results.results.list;
												$scope.monitorListCounts=results.results.total_count;
          										$scope.paginationMonitor.totalItems = results.results.total_count;
															}		            	            
											      		});
							          				}
//							          					monitorJiaListTwo();
$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', monitorJiaListTwo);
					          					}
					          				}
										}		            	            
					    			});
		        				}
		        				monitorJiaTwo()
							}
		          			else{
		          				$scope.noshowDialog = false;//弹框消失
			          			$scope.tip = true;
								$scope.tipTxt = results.error_msg;
		          			}
		          			
		      			});
					}
					abolishMonitorAll();
//					console.log($scope.entryIdAll)
			   		
//				   	
				}
	       	}
	       	
		}else{
			angular.forEach($scope.monitorJia,function(value, index){
	        	value.$selected = false;
	       	});
		}		
	}
	//单个点击
	$scope.checkMonitor = function(item,index){
		item.$selected = !item.$selected;
		//只要有1个为false,全选就会为false
		if(item.$selected == false){
			$scope.checkMonitorS = false;
		}
		var selected = $scope.monitorJia;
		for(var i = 0; i<selected.length;i++){
			if(selected[i].$selected == false || selected[i].$selected == undefined){
				$scope.checkMonitorS = false;
				return false;
			}
			if(selected[i].$selected == true){
				$scope.checkMonitorS = true;
			}			
		}		
	}
	
    //删除选中
    //监控列表的"删除选中"
	var deleteMonitorFoursA = 'deleteMonitorList';
	var deleteMonitorFoursB = 'click';
	var deleteMonitorFoursC = 'deleteMonitorListS';
    $scope.deleteMonitorFours = function(){
    	_hmt.push(['_trackEvent', deleteMonitorFoursA, deleteMonitorFoursB, deleteMonitorFoursC]);
		console.log(deleteMonitorFoursC);
//  	$scope.noshowDialog = true;
//		$scope.tanTxt = '是否删除？';
		$scope.monitorListFours = [];
		angular.forEach($scope.monitorJia,function(data,index){
			if(data.$selected == true){
				var value = JSON.stringify(data);
				$scope.monitorListFours.push(value);
			}else{
				
			}
	    	
	   	});
	   	if($scope.monitorListFours !=''){
//	   		console.log(JSON.stringify($scope.monitorListFours))
	   		$scope.noshowDialog = true;
			$scope.tanTxt = '是否删除？';
	   	}
	   	else{
	   		$scope.noshowDialog = false;
		   	$scope.tip = true;
			$scope.tipTxt = '请选择企业';
	   	}
		$scope.noattent = function(){
			_hmt.push(['_trackEvent', delectMonitorListA, delectMonitorListB, delectMonitorListC]);
		console.log(delectMonitorListC);
			$scope.setIdValue = [];//文件夹id
			$scope.entryIdValue = [];//项目id(即企业id)
			
	   		for(var i=0; i<$scope.monitorListFours.length;i++){
//	   			console.log(JSON.parse ($scope.monitorListFours[i]))
//				console.log(JSON.parse ($scope.monitorListFours[i]).set_id);
//				console.log(JSON.parse ($scope.monitorListFours[i]).entry_id);
				
				//文件夹id
				var valueSetIds = JSON.parse ($scope.monitorListFours[i]).set_id;
				$scope.setIdValue.push(valueSetIds);
				
				//项目id(即企业id)
				var valueEntryIds = JSON.parse ($scope.monitorListFours[i]).entry_id;
				$scope.entryIdValue.push(valueEntryIds);
				
			}
					
			//取消监控7.3
			var abolishMonitor = function(){
				var options = {
		        	service_code: 'WINMET_APP_CANCEL_MONITOR',
		        	params:{
			        	service_code: 'WINMET_APP_CANCEL_MONITOR',
				        set_id:$scope.setIdValue,
			        	entry_id:$scope.entryIdValue
		       		}
		  		};
		    	getInterface.jsonp(options, function (results) {
		        	if(results.status == 'Y'){
		        		$scope.monitorList = $scope.monitorList;//当前文件夹的名称
		        		$scope.noshowDialog = false;//弹框消失
		        		$scope.tip = true;
						$scope.tipTxt = '删除成功';
		        		//7.4
		        		var monitorJiaTwo = function(){
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
					          		var monitorListSLength = $scope.monitorListS;
					          		for(var i =0; i<monitorListSLength.length; i++){
					          			if($scope.monitorListS[i].display_name == $scope.monitorList){
					          				$scope.set_id = $scope.monitorListS[i].set_id;
					          				//7.1
					          				var monitorJiaListTwo = function(){
					          					var options = {
								        			service_code: 'WINMET_APP_MONITOR_LIST',
								       				params:{
								        				service_code: 'WINMET_APP_MONITOR_LIST',
								        				set_id:$scope.set_id
								        			}
								  				};
								  				getInterface.jsonp(options, function (results) {
								          			if(results.status == 'Y'){
								          				$scope.checkMonitorS = false;//取消全选
								          			$scope.monitorJia = results.results.list;
								          			$scope.monitorListCounts=results.results.total_count;
      										$scope.paginationMonitor.totalItems = results.results.total_count;
													}		            	            
								      			});
					          				}
//							          			monitorJiaListTwo();
$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', monitorJiaListTwo);

					          			}
					          		}
								}		            	            
					    	});
		        		}
		        		monitorJiaTwo()
					}
		        	else{
		        		$scope.noshowDialog = false;//弹框消失
			          	$scope.tip = true;
						$scope.tipTxt = results.error_msg;
		        	}
		    	});
			}
			abolishMonitor();
		   	
		}
    }
    
    //监控收藏夹7.4
    $scope.paginationMonitor = {
        currentPage: 1,//当前页
        itemsPerPage: 20,//每页多少条数据
        pagesLength:15//步长（如果设置建议设置为奇数）
    };
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
            	$scope.monitorAllCounts = results.counts;//文件夹的个数
//          	alert($scope.monitorAllCounts + '文件个数')
            	if($scope.monitorAllCounts != 0){
            		$scope.monitorList = $scope.monitorListS[0].display_name;//默认第一个
    				$scope.set_id = $scope.monitorListS[0].set_id;
            	}
            	//如果文件的个数为0，显示无图数据
            	if($scope.monitorAllCounts == 0){
            		$scope.monitorListCounts = 0
            	}
            	
    			//监控列表7.1
    			var monitorJiaList = function() {
				  	var options = {
				        service_code: 'WINMET_APP_MONITOR_LIST',
				        params:{
				        	service_code: 'WINMET_APP_MONITOR_LIST',
					        set_id:$scope.set_id,
					        current_index:($scope.paginationMonitor.currentPage - 1)*20,
	        				page_size:$scope.paginationMonitor.itemsPerPage
				        }
				  	};
				    getInterface.jsonp(options, function (results) {
				        if(results.status == 'Y'){
				        	$scope.checkMonitorS = false;//取消全选
				          	$scope.monitorJia = results.results.list;
				          	$scope.paginationMonitor.totalItems = results.results.total_count;
				          	$scope.monitorListCounts = results.results.total_count;
				          	//获取下标值
							var indexValueMonitor = ($scope.paginationMonitor.currentPage - 1)*20;
//							alert(indexValueMonitor)
							if(indexValueMonitor > 0){
								$location.hash('jumpListHighMonitor');
    							$anchorScroll.yOffset = 100;
								$anchorScroll();
							}
						}		            	            
				    });
				} 
//		 		monitorJiaList();
		 		$scope.$watch('paginationMonitor.currentPage + paginationMonitor.itemsPerPage', monitorJiaList);
		 		$scope.mons = function(monitorList){
					var monitorListLength = $scope.monitorListS;
//			       	alert(JSON.stringify($scope.monitorListS))
			       	for(var i =0; i<monitorListLength.length; i++){
	        			if($scope.monitorListS[i].display_name == monitorList){
			    			$scope.set_id = $scope.monitorListS[i].set_id;
//			    			monitorJiaList();
			    			$scope.$watch('paginationMonitor.currentPage + paginationMonitor.itemsPerPage', monitorJiaList);
					 	}
				 	}
				}
			}		            	            
        });
	} 
   	monitorJia();
   	
	

	
//管理收藏夹
	//创建文件夹
	$scope.setupThree = function(){
		_hmt.push(['_trackEvent', setupThreeA, setupThreeB, setupThreeC]);
		console.log(setupThreeC);
//		alert($scope.fileName);
		if($scope.fileNameThree == undefined){
			$scope.tip = true;
			$scope.tipTxt = '文件夹名称不能为空'
		}else{
			if($scope.fileNameThree.length > 15){
				$scope.tip = true;
				$scope.tipTxt = '文件名称不能超过15个字'
			}else{
//				alert($scope.fileNameThree)//获取输入框内容
				//新建监控文件夹7.5
				var setNewBlack = function() {
				  	var options = {
				        service_code: 'WINMET_APP_ADD_MONITOR_SET',
				        params:{
				        	service_code: 'WINMET_APP_ADD_MONITOR_SET',
					        display_name:$scope.fileNameThree
				        }
				  	};
				    getInterface.jsonp(options, function (results) {
				        if(results.status == 'Y'){	
				        	monitorJia();//7.4
				        	$scope.fileNameThree = '';//清空输入框的内容
//							var options = {
//						        service_code: 'WINMET_APP_MONITOR_SET_LIST',
//						        params:{
//						        	service_code: 'WINMET_APP_MONITOR_SET_LIST',
//						        	type:1
//						        }
//						  	};
//					      	getInterface.jsonp(options, function (results) {
//					          	if(results.status == 'Y'){
//					          		$scope.monitorListS = results.results;
//								}		            	            
//					      	});
						}	
						else{
							$scope.tip = true;
							$scope.tipTxt = results.error_msg
						}
				    });
				} 
			 	setNewBlack();
		 	}
		}
		
	}
	//重命名
	$scope.renameThree = function(set_id,index,display_name){
		_hmt.push(['_trackEvent', renameThreeA, renameThreeB, renameThreeC]);
		console.log(renameThreeC);
//		alert(set_id)//得到对应的文件夹id
//		alert(index)
//		alert(display_name)
		//获取滚动条滚动的高度
//		var scrollTop=0;
//		scrollTop=document.body.scrollHeight; 
//		alert(scrollTop)
		
		$scope.reNameSet = true;
//		alert($scope.reName);
		$scope.noattent = function(fileNewName){
			_hmt.push(['_trackEvent', noattentJiankongA, noattentJiankongB, noattentJiankongC]);
			console.log(noattentJiankongC);
//			alert(fileNewName)
			if(fileNewName == undefined){
				$scope.tip = true;
				$scope.tipTxt = '文件夹名称不能为空'
			}else{
				if(fileNewName.length > 15){
					$scope.tip = true;
					$scope.tipTxt = '文件名称不能超过15个字'
				}else{
//					alert(fileNewName);
					//修改监控文件夹7.7
				  	var setRenameThree = function() {
					  	var options = {
						        service_code: 'WINMET_APP_MODIFY_MONITOR_SET',
						        params:{
						        	service_code: 'WINMET_APP_MODIFY_MONITOR_SET',
						        	set_id:set_id,
							        display_name:fileNewName
						        }
					  	};
					    getInterface.jsonp(options, function (results) {
					        if(results.status == 'Y'){	
					        	$scope.reNameSet = false;
					        	monitorJia();
							}	
							else{
								$scope.tip = true;
								$scope.tipTxt = results.error_msg
							}
					    });
					} 
				 	setRenameThree();
				}
			}
		}
	}
	//点击删除
	$scope.delectThree = function(set_id){
		_hmt.push(['_trackEvent', delectThreeA, delectThreeB, delectThreeC]);
		console.log(delectThreeC);
//		alert(set_id)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否删除？';
		//点击确定
		$scope.noattent = function(){
			_hmt.push(['_trackEvent', noattentThreeA, noattentThreeB, noattentThreeC]);
			console.log(noattentThreeC);
//			alert(set_id)
			//删除收藏文件夹7.6
			var deleteJiaThree = function() {
			  	var options = {
			        service_code: 'WINMET_APP_DELETE_MONITOR_SET',
			        params:{
			        	service_code: 'WINMET_APP_DELETE_MONITOR_SET',
			        	set_id:set_id
			        }
			  	};
			    getInterface.jsonp(options, function (results) {
			        if(results.status == 'Y'){
			        	$scope.noshowDialog = false;
			        	monitorJia();//7.4
					}		            	            
			    });
			} 
		 	deleteJiaThree();
		};
		
	}
	
	//监控管理-企业名称
	$scope.reSearchMon = function(companyName){
		$rootScope.$_userSearchData = {};
		$rootScope.$_userSearchData.searchKey = companyName;
		$rootScope.$broadcast('reSearch',search);
		scrollTo(0,0);
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
