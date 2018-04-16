'use strict';
//
app.controller('accountsetCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$anchorScroll,$interval) {
	
	//账户设置
	var accountSettingA = 'accountSetting';
	var accountSettingB = 'click';
	var accountSettingC = 'accountSettingS';
	_hmt.push(['_trackEvent', accountSettingA, accountSettingB, accountSettingC]);
	console.log(accountSettingC);
	//左边的“账户设置”
	var settingLeftA = 'settingLeft';
	var settingLeftB = 'click';
	var settingLeftC = 'settingLeftS';
	//左边的“重置密码”
	var resetLeftA = 'resetLeft';
	var resetLeftB = 'click';
	var resetLeftC = 'resetLeftS';
	//左边的“接收消息方式”
	var receiveLeftA = 'receiveLeft';
	var receiveLeftB = 'click';
	var receiveLeftC = 'receiveLeftS';
	//重置密码的“确定”
	var resizeSubmitA = 'resizeSubmit';
	var resizeSubmitB = 'click';
	var resizeSubmitC = 'resizeSubmitS';
	//接收消息方式的“确定”
	var receiveSubmitA = 'receiveSubmit';
	var receiveSubmitB = 'click';
	var receiveSubmitC = 'receiveSubmitS';
	
	$scope.accountsetName = $state.current.name;
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.accountsetName = '/'+url[2];
	  	$scope.yijiulshwo = true;
	  	if($scope.accountsetName == "/statement" || $scope.accountsetName == "/about"){
	  		$scope.yijiulshwo = false;
	  	}
//	  	alert($scope.aboutName)
	});
	$scope.setting = function(){
		_hmt.push(['_trackEvent', settingLeftA, settingLeftB, settingLeftC]);
		console.log(settingLeftC);
	}
	$scope.changeul=function(id){
		if(id == 'reset'){
			_hmt.push(['_trackEvent', resetLeftA, resetLeftB, resetLeftC]);
			console.log(resetLeftC);
		}else if(id == 'receive'){
			_hmt.push(['_trackEvent', receiveLeftA, receiveLeftB, receiveLeftC]);
			console.log(receiveLeftC);
		}
    	$scope.changeActiveul=id;
    	$location.hash(id);
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
   }
    //3.4.	修改用户配置
