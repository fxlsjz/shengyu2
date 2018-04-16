'use strict';
/**
 * 名单管理
 */
app.controller('nameListCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$http) {

	var nameListA = 'tabNameList';
	var nameListB = 'click';
	var nameListC = 'nameList';
	_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

	/*选项卡切换*/
	$scope.changeActive=1;
    $scope.changes=function(index,id){

		//左侧菜单栏按钮点击统计
		switch (index){
			case 1:
			{
				var nameListA = 'nameList_searchCompany';
				var nameListB = 'click';
				var nameListC = 'searchCompany';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);
			}
				break;
			case 2:
			{
				var nameListA = 'nameList_blacklist';
				var nameListB = 'click';
				var nameListC = 'blacklist';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);
			}
				break;
			case 3:
			{
				var nameListA = 'nameList_blackManager';
				var nameListB = 'click';
				var nameListC = 'blackManager';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);
			}
				break;
			case 4:
			{
				var nameListA = 'nameList_redlist';
				var nameListB = 'click';
				var nameListC = 'redlist';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);
			}
				break;
			case 5:
			{
				var nameListA = 'nameList_redManager';
				var nameListB = 'click';
				var nameListC = 'redManager';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);
			}
				break;
		}


    	$scope.changeActive=index;
    	$location.hash(id);
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
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
//		        	alert(1)
				}
//		        else{
//		        	alert(results.error_msg)
//		        }
		    });
		}
		threeSeven();
    }
    
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.nameListName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.nameListName == "/statement" || $scope.nameListName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
	});
    
    
    $scope.$on('joinBlackSuccess',function(event,data){
		console.log(JSON.stringify(data));
		console.log(data[0]);
		if($scope.nameBlack == data[0]){
//			alert($scope.nameBlack)//文件名称
//			alert(data[1])//文件名称的id
			//8.1
			var blackListSuccess = function() {
	  			var options = {
	        		service_code: 'WINMET_APP_BLACK_LIST',
	       			params:{
	        			service_code: 'WINMET_APP_BLACK_LIST',
	        			set_id:data[1]
	        		}
	  			};
	      		getInterface.jsonp(options, function (results) {
	          		if(results.status == 'Y'){
	          			$scope.blackList = results.results.list;
	          			$scope.blackListCounts = results.counts;//条数
				        $scope.paginationBlack.totalItems = results.results.total_count;
				        $scope.paginationBlack.currentPage = 1;
					}		            	            
	      		});
			} 
			blackListSuccess(); 
//			$scope.$watch('paginationBlack.currentPage + paginationBlack.itemsPerPage', blackListSuccess);
		}
	});
	
	$scope.$on('joinRedSuccess',function(event,data){
		console.log(JSON.stringify(data));
		console.log(data[0]);
		if($scope.nameRed == data[0]){
//			alert($scope.nameRed)//文件名称
//			alert(data[1])//文件名称的id
			//9.1
			var redListSuccess = function() {
	  			var options = {
	        		service_code: 'WINMET_APP_RED_LIST',
	       			params:{
	        			service_code: 'WINMET_APP_RED_LIST',
	        			set_id:data[1]
	        		}	
	  			};
      			getInterface.jsonp(options, function (results) {
          			if(results.status == 'Y'){
          				$scope.redList = results.results.list;
          				$scope.redListCounts = results.counts;
			          	$scope.paginationRed.totalItems = results.results.total_count;
			          	$scope.paginationRed.currentPage = 1;
					}		            	            
      			});
			} 
			redListSuccess();
//			$scope.$watch('paginationRed.currentPage + paginationRed.itemsPerPage', redListSuccess);
		}
	});
    
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
   	
