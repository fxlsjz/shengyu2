'use strict';
//
app.controller('ForgiveCtrl', function ($rootScope, $scope, $state, $stateParams, $location,getInterface,$cookies,ENV,userInfo,$interval) {
	
//	var _hmt = _hmt || [];
//所有的按钮
	//忘记密码页的确定按钮
	var submitsA = 'submits';
	var submitsB = 'click';
	var submitsC = 'useSubmits';
	
	$scope.users = '';
	$scope.passwords = '';
	$scope.pass = '';
	$scope.resetpass = '';
	
	$scope.code="获取验证码"; 
	var bSign = false;
	
	/*关闭弹出框*/
	$scope.noBomb = function(){
		$scope.errcodeBomb = false;
	}
	$scope.okBomb = function(){
		$scope.errcodeBomb = false;
	}
	
		//点击获取验证码
	$scope.gets=function(){
		if(bSign)return;
		bSign=true;
			//判断输入内容是否为空
		if($scope.users==''){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入手机号";
			bSign=false;
			return false;
		}
		else{
				//判断手机号是否正确
			if(/^1[3|4|5|7|8][0-9]{9}$/.test($scope.users)||(/^15[8,9]\d{8}$/g.test($scope.users))){
//	           alert("手机号正确");
	           		//获取验证码的接口
	           var options = {
		        	service_code: 'WINMET_APP_GET_SECODE',
		        	params:{
		        		service_code: 'WINMET_APP_GET_SECODE',
		        		mobile:$scope.users
		        	}
	    		};
	        	getInterface.post(options, function (results) {
	            	if(results.status == 'Y'){
//	                	alert("发送成功");
//	                	$scope.errcodeBomb = true;
//						$scope.errcodeText = "发送成功";
	                	var totle=60;
						var timer=null;
						$interval.cancel(timer);
						timer=$interval(function(){
							totle--
							$scope.code='重新发送'+totle+'s';
							$scope.ptimer=true;
							if(totle  == 0){
								$interval.cancel(timer);
								bSign=false;
								$scope.code='发送验证码';
								$scope.ptimer=false;
							}
						},1000);
		            }else{
		            		$scope.errcodeBomb = true;
							$scope.errcodeText = results.error_msg;
		            		bSign = false;
							return false;
		            }
		        });
	        }
			else{
	         	$scope.errcodeBomb = true;
				$scope.errcodeText = "请输入正确的手机号";
	         	bSign = false;
				return false;
	         }

		}
		
	}
	
		//点击“确定”
	$scope.submits=function(){
		_hmt.push(['_trackEvent', submitsA, submitsB, submitsC]);
		alert(submitsC)

		if($scope.users==''){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入手机号";
			return false;
		}
		if($scope.passwords==''){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入验证码";
			return false;
		}
		if($scope.pass.length<8){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "密码不能少于8位";
			return false;
		}
		if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/.test($scope.pass))){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "密码格式不正确";
			return false;
		}
		if($scope.pass==''){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入密码";
			return false;
		}
		if($scope.resetpass==''){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入新密码";
			return false;
		}
		if($scope.pass != $scope.resetpass){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "两次密码不一致";
			return false;
		}
		else{
//			var resetpassed = 'fund_manager' + $scope.resetpass;
			var options = {
	        	service_code: 'WINMET_APP_MODIFY_PASSWORD',
	        	params:{
	        		service_code: 'WINMET_APP_MODIFY_PASSWORD',
	        		mobile:$scope.users,
	        		verify_code:$scope.passwords,		        		
	        		password: MD5('fund_manager'+$scope.resetpass)
	        		
	        	}
    		};
        	getInterface.post(options, function (results) {
            	if(results.status == 'Y'){
//	                	alert('修改成功');
                	$scope.errcodeBomb = true;
					$scope.errcodeText = "修改成功";
					
                	var datas = results.results;
	          		var userDate={
	          			token:datas.token,
	          			user_id:datas.user_id,
	          			username:datas.username,
	          			organization_name:datas.organization_name,
	          		};      
	            	userInfo.setObject(userDate);
//						$state.go('login');
                	$scope.okBomb = function(){
						$scope.errcodeBomb = false;
						$state.go('login');
					}
					$scope.noBomb = function(){
						$scope.errcodeBomb = false;
						$state.go('login');
					}
            	}else{
//          			alert(results.error_msg)
        			$scope.errcodeBomb = true;
					$scope.errcodeText = results.error_msg;
        		}
        	});
	        	
		}
		
	}
	
	$scope.keyUpForgive = function(e){
		var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.submits();
        }
	}
		
//		//手机号，点回车
//	$scope.keyOne = function(a){
//		var keycode = window.event?a.keyCode:a.which;
//      if(keycode==13){
//          document.getElementById('codes').focus();
//      }
//	}
//		//验证码，点回车
//	$scope.keyTwo = function(e){
//		var keycode = window.event?e.keyCode:e.which;
//      if(keycode==13){
//          document.getElementById('pass').focus();
//      }
//	}
//	
//		//重置密码，点回车
//	$scope.keyThree = function(e){
//		var keycode = window.event?e.keyCode:e.which;
//      if(keycode==13){
//          document.getElementById('resetpass').focus();
//      }
//	}
	
});
