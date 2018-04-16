'use strict';
//
app.controller('newsCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http,$anchorScroll,$window,errorCode) {
	
	var _hmt = _hmt || [];
	var newsA = 'tabNews';//策略管理
	var newsB = 'click';
	var newsC = 'news';
	_hmt.push(['_trackEvent', newsA, newsB, newsC]);
	
	//推送消息
	var pushMessageA = 'pushMessage';
	var pushMessageB = 'click';
	var pushMessageC = 'pushMessageS';
	//运营通知
	var operationNoticeA = 'operationNotice';
	var operationNoticeB = 'click';
	var operationNoticeC = 'operationNoticeS';

	/*选项卡切换*/
	$scope.changeActive=1;
    $scope.changes=function(index,id){
    	if(index == 1){
    		_hmt.push(['_trackEvent', pushMessageA, pushMessageB, pushMessageC]);
			console.log(pushMessageC);
    	}else if(index == 2){
    		_hmt.push(['_trackEvent', operationNoticeA, operationNoticeB, operationNoticeC]);
			console.log(operationNoticeC);
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
	  	$scope.newsName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.newsName == "/statement" || $scope.newsName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
	});
    
    
    $scope.$on('successJoin',function(event,data){
		console.log(mySuccess);
		newListOne();
		console.log('ok')
	});
    

	$scope.boxAlert = function(content,content_type){
//		alert(content_type)
//		alert(content)
		if(content_type == 1){
//			$window.open('https://www.baidu.com/')
			var https = 'https://' + content +'/';
			$window.open(https)
//			$window.open(content)
		}else{
			$scope.contents = true;
			$scope.title = content;
		}
		
	}
	/*关闭弹出框*/
	$scope.noplayBox = function(){
		$scope.contents = false;
	}
    
    $scope.paginationConf = {
        currentPage: 1,//当前页
        itemsPerPage: 20,//每页多少条数据
        pagesLength:15//步长（如果设置建议设置为奇数）
    };

	$scope.temp = {
        currentPage: 1,//当前页
        itemsPerPage: 20,//每页多少条数据
        pagesLength:15//步长（如果设置建议设置为奇数）
    };
   	
   	//运营通知5.2
   	var newListTwo = function() {
   		scrollTo(0,0);
    	var options = {
	        service_code: 'WINMET_APP_NOTICE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_NOTICE_LIST',
	        	current_index: 	($scope.temp.currentPage - 1) * 20,
	        	page_size:$scope.temp.itemsPerPage
//		        	current_index:$scope.current_index
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){	
            	$scope.temp.totalItems= results.counts;
            	$scope.newsTwo = results.results.messages;
			}		            	            
        });
	} 
// 	newListTwo();
   	
   	
   	//推送消息列表5.1
   	var newListOne = function() {
   		scrollTo(0,0);
    	var options = {
	        service_code: 'WINMET_APP_MESSAGE_LIST',
	        params:{
	        	service_code: 'WINMET_APP_MESSAGE_LIST',
	        	current_index:($scope.paginationConf.currentPage - 1)*20,
	        	page_size:$scope.paginationConf.itemsPerPage
	        }
    	};
        getInterface.jsonp(options, function (results) {
//		        	errorCode.code(results);
            if(results.status == 'Y'){	
				$scope.paginationConf.totalItems = results.results.total_count;
            	$scope.newsOne = results.results.messages;
            	
            	
            		
            	var b = ($scope.paginationConf.currentPage - 1)*20;
				//当导航栏的焦点在消息列表
				if($scope.tabName == '/news'){
					//当消息列表为第一页
					if(b == 0){
	            		document.getElementById('shandongFlash').style.display = 'none';
						document.getElementById('myNews').style.display = 'block';
						$cookies.remove('currentNumber',{'path': '/'});
//						console.log(b)
	            	}else{
	            		//存当前的页数
	            		var currentNumber={
				  			numberS:b
				  		};		
						$cookies.putObject('currentNumber', currentNumber, {'path': '/'});
							//取当前的页数
						var myA = $cookies.getObject('currentNumber').numberS;
//						console.log(myA);
	            	}
				}else{
//					console.log($scope.tabName);
				}
			}		            	            
        });
	} 
   	
   	
   	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', newListOne);
   	$scope.$watch('temp.currentPage + temp.itemsPerPage', newListTwo);

//消息闪动效果   	
	var getNumber;
   	var socket = io('http://59.110.25.130:2120');
    var user_id = userInfo.getObject('user_id');
    socket.on('connect', function(){
        socket.emit('login', user_id);
    });
    socket.on('new_msg', function(msg){
//  	alert(msg);
//		newListOne();

		//获取下标值
		var a = ($scope.paginationConf.currentPage - 1)*20;
//		alert(a)
			//如果不在第一页，效果出现
		if(a != 0){
				//效果闪动
    		document.getElementById('shandongFlash').style.display = 'block';
			document.getElementById('myNews').style.display = 'none';
				//效果闪动
//			getNumber = 1;

			//存值1
			var newsNumber={
	  			numberS:1
	  		}; 		
			$cookies.putObject('newsNumber', newsNumber, {'path': '/'});
			getNumber = $cookies.getObject('newsNumber').numberS;
//			console.log(getNumber);
			
//			alert('111111')
    	}
			//否则，效果消失，加载数据
		else{
				//效果消失
    		document.getElementById('shandongFlash').style.display = 'none';
	  		document.getElementById('myNews').style.display = 'block';
	  			//效果消失
	  			//加载数据
	  		newListOne();
//	  		alert('222222');
//	  		console.log(getNumber + 'jjjjjjjjjjj')
    	}
//  	console.log('值为' + getNumber)
    	if(getNumber ==1){
			document.getElementById('shandongFlash').style.display = 'block';
			document.getElementById('myNews').style.display = 'none';
		}else if(getNumber ==undefined){
			document.getElementById('shandongFlash').style.display = 'block';
			document.getElementById('myNews').style.display = 'none';
		}else{
			document.getElementById('shandongFlash').style.display = 'none';
			document.getElementById('myNews').style.display = 'block';
		}
    	
    })
    
    
   	
});