//黑名单模块  	
	//全选
	$scope.checks = false;
	$scope.checkAllBlack = function(){
		$scope.checks =!$scope.checks;
		if($scope.checks == true){
			angular.forEach($scope.blackList,function(value, index){
	        	value.$selected = true;
	       	});
	       		//删除选中
	       	$scope.delectBlackSelect = function(){

				var nameListA = 'nameList_delectBlackList';
				var nameListB = 'click';
				var nameListC = 'delectBlackList';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

	       		$scope.blackListAlls = [];//全选的数组
	       		angular.forEach($scope.blackList,function(data,index){
					if(data.$selected == true){
						var value = JSON.stringify(data);
						$scope.blackListAlls.push(value);
					}else{
						
					}
			    	
			   	});
			   	if($scope.blackListAlls != ''){
					$scope.noshowDialog = true;
					$scope.tanTxt = '是否删除？';
				}
				else{
		  			$scope.tip = true;
					$scope.tipTxt = '请选择企业';
				}
				$scope.noattent = function(){
					$scope.blackSetIdAll = [];//文件夹id
					$scope.blackEntryIdAll = [];//项目id(即企业id)
					for(var i=0; i<$scope.blackListAlls.length;i++){
						//文件夹id
						var setIdBlackAll = JSON.parse ($scope.blackListAlls[i]).set_id;
						$scope.blackSetIdAll.push(setIdBlackAll);
					
						//项目id(即企业id)
						var entryIdBlackAll = JSON.parse ($scope.blackListAlls[i]).entry_id;
						$scope.blackEntryIdAll.push(entryIdBlackAll);
					
					}
//					console.log($scope.blackEntryIdAll)
//					console.log($scope.blackSetIdAll)
					//调删除的接口8.3
					var removeBlackListAll = function(){

						var nameListA = 'nameList_delectBlackListOK';
						var nameListB = 'click';
						var nameListC = 'delectBlackListOK';
						_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);


						var options = {
					        service_code: 'WINMET_APP_CANCEL_BLACK',
					        params:{
					        	service_code: 'WINMET_APP_CANCEL_BLACK',
					        	set_id:$scope.blackSetIdAll,
					        	entry_id:$scope.blackEntryIdAll
					        }
				    	};
		        		getInterface.jsonp(options, function (results) {
		            		if(results.status == 'Y'){
		            			$scope.nameBlack = $scope.nameBlack;
								$scope.noshowDialog = false;
								$scope.tip = true;
								$scope.tipTxt = '删除成功';
								$scope.checks = false;
								//8.4
								var blackListGuanliTwo = function() {
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
											var blackListLength = $scope.blackListName;
							       			for(var i =0; i<blackListLength.length; i++){
					        					if($scope.blackListName[i].display_name == $scope.nameBlack){
							    					$scope.set_id = $scope.blackListName[i].set_id;
	//							    					alert($scope.set_id)
							    					//8.1
													var blackListTwo = function() {
											  			var options = {
											        		service_code: 'WINMET_APP_BLACK_LIST',
											       			params:{
											        			service_code: 'WINMET_APP_BLACK_LIST',
											        			set_id:$scope.set_id
											        		}
											  			};
											      		getInterface.jsonp(options, function (results) {
											          		if(results.status == 'Y'){
											          			$scope.blackList = results.results.list;
											          			$scope.blackListCounts = results.counts;//条数
					        								$scope.paginationBlack.totalItems = results.results.total_count;
															}		            	            
											      		});
													} 
	//					 							blackListTwo(); 
					 							
			$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', blackListTwo);
									 			}
								 			} 
			 							}  	            
	    							});
								} 
								blackListGuanliTwo();
							}
		            		else{
		            			$scope.noshowDialog = false;//弹框消失
				          		$scope.tip = true;
								$scope.tipTxt = results.error_msg;
		            		}
		            		
		        		});
					}
					removeBlackListAll();
					
				}
				
	       	}
	       	
		}else{
			angular.forEach($scope.blackList,function(value, index){
	        	value.$selected = false;
	       	});
		}
	}
	//单个点击      黑名单
	$scope.checkBlackList = function(blackListS,index){
		blackListS.$selected = !blackListS.$selected;
	}
	//删除选中
	$scope.delectBlackSelect = function(){

		var nameListA = 'nameList_delectBlackList';
		var nameListB = 'click';
		var nameListC = 'delectBlackList';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

		$scope.seletBlack = [];
		angular.forEach($scope.blackList,function(data,index){
			if(data.$selected == true){
				var value = JSON.stringify(data);
				$scope.seletBlack.push(value);
			}else{
				
			}
	    	
	   	});
		if($scope.seletBlack != ''){
			$scope.noshowDialog = true;
			$scope.tanTxt = '是否删除？';
		}
		else{
//			$scope.noshowDialog = false;
			$scope.tip = true;
			$scope.tipTxt = '请选择企业';
		}
		
		$scope.noattent = function(){
//			alert($scope.nameBlack)
			
//	   	alert($scope.seletBlack)
			$scope.setIdBlack = [];//文件夹id
			$scope.entryIdBlack = [];//项目id(即企业id)
			
	   			for(var i=0; i<$scope.seletBlack.length;i++){
//		   			console.log(JSON.parse ($scope.seletBlack[i]))
//					console.log(JSON.parse ($scope.seletBlack[i]).set_id);
//					console.log(JSON.parse ($scope.seletBlack[i]).entry_id);
					
					//文件夹id
					var valueSetIdBlack = JSON.parse ($scope.seletBlack[i]).set_id;
					$scope.setIdBlack.push(valueSetIdBlack);
				
					//项目id(即企业id)
					var valueEntryIdBlack = JSON.parse ($scope.seletBlack[i]).entry_id;
					$scope.entryIdBlack.push(valueEntryIdBlack);
				
				}
	   			
				//调删除的接口8.3
				var removeBlackList = function(){

					var nameListA = 'nameList_delectBlackList';
					var nameListB = 'click';
					var nameListC = 'delectBlackList';
					_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

					var options = {
				        service_code: 'WINMET_APP_CANCEL_BLACK',
				        params:{
				        	service_code: 'WINMET_APP_CANCEL_BLACK',
				        	set_id:$scope.setIdBlack,
				        	entry_id:$scope.entryIdBlack
				        }
			    	};
	        		getInterface.jsonp(options, function (results) {
	            		if(results.status == 'Y'){
	            			$scope.nameBlack = $scope.nameBlack;
							$scope.noshowDialog = false;
							$scope.tip = true;
							$scope.tipTxt = '删除成功';
							$scope.checks = false;
							//8.4
							var blackListGuanliTwo = function() {
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
										var blackListLength = $scope.blackListName;
						       			for(var i =0; i<blackListLength.length; i++){
				        					if($scope.blackListName[i].display_name == $scope.nameBlack){
						    					$scope.set_id = $scope.blackListName[i].set_id;
//							    					alert($scope.set_id)
						    					//8.1
												var blackListTwo = function() {
										  			var options = {
										        		service_code: 'WINMET_APP_BLACK_LIST',
										       			params:{
										        			service_code: 'WINMET_APP_BLACK_LIST',
										        			set_id:$scope.set_id
										        		}
										  			};
										      		getInterface.jsonp(options, function (results) {
										          		if(results.status == 'Y'){
										          			$scope.blackList = results.results.list;
										          			$scope.blackListCounts = results.counts;//条数
				        								$scope.paginationBlack.totalItems = results.results.total_count;
														}		            	            
										      		});
												} 
//					 							blackListTwo(); 
				 							
		$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', blackListTwo);
								 			}
							 			} 
		 							}  	            
    							});
							} 
							blackListGuanliTwo();
						}
	            		else{
	            			$scope.noshowDialog = false;//弹框消失
			          		$scope.tip = true;
							$scope.tipTxt = results.error_msg;
	            		}
	            		
	        		});
				}
				removeBlackList();
	   			
	   		
	   	}
	}
	//接口8.4
	$scope.paginationBlack = {
        currentPage: 1,//当前页
        itemsPerPage: 20,//每页多少条数据
        pagesLength:15//步长（如果设置建议设置为奇数）
    };
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
            	if($scope.blackListName != ''){
            		$scope.nameBlack = $scope.blackListName[0].display_name;
    				$scope.set_idBlack = $scope.blackListName[0].set_id;
    				
            	}
            	//如果文件的个数为0，显示无图数据
            	if(results.counts == 0){
            		$scope.blackListCounts = 0;
            		$scope.blackAllCounts = 0;
//          		alert($scope.blackListCounts + 'aaaaaaa')
            	}
            	