//  $scope.items = [
//		{label:"短信",selected:true},
//		{label:"推送"},
//		{label:"邮件"}
//	];
	$scope.users = {tel:''};
	$scope.passwords = {text:''};
	$scope.pass = {text:''};
	$scope.resetpass = {text:''};
	
	$scope.phoneNum = userInfo.getObject().phone_num;
	if($scope.phoneNum){
		$scope.users.tel = $scope.phoneNum;
	}
	
	//3.6
	var receiveMode = function() {
		var options = {
    		service_code: 'WINMET_APP_GET_USER_SET',
   			params:{
    			service_code: 'WINMET_APP_GET_USER_SET'
    		}
		};
		getInterface.jsonp(options, function (results) {
      		if(results.status == 'Y'){
      			$scope.items = results.results;
      				//是否接收短信
      			$scope.one = $scope.items.receive_note;
      			if($scope.one == 'Y'){
      				$scope.modeOne = true;
      			}else{
      				$scope.modeOne = false;
      			}
      				//是否接收推送消息
      			$scope.two = $scope.items.receive_message;
      			if($scope.two == 'Y'){
      				$scope.modeTwo = true;
      			}else{
      				$scope.modeTwo = false;
      			}
      				//是否接收邮件
      			$scope.three = $scope.items.receive_email;
      			if($scope.three == 'Y'){
      				$scope.modeThree = true;
      			}else{
      				$scope.modeThree = false;
      			}
      			//3.4.	修改用户配置
			    $scope.items1 = [
					{label:"短信",selected:$scope.modeOne},
					{label:"推送",selected:$scope.modeTwo},
					{label:"邮件",selected:$scope.modeThree}
				];
			}		            	            
		});
	} 
	receiveMode();   
	
	/*关闭弹出框*/
	$scope.noBomb = function(){
		$scope.errcodeBomb = false;
	}
	$scope.okBomb = function(){
		$scope.errcodeBomb = false;
	}
	var note;
	var message;
	var email;
	
	$scope.selCheck = function(){
		angular.forEach($scope.items1,function(value,index){
			if(index == 0){
				if(value.selected == true){
					note = 'Y';
				}else{
					note = 'N';
				}
			}
			if(index == 1){
				if(value.selected == true){
					message = 'Y';
				}else{
					message = 'N';
				}
			}
			if(index == 2){
				if(value.selected == true){
					email = 'Y';
				}else{
					email = 'N';
				}
			}
		})
	}
	$scope.userSet = function() {
		_hmt.push(['_trackEvent', receiveSubmitA, receiveSubmitB, receiveSubmitC]);
		console.log(receiveSubmitA);
		$scope.selCheck();
    	var options = {
	        service_code: 'WINMET_APP_MODIFY_USER_SET',
	        params:{
	        	service_code: 'WINMET_APP_MODIFY_USER_SET',
		        receive_note: note,//是否接收短信
				receive_message:message,//是否接收推送消息
				receive_email:email
	        }
    	};
        getInterface.jsonp(options, function (results) {
            if(results.status == 'Y'){	
            	$scope.errcodeBomb = true;
				$scope.errcodeText = "修改成功";
			}else{
				$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
			}
        });
	} 
	
	var token = userInfo.getObject('token');
  	var user_id = userInfo.getObject('user_id');
  	
  	
  	$scope.code="获取验证码"; 
	var bSign = false;
	//点击获取验证码
	$scope.gets=function(){
		if(bSign)return;
		bSign=true;	
		if(!$scope.users.tel){//判断输入内容是否为空
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入手机号";
			bSign=false;
			return false;
		}else{
			if(/^1[3|4|5|7|8][0-9]{9}$/.test($scope.users.tel)||(/^15[8,9]\d{8}$/g.test($scope.users.tel))){//判断手机号是否正确
           		//获取验证码的接口
	           var options = {
		        	service_code: 'WINMET_APP_GET_SECODE',
		        	params:{
		        		service_code: 'WINMET_APP_GET_SECODE',
		        		mobile:$scope.users.tel
		        	}
	    		};
	        	getInterface.post(options, function (results) {
	            	if(results.status == 'Y'){
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
	        }else{
	         	$scope.errcodeBomb = true;
				$scope.errcodeText = "请输入正确的手机号";
	         	bSign = false;
				return false;
	         }

		}
		
	}
			//点击“确定”
	$scope.resizesubmits=function(){
		_hmt.push(['_trackEvent', resizeSubmitA, resizeSubmitB, resizeSubmitC]);
		console.log(resizeSubmitA);
		if(!$scope.users.tel){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入手机号";
			return;
		}
		if(!$scope.passwords.text){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入验证码";
			return;
		}
		if($scope.pass.text){
			if($scope.pass.text.length < 8){
				$scope.errcodeBomb = true;
				$scope.errcodeText = "密码不能少于8位";
				return;
			}
		}
		if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/.test($scope.pass.text))){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "密码格式不正确";
			return;
		}
		if(!$scope.pass.text){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入密码";
			return;
		}
		if(!$scope.resetpass.text){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "请输入确认密码";
			return;
		}
		if($scope.pass.text != $scope.resetpass.text){
			$scope.errcodeBomb = true;
			$scope.errcodeText = "两次密码不一致";
			return;
		}
		var options = {
        	service_code: 'WINMET_APP_UPDATE_PASSWORD',
        	params:{
        		service_code: 'WINMET_APP_UPDATE_PASSWORD',
        		mobile:$scope.users.tel,
        		verify_code:$scope.passwords.text,        		
        		password:  MD5('fund_manager'+ $scope.resetpass.text),
        		token:token,
        		user_id:user_id
        		
        		
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
					scrollTo(0,0);
				}
				$scope.noBomb = function(){
					$scope.errcodeBomb = false;
					$state.go('login');
					scrollTo(0,0);
				}
        	}else{
    			$scope.errcodeBomb = true;
				$scope.errcodeText = results.error_msg;
    		}
    	});
	        	

		
	}

	
   	
});