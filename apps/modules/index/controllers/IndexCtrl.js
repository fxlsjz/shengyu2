'use strict';
//
app.controller('IndexCtrl', function ($rootScope, $scope, $state, $stateParams, $location, getInterface ,$cookies,ENV,userInfo) {
	
//	var _hmt = _hmt || [];
//所有的按钮
	//登录页的登录按钮
	var loginA = 'login';
	var loginB = 'click';
	var loginC = 'useLogin';
	
	$scope.username = '';
	$scope.password = {text:''};
//	var bSign = false;
    	//点击忘记密码进入“修改密码”页面
	$scope.forgive=function(){
//		bSign = true;
		$state.go('forgive')
	}
	
	//默认是没有选中"记住用户名"
	if ($cookies.getObject('users')) {
		$scope.checking = true;
	} else {
		$scope.checking = false;
	}
		//input点击事件
	$scope.check = function(){
		$scope.checking =!$scope.checking;	
		if($scope.checking == true && $scope.username){
			var expireDate = new Date();
	        expireDate.setDate(expireDate.getDate() + 365);
	        $cookies.putObject('users', $scope.username, {'path': '/', 'expires': expireDate
});
		}else{
			$cookies.remove('users', {'path': '/'});
		}
	}
	$scope.$watch('username', function(val1,val2){
		if(val2 != val1 && $scope.checking){
			var expireDate = new Date();
	        expireDate.setDate(expireDate.getDate() + 365);
	        $cookies.putObject('users', $scope.username, {'path': '/', 'expires': expireDate});
		}
	});
	$scope.username = $cookies.getObject('users');

	/*关闭弹出框*/
	$scope.noBomb = function(){
		$scope.errcodeBomb = false;
	}
	$scope.okBomb = function(){
		$scope.errcodeBomb = false;
	}
	$scope.login=function(){
		_hmt.push(['_trackEvent', loginA, loginB, loginC]);
		console.log(loginA)

			//判断输入内容是否为空
		if($scope.username==undefined){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "用户名不能为空";
			return false;
		}
			//判断输入内容是否为空
		if(!$scope.password.text){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "密码不能为空";
			return false;
		}

		var passwords = 'fund_manager' + $scope.password.text;
    	var options = {
	        service_code: 'WINMET_APP_LOGIN_SYSTEM',     
	        params:{
	        	service_code: 'WINMET_APP_LOGIN_SYSTEM',
	        	username: $scope.username,
				password: MD5(passwords),
				token: null,
				user_id: null
	        }
    	};
        getInterface.post(options, function (results) {
            if(results.status == 'Y'){
            	var datas = results.results;
          		var userDate={
          			token:datas.token,
          			user_id:datas.user_id,
          			username:datas.username,
          			organization_name:datas.organization_name,
          			profile_info_red:datas.profile_info.red_folder_count,
          			phone_num:datas.phone_num
          		};            	
            	userInfo.setObject(userDate);
				//记住被迫下线时的url
				var loginUrl = $cookies.get('loginUrl') || '';	
				if (loginUrl != ''){//重新登录后，进入刚才的页面
					if(loginUrl.indexOf('forgive') > 0){
						$state.go('tabs.collection');
					}else{
						window.location.href = loginUrl;
						console.log(window.location.href);
					}
				}else{//点击退出后，重新登录，进入预警页面
					$state.go('tabs.collection');
				}
                
           }else{
           		$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
            }
       }); 
	}
	
	$scope.keyUpMy = function(e){
		var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
	}
//	$scope.keyUpEnter = function(a){
//		var keycode = window.event?a.keyCode:a.which;
//      if(keycode==13){
//          document.getElementById('passwords').focus();
//      }
//	}
	
	
});