//  			alert($scope.nameBlack)
    			//黑名单8.1
				var blackList = function() {
				  	var options = {
				        service_code: 'WINMET_APP_BLACK_LIST',
				        params:{
				        	service_code: 'WINMET_APP_BLACK_LIST',
				        	set_id:$scope.set_idBlack,
				        	current_index:($scope.paginationBlack.currentPage - 1)*20,
	        				page_size:$scope.paginationBlack.itemsPerPage
				        }
				  	};
				    getInterface.jsonp(options, function (results) {
				        if(results.status == 'Y'){	
				          	$scope.blackList = results.results.list;
				          	$scope.blackListCounts = results.counts;//条数
				          	$scope.paginationBlack.totalItems = results.results.total_count;
//				          	alert($scope.blackListCounts +'hjk')
							//获取下标值
							var indexValueBlacklist = ($scope.paginationBlack.currentPage - 1)*20;
							if(indexValueBlacklist != 0){
								$location.hash('jumpHighBlacklist');
    							$anchorScroll.yOffset = 100;
								$anchorScroll();
							}
						}
				    });
				} 
//			 	blackList();
			 	$scope.$watch('paginationBlack.currentPage + paginationBlack.itemsPerPage', blackList);
			 	$scope.nameS = function(nameBlack){
//			 		alert(nameBlack)
			       	var blackListLength = $scope.blackListName;
//			       	alert($scope.blackListName)
			       	for(var i =0; i<blackListLength.length; i++){
	        			if($scope.blackListName[i].display_name == nameBlack){
			    			$scope.set_idBlack = $scope.blackListName[i].set_id;
//			    			alert($scope.set_id)
//			    			blackList();
			    			$scope.$watch('paginationBlack.currentPage + paginationBlack.itemsPerPage', blackList);
					 	}
				 	}
			    }
			}		            	            
        });
	} 
   	blackListGuanli();
