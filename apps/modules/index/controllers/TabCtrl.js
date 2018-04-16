'use strict';
//
app.controller('TabCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,errorCode,getInterface) {
//	userInfo.getObject('token');
//	userInfo.getObject('username');				//用户名
//	userInfo.getObject('organization_name');	//企业名
//	userInfo.getObject('user_id');
//	alert(userInfo.getObject('username'));
//	alert(userInfo.getObject('organization_name'));
//	alert(2)
	$scope.username = userInfo.getObject('username');
	$scope.organization_name = userInfo.getObject('organization_name');
	
//	var _hmt = _hmt || [];
	
//所有的按钮
	//返回顶部
	var backTopA = 'backTop';
	var backTopB = 'click';
	var backTopC = 'goBackTop';
	//退出登录
	var loginoutA = 'loginout';
	var loginoutB = 'click';
	var loginoutC = 'useLoginoutUse';
	
	
	//点击底部按钮，返回头部
	$scope.gobackTop = function(){
		scrollTo(0,0); 
		_hmt.push(['_trackEvent', backTopA, backTopB, backTopC]);
//		console.log(backTopA);
	}


	$scope.tabName = $state.current.name;
	document.getElementById('shandongFlash').style.display = 'none';
	
//	console.log($cookies.getObject('newsNumber'));
	var getNumber;
	if($cookies.getObject('newsNumber')){
		getNumber = $cookies.getObject('newsNumber').numberS;
		console.log(getNumber)
	}

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.tabName = '/'+url[1];
	  	scrollTo(0,0); //滚动到顶部
	    //console.log($scope.tabName);  // 这个 toState 没有 person 的值 'good'
	    
//	    alert(getNumber)
	    	//消息闪动
	    if($scope.tabName == '/news'){
	  		document.getElementById('shandongFlash').style.display = 'none';
	  		document.getElementById('myNews').style.display = 'block';
	  		
	  		$cookies.remove('newsNumber', {'path': '/'});
	  		getNumber = 0;
//	  		console.log(getNumber)
	  	}
	    else{
	    		//如果没有闪动，就不闪动
			if(document.getElementById('shandongFlash').style.display == 'none'){
				document.getElementById('shandongFlash').style.display = 'none';
				document.getElementById('myNews').style.display = 'block';
			}
				//如果有闪动，就有闪动
			if(document.getElementById('shandongFlash').style.display == 'block'){
				document.getElementById('shandongFlash').style.display = 'block';
				document.getElementById('myNews').style.display = 'none';
			}

	  	}
	    
	    
	    var getCurrent;
	  	if($cookies.getObject('currentNumber')){
			getCurrent = $cookies.getObject('currentNumber').numberS;
//			alert(getCurrent)
			
			if(getCurrent ==0){
//		  		alert('0000000000')
		  		document.getElementById('shandongFlash').style.display = 'none';
				document.getElementById('myNews').style.display = 'block';
		  	}else{
		  		document.getElementById('shandongFlash').style.display = 'block';
				document.getElementById('myNews').style.display = 'none';
//		  		getNumber = 0;
//		  		location.reload();
	//	  		var mySuccess = 9;
	//	  		$scope.$emit('successJoin', mySuccess);
//		  		alert('zzzzzzzzzzzzz')
		  	}
			
		}
	  	
	  	
	  	var getNumber;
	  	if($cookies.getObject('newsNumber')){
	  		getNumber = $cookies.getObject('newsNumber').numberS;
			if(getNumber ==1){
				document.getElementById('shandongFlash').style.display = 'block';
				document.getElementById('myNews').style.display = 'none';
			}else{
				document.getElementById('shandongFlash').style.display = 'none';
				document.getElementById('myNews').style.display = 'block';
			}
			
		}
	    
	    
	});
	
	var token = userInfo.getObject('token');
	var userId = userInfo.getObject('user_id');
	//点击退出到登录页
	$scope.loginout = function(){
		_hmt.push(['_trackEvent', loginoutA, loginoutB, loginoutC]);
		
		var options = {
	        service_code: 'WINMET_APP_USER_LOGOUT',     
	        params:{
	        	service_code: 'WINMET_APP_USER_LOGOUT',
				token: token,
				user_id: userId
	        }
		};
	    getInterface.jsonp(options, function (results) {
	        if(results.status == 'Y'){
					//退出清空值
				userInfo.logout();
				location.href = "#/login?mac=";
				scrollTo(0,0); //滚动到顶部
				//自动刷新页面
				setTimeout(function myrefresh(){window.location.reload()},500);
	        }else{
	       		$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
	        }
	    }); 
		
	
		
	}

	$scope.erCodeHtml = function(){
		$scope.showCode = true;
	}
	//关闭
    $scope.closeBox = function () {
        $scope.showCode = false;
    }
    
    $scope.xiazai = function(){
		$state.go('download');
	}
	
	
	
	// 连接服务端
    var socket = io('http://59.110.25.130:2120');
    // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
    var user_id = userInfo.getObject('user_id');
    // socket连接后以user_id登录
    socket.on('connect', function(){
        socket.emit('login', user_id);
    });
    // 后端推送来消息时
    socket.on('new_msg', function(msg){
 		    
		//在消息列表，闪动效果消失
        if($scope.tabName == '/news'){
	  		document.getElementById('shandongFlash').style.display = 'none';
			document.getElementById('myNews').style.display = 'block';
			$cookies.remove('numberS',{'path': '/'});
	  		
	  	}
        //闪动出现
	    else{
			document.getElementById('shandongFlash').style.display = 'block';
			document.getElementById('myNews').style.display = 'none';
			
			var newsNumber={
	  			numberS:1
	  		}; 
//          userInfo.setObject(newsNumber);			
			$cookies.putObject('newsNumber', newsNumber, {'path': '/'});
			
			getNumber = $cookies.getObject('newsNumber').numberS;
//			console.log(getNumber);
			
	  	}
//      alert(msg);
        
    });
    

	$scope.aa = function(){
//		alert('12345')
			//效果消失
    	document.getElementById('shandongFlash').style.display = 'none';
	  	document.getElementById('myNews').style.display = 'block';
//	  	$state.go('tabs.news');
		getNumber = 0;
		if(getNumber == 0){
			document.getElementById('shandongFlash').style.display = 'none';
	  		document.getElementById('myNews').style.display = 'block';
//	  		alert('2')
	  		if($scope.tabName == '/news'){
	  			location.reload();
	  		}else{
	  			return false;
	  		}
	  		
		}
		else if(getNumber ==1){
			document.getElementById('shandongFlash').style.display = 'block';
			document.getElementById('myNews').style.display = 'none';
//			alert('4444444444')
		}else{
			document.getElementById('shandongFlash').style.display = 'none';
			document.getElementById('myNews').style.display = 'block';
//			alert('55555555')
		}
		//alert('值为' + getNumber)
	  		//效果消失
	  		
//	  	newListOne();
	  	
	  	
	  		//取当前的页数
//	  	console.log(getCurrent)
	  	
	  	
	  	
	  	
	  	
    }
//	location.reload();
	
	
    
});