//管理黑名单	
	//创建文件夹
	$scope.setupBlack = function(){

		//创建黑名单按钮点击统计
		var nameListA = 'nameList_createBlackList';
		var nameListB = 'click';
		var nameListC = 'createBlackList';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);


		if($scope.fileNameBlack == undefined){
			$scope.tip = true;
			$scope.tipTxt = '文件夹名称不能为空'
		}else{
//			alert($scope.fileNameBlack)//获取输入框内容
			if($scope.fileNameBlack.length > 15){
				$scope.tip = true;
				$scope.tipTxt = '文件名称不能超过15个字'
			}
			else{
				//创建黑名单按钮统计
				var nameListA = 'nameList_createBlackListOK';
				var nameListB = 'click';
				var nameListC = 'createBlackListOK';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

				//新建黑名单文件夹8.5
			  	var setNewBlack = function() {
				  	var options = {
				        service_code: 'WINMET_APP_ADD_BLACK_SET',
				        params:{
				        	service_code: 'WINMET_APP_ADD_BLACK_SET',
					        display_name:$scope.fileNameBlack
				        }
				  	};
				    getInterface.jsonp(options, function (results) {
				        if(results.status == 'Y'){	
				        	blackListGuanli();
				        	$scope.blackAllCounts = 1;//无数据图消失
				        	$scope.fileNameBlack = '';//清空输入框的内容
						}else{
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
	$scope.renameBlack = function(set_id){


		var nameListA = 'nameList_renameBlackList';
		var nameListB = 'click';
		var nameListC = 'renameBlackList';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

//		alert(set_id)//得到对应的文件夹id
		$scope.reNameSet = true;
		$scope.noattent = function(fileNewName){
//			alert(fileNewName)
			if(fileNewName == undefined){
				$scope.tip = true;
				$scope.tipTxt = '文件夹名称不能为空'
			}else{
				if(fileNewName.length > 15){
					$scope.tip = true;
					$scope.tipTxt = '文件名称不能超过15个字'
				}
				else{

					var nameListA = 'nameList_renameBlackListOK';
					var nameListB = 'click';
					var nameListC = 'renameBlackListOK';
					_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

					//修改黑名单文件夹8.7
				  	var setRenameBlack = function() {
					  	var options = {
						        service_code: 'WINMET_APP_MODIFY_BLACK_SET',
						        params:{
						        	service_code: 'WINMET_APP_MODIFY_BLACK_SET',
						        	set_id:set_id,
							        display_name:fileNewName
						        }
					  	};
					    getInterface.jsonp(options, function (results) {
					        if(results.status == 'Y'){
					        	$scope.reNameSet = false;
					        	blackListGuanli();
							}	
							else{
								$scope.tip = true;
								$scope.tipTxt = results.error_msg
							}		            	            
					    });
					} 
				 	setRenameBlack();
				}
				
			}
		}
	}
	//点击删除
	$scope.delectBlack = function(set_id){

		//黑名单管理删除按钮
		var nameListA = 'nameList_delectBlackListManager';
		var nameListB = 'click';
		var nameListC = 'delectBlackListManager';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

//		alert(set_id)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否删除？';
		//点击确定
		$scope.noattent = function(){

			//黑名单管理删除按钮
			var nameListA = 'nameList_delectBlackListManagerOK';
			var nameListB = 'click';
			var nameListC = 'delectBlackListManagerOK';
			_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

			//删除黑名单文件夹8.6
			var deleteJiaBlack = function() {
			  	var options = {
			        service_code: 'WINMET_APP_DELETE_BLACK_SET',
			        params:{
			        	service_code: 'WINMET_APP_DELETE_BLACK_SET',
			        	set_id:set_id
			        }
			  	};
			    getInterface.jsonp(options, function (results) {
			        if(results.status == 'Y'){	
			        	$scope.noshowDialog = false;
			        	blackListGuanli();
					}		            	            
			    });
			} 
		 	deleteJiaBlack();
		};
		
	}
	
//红名单模块
	//全选
	$scope.checksRed = false;
	$scope.checkAllRed = function(){
		$scope.checksRed =!$scope.checksRed;
		if($scope.checksRed == true){
			angular.forEach($scope.redList,function(value, index){
	        	value.$selected = true;
	       	});
	       		//删除选中
	       	$scope.delectRedSelect = function(){

				var nameListA = 'nameList_delectRedList';
				var nameListB = 'click';
				var nameListC = 'delectRedList';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

	       		$scope.redListAlls = [];//全选的数组
				angular.forEach($scope.redList,function(data,index){
					if(data.$selected == true){
						var value = JSON.stringify(data);
						$scope.redListAlls.push(value);
					}else{
						
					}
			    	
			   	});
			   	if($scope.redListAlls != ''){
					$scope.noshowDialog = true;
					$scope.tanTxt = '是否删除？';
				}
				else{
		  			$scope.tip = true;
					$scope.tipTxt = '请选择企业';
				}
				$scope.noattent = function(){
					$scope.setIdRedAll = [];//文件夹id
					$scope.entryIdRedAll = [];//项目id(即企业id)
					for(var i=0; i<$scope.redListAlls.length;i++){
						//文件夹id
						var setIdRedAll = JSON.parse ($scope.redListAlls[i]).set_id;
						$scope.setIdRedAll.push(setIdRedAll);
					
						//项目id(即企业id)
						var entryIdRedAll = JSON.parse ($scope.redListAlls[i]).entry_id;
						$scope.entryIdRedAll.push(entryIdRedAll);
		
					}
//					console.log($scope.entryIdRedAll)
					//调删除的接口9.3
					var removeRedListAll = function() {

						var nameListA = 'nameList_delectRedListOK';
						var nameListB = 'click';
						var nameListC = 'delectRedListOK';
						_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

				  		var options = {
				        	service_code: 'WINMET_APP_CANCEL_RED',
				        	params:{
				        		service_code: 'WINMET_APP_CANCEL_RED',
				        		set_id:$scope.setIdRedAll,
				        		entry_id:$scope.entryIdRedAll
				        	}
				        
				  		};
		      			getInterface.jsonp(options, function (results) {
		          			if(results.status == 'Y'){	
		//		          				alert('删除成功')
		          				$scope.nameRed = $scope.nameRed;
								$scope.noshowDialog = false;
								$scope.tip = true;
								$scope.tipTxt = '删除成功';
								$scope.checksRed = false;
		//								alert('文件夹名称' + $scope.nameRed)
								//9.4
								var redListGuanliTwo = function() {
					    			var options = {
						        		service_code: 'WINMET_APP_RED_SET_LIST',
						       			params:{
						        			service_code: 'WINMET_APP_RED_SET_LIST',
						        			type:1
						        		}	
					    			};
					        		getInterface.jsonp(options, function (results) {
					            		if(results.status == 'Y'){
		//					            			alert('wefrfvf')
		    								$scope.redListName = results.results;
		//          								alert(JSON.stringify($scope.redListName))
											var redListLength = $scope.redListName;
							       			for(var i =0; i<redListLength.length; i++){
					        					if($scope.redListName[i].display_name == $scope.nameRed){
							    					$scope.set_id = $scope.redListName[i].set_id;
		//							    					alert($scope.set_id)
		//							    					alert('ok')
							    					//9.1
													var redListTwo = function() {
											  			var options = {
											        		service_code: 'WINMET_APP_RED_LIST',
											       			params:{
											        			service_code: 'WINMET_APP_RED_LIST',
											        			set_id:$scope.set_id
											        		}	
											  			};
										      			getInterface.jsonp(options, function (results) {
										          			if(results.status == 'Y'){
										          				$scope.redList = results.results.list;
										          				$scope.redListCounts = results.counts;
				          									$scope.paginationRed.totalItems = results.results.total_count
															}		            	            
										      			});
													} 
		//				 								redListTwo();   
					$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', redListTwo);
									 			}
								 			} 
			 							}  	            
									});
								} 
								redListGuanliTwo();
							}
		          			else{
		          				$scope.noshowDialog = false;//弹框消失
				          		$scope.tip = true;
								$scope.tipTxt = results.error_msg;
		          			}
		          			
		      			});
					} 
				 	removeRedListAll();
					
				}
				
	       	}
	       	
		}else{
			angular.forEach($scope.redList,function(value, index){
	        	value.$selected = false;
	       	});
		}	
	}
//checkAllRed
		//单个点击      红名单
	$scope.checkRedList = function(redListS,index){
		redListS.$selected = !redListS.$selected;
	}
	//删除选中
	$scope.delectRedSelect = function(){

		var nameListA = 'nameList_delectRedList';
		var nameListB = 'click';
		var nameListC = 'delectRedList';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

		$scope.seletRed = [];
		angular.forEach($scope.redList,function(data,index){
//			alert(JSON.stringify(data));
			if(data.$selected == true){
				var value = JSON.stringify(data);
				$scope.seletRed.push(value);
			}else{
				
			}
	    	
	  	});
	  	if($scope.seletRed != ''){
	  		$scope.noshowDialog = true;
			$scope.tanTxt = '是否删除？';
	  	}
	  	else{
	  		$scope.tip = true;
			$scope.tipTxt = '请选择企业';
	  	}
		  	
		$scope.noattent = function(){
			
//			alert($scope.nameRed)
			$scope.setIdRed = [];//文件夹id
			$scope.entryIdRed = [];//项目id(即企业id)
			
			for(var i=0; i<$scope.seletRed.length;i++){
//					alert($scope.seletRed[i].company_name)
//				console.log(JSON.parse ($scope.seletRed[i]))
//				console.log(JSON.parse ($scope.seletRed[i]).set_id);
//				console.log(JSON.parse ($scope.seletRed[i]).entry_id);
//					alert($scope.nameRed)
				//文件夹id
				var valueSetIdRed = JSON.parse ($scope.seletRed[i]).set_id;
				$scope.setIdRed.push(valueSetIdRed);
			
				//项目id(即企业id)
				var valueEntryIdRed = JSON.parse ($scope.seletRed[i]).entry_id;
				$scope.entryIdRed.push(valueEntryIdRed);

			}

			//调删除的接口9.3
			var removeRedList = function() {

				var nameListA = 'nameList_delectRedListOK';
				var nameListB = 'click';
				var nameListC = 'delectRedListOK';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

		  		var options = {
		        	service_code: 'WINMET_APP_CANCEL_RED',
		        	params:{
		        		service_code: 'WINMET_APP_CANCEL_RED',
		        		set_id:$scope.setIdRed,
		        		entry_id:$scope.entryIdRed
		        	}
		        
		  		};
      			getInterface.jsonp(options, function (results) {
          			if(results.status == 'Y'){	
//		          				alert('删除成功')
          				$scope.nameRed = $scope.nameRed;
						$scope.noshowDialog = false;
						$scope.tip = true;
						$scope.tipTxt = '删除成功';
						$scope.checksRed = false;
//								alert('文件夹名称' + $scope.nameRed)
						//9.4
						var redListGuanliTwo = function() {
			    			var options = {
				        		service_code: 'WINMET_APP_RED_SET_LIST',
				       			params:{
				        			service_code: 'WINMET_APP_RED_SET_LIST',
				        			type:1
				        		}	
			    			};
			        		getInterface.jsonp(options, function (results) {
			            		if(results.status == 'Y'){
//					            			alert('wefrfvf')
    								$scope.redListName = results.results;
//          								alert(JSON.stringify($scope.redListName))
									var redListLength = $scope.redListName;
					       			for(var i =0; i<redListLength.length; i++){
			        					if($scope.redListName[i].display_name == $scope.nameRed){
					    					$scope.set_id = $scope.redListName[i].set_id;
//							    					alert($scope.set_id)
//							    					alert('ok')
					    					//9.1
											var redListTwo = function() {
									  			var options = {
									        		service_code: 'WINMET_APP_RED_LIST',
									       			params:{
									        			service_code: 'WINMET_APP_RED_LIST',
									        			set_id:$scope.set_id
									        		}	
									  			};
								      			getInterface.jsonp(options, function (results) {
								          			if(results.status == 'Y'){
								          				$scope.redList = results.results.list;
								          				$scope.redListCounts = results.counts;
		          									$scope.paginationRed.totalItems = results.results.total_count
													}		            	            
								      			});
											} 
//				 								redListTwo();   
			$scope.$watch('paginationCollection.currentPage + paginationCollection.itemsPerPage', redListTwo);
							 			}
						 			} 
	 							}  	            
							});
						} 
						redListGuanliTwo();
					}
          			else{
          				$scope.noshowDialog = false;//弹框消失
		          		$scope.tip = true;
						$scope.tipTxt = results.error_msg;
          			}
          			
      			});
			} 
		 	removeRedList();
				

		}
	}
	//接口9.4
	$scope.paginationRed = {
        currentPage: 1,//当前页
        itemsPerPage: 20,//每页多少条数据
        pagesLength:15//步长（如果设置建议设置为奇数）
    };
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
//          	alert($scope.redListName)
				if($scope.redListName != ''){
					$scope.nameRed = $scope.redListName[0].display_name;
    				$scope.set_id = $scope.redListName[0].set_id;
				}
				//如果文件的个数为0，显示无图数据
            	if(results.counts == 0){
            		$scope.redListCounts = 0;
            		$scope.redAllCounts = 0;
//          		alert($scope.redListCounts + 'fffff')
            	}
//  			alert($scope.nameRed)
    			//红名单9.1
				var redList = function() {
				  	var options = {
				        service_code: 'WINMET_APP_RED_LIST',
				        params:{
				        	service_code: 'WINMET_APP_RED_LIST',
				        	set_id:$scope.set_id,
				        	current_index:($scope.paginationRed.currentPage - 1)*20,
	        				page_size:$scope.paginationRed.itemsPerPage
				        }
				  	};
			      	getInterface.jsonp(options, function (results) {
			          	if(results.status == 'Y'){
			          		$scope.redList = results.results.list;
			          		$scope.redListCounts = results.counts;
			          		$scope.paginationRed.totalItems = results.results.total_count;
//			          		alert($scope.redList)
							//获取下标值
							var indexValueRedlist = ($scope.paginationRed.currentPage - 1)*20;
							if(indexValueRedlist != 0){
								$location.hash('jumpHighRedlist');
    							$anchorScroll.yOffset = 100;
								$anchorScroll();
							}
						}		            	            
			      	});
				} 
//			 	redList();
			 	$scope.$watch('paginationRed.currentPage + paginationRed.itemsPerPage', redList);
    			
    			$scope.nameReds = function(nameRed){
			       	var redListLength = $scope.redListName;
//			       	alert(nameRed)
			       	for(var i =0; i<redListLength.length; i++){
	        			if($scope.redListName[i].display_name == nameRed){
			    			$scope.set_id = $scope.redListName[i].set_id;
//			    			alert($scope.set_id)
//			    			redList();//9.1
			    			$scope.$watch('paginationRed.currentPage + paginationRed.itemsPerPage', redList);
					 	}
				 	}
			    }
    			
			}		            	            
        });
	} 
   	redListGuanli();
	
//管理红名单模块
	//创建文件夹
	$scope.setupRed = function(){

		var nameListA = 'nameList_createRedkList';
		var nameListB = 'click';
		var nameListC = 'createRedList';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

		if($scope.fileNameRed == undefined){
			$scope.tip = true;
			$scope.tipTxt = '文件夹名称不能为空'
		}else{
//			alert($scope.fileNameRed)//获取输入框内容
			if($scope.fileNameRed.length > 15){
				$scope.tip = true;
				$scope.tipTxt = '文件名称不能超过15个字'
			}else{

				var nameListA = 'nameList_createRedListOK';
				var nameListB = 'click';
				var nameListC = 'createRedListOK';
				_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

				//新建红名单文件夹9.5
				var setNewRed = function() {
				  	var options = {
				        service_code: 'WINMET_APP_ADD_RED_SET',
				        params:{
				        	service_code: 'WINMET_APP_ADD_RED_SET',
					        display_name:$scope.fileNameRed
				        }
				  	};
				    getInterface.jsonp(options, function (results) {
				        if(results.status == 'Y'){	
				        	redListGuanli();
				        	$scope.redAllCounts = 1;//无数据图消失
				        	$scope.fileNameRed = '';//清空输入框的内容
						}else{
							$scope.tip = true;
							$scope.tipTxt = results.error_msg
						}
				    });
				} 
			 	setNewRed();
			}
			
		}
		
	}
	//重命名
	$scope.renameRed = function(set_id){

		var nameListA = 'nameList_renameRedList';
		var nameListB = 'click';
		var nameListC = 'renameRedList';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

//		alert(set_id)//得到对应的文件夹id
		$scope.reNameSet = true;
		$scope.noattent = function(fileNewName){
//			alert(fileNewName)
			if(fileNewName == undefined){
				$scope.tip = true;
				$scope.tipTxt = '文件夹名称不能为空'
			}else{
//				alert(fileNewName);
				if(fileNewName.length > 15){
					$scope.tip = true;
					$scope.tipTxt = '文件名称不能超过15个字'
				}
				else{

					var nameListA = 'nameList_renameRedListOK';
					var nameListB = 'click';
					var nameListC = 'renameRedListOK';
					_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

					//修改红名单文件夹9.7
				  	var setRenameRed = function() {
					  	var options = {
					        service_code: 'WINMET_APP_MODIFY_RED_SET',
					        params:{
					        	service_code: 'WINMET_APP_MODIFY_RED_SET',
					        	set_id:set_id,
						        display_name:fileNewName
					        }
					  	};
					    getInterface.jsonp(options, function (results) {
					        if(results.status == 'Y'){
					        	$scope.reNameSet = false;
					        	redListGuanli();
							}	
							else{
								$scope.tip = true;
								$scope.tipTxt = results.error_msg
							}
					    });
					} 
				 	setRenameRed();
				}
				
			}
		}
	}
	//点击删除
	$scope.delectRed = function(set_id){

		var nameListA = 'nameList_delectRedListManager';
		var nameListB = 'click';
		var nameListC = 'delectRedListManager';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

//		alert(set_id)
		$scope.noshowDialog = true;
		$scope.tanTxt = '是否删除？';
		//点击确定
		$scope.noattent = function(){

			var nameListA = 'nameList_delectRedListManagerOK';
			var nameListB = 'click';
			var nameListC = 'delectRedListManagerOK';
			_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

//			alert(set_id)
			//删除红名单文件夹9.6
			var deleteJiaRed = function() {
			  	var options = {
			        service_code: 'WINMET_APP_DELETE_RED_SET',
			        params:{
			        	service_code: 'WINMET_APP_DELETE_RED_SET',
			        	set_id:set_id
			        }
			  	};
			    getInterface.jsonp(options, function (results) {
			        if(results.status == 'Y'){	
			        	$scope.noshowDialog = false;
			        	redListGuanli();
					}		            	            
			    });
			} 
		 	deleteJiaRed();
		};
		
	}
	
	//名称管理-企业名称
	$scope.reSearch = function(companyName){
		$rootScope.$_userSearchData = {};
		$rootScope.$_userSearchData.searchKey = companyName;
		$rootScope.$broadcast('reSearch',search);
		scrollTo(0,0);

		//搜索按钮统计
		var nameListA = 'nameList_searchCompanyBtn';
		var nameListB = 'click';
		var nameListC = 'searchCompanyBtn';
		_hmt.push(['_trackEvent', nameListA, nameListB, nameListC]);

	};
   	
});
