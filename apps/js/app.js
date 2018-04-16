var app = angular.module('fundApp',['ui.router', 'oc.lazyLoad', 'ngCookies','tm.pagination']);
app.provider('helper', function () {
    var name = 'world';

    this.$get = function () {
        return {
            sayHello: function () {
                console.log('hello ' + name);
            }
        };
    };

    this.loadModuleFile = function (modules, file) {
        var files = angular.isArray(file) ? file : [file];
        var modules_files = [];
        angular.forEach(files, function (value, index, objs) {
            var path = 'templates';
            var filename = path + '/' + value;
            var module = modules;
            if (angular.isArray(modules)){
                module = modules[index];
            }
            if (value.indexOf('/') != -1){
                filename = value;
            }else if (value.indexOf('.js') != -1) {
                filename = 'controllers/' + value;
            } else if (value.indexOf('.css') != -1) {
                filename = 'css/' + value;
            }
            modules_files.push('apps/modules/' + module + '/' + filename);
        });
        return angular.isArray(file) ? modules_files : modules_files.join('');
    }
});
app.run(function ($templateCache,$rootScope, $state, $stateParams, $cookies, $window, $location, $timeout,  ENV, userInfo, Authentication,getInterface,$location) {
	
	//登录信息
	var mac = '';
	if($location.search()){
		mac = $location.search().mac;
	}
	
	var userInfoData = userInfo.getObject(); 
	userInfoData.mac = mac;

	
	$rootScope.$_userSearchData={};
	$rootScope.$_collection = {};
	$rootScope.$on('$stateChangeStart', function (event, next, toState, toParams, fromState, fromParams) {
        Authentication.authorized(event, next);
		$rootScope.$_infoRed = userInfo.getObject('profile_info_red');//红名单权限
		$rootScope.$_userSearchData = $cookies.getObject('userSearch');
		$rootScope.$_collection = $cookies.getObject('collection');//4.2预警接口返回值
		
		
		var tokenPri = userInfo.getObject('token');
		var userIdPri = userInfo.getObject('user_id');
		if(tokenPri &&　userIdPri){//有token
			var options = {//3.8接口
				service_code: 'WINMET_APP_VERIFY_TOKEN',
				params: {
					service_code:'WINMET_APP_VERIFY_TOKEN',
					token: tokenPri,
					user_id:userIdPri
				}
			};
			getInterface.jsonp(options, function(results) {
				if(results.status == 'Y'){
					var loginUrl = $cookies.get('loginUrl') || '';	
					if (loginUrl){//有token进入刚才的页面
						if(loginUrl.indexOf('forgive') > 0){
							$state.go('tabs.collection');
						}else{
							window.location.href = loginUrl;
						}
					}
					//3.7接口（成功与否不关系）
					var options = {		
						service_code: 'WINMET_APP_KEEP_ALIVE',
						params: {
							service_code:'WINMET_APP_KEEP_ALIVE',
							token: tokenPri,
							user_id:userIdPri
						}
					};
					getInterface.jsonp(options, function(results) {
						
					});
				}
					
			});
		}
	});
	
	$rootScope.$on('tampSearch',function(event,data){
		$rootScope.$_userSearchData = $cookies.getObject('userSearch');
	});
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    	
		var currentUrl = $location.url();
		if(currentUrl.indexOf('/login') < 0){
			userInfo.remUrl(currentUrl);//存储当前位置
		}
    }); 
 	
 	$rootScope.loadingTimeLimt = 1000;
 	$rootScope.loadingTimeintervals = 100;

})

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', '$httpProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, $httpProvider, helperProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;
            app.stateProvider = $stateProvider;

            //app.helperProvider = helperProvider;
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|wxlocalresource|weixin):/);


            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            //$compileProvider.debugInfoEnabled(false);

            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function (data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];


            //$ionicConfigProvider.views.maxCache(1);

            //$ionicConfigProvider.scrolling.jsScrolling(false);
            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js

    $urlRouterProvider.when("", "/login?mac=");

    $stateProvider
    //底部tab切换 
   		 .state('tabs', {
            url: '/tabs',           
	        templateUrl: 'apps/templates/tabs.html',				
          //controller:'TabCtrl'
          	controller: 'TabCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(helperProvider.loadModuleFile('index', ['TabCtrl.js']));
                }]
            }
        })
  		.state('login', {
  			cache: false,
            url: '/login?mac=',
//          templateUrl: helperProvider.loadModuleFile('index', 'login.html'),
            templateUrl: 'apps/modules/index/templates/login.html',
            controller: 'IndexCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(helperProvider.loadModuleFile('index', ['login.css', 'IndexCtrl.js', 'md5.js']));
                }]
            },
            authorizedRoles: ['?']

        })
        .state('forgive', {
            url: '/forgive',
            templateUrl: 'apps/modules/index/templates/forgive.html',
            controller:'ForgiveCtrl',
			resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(helperProvider.loadModuleFile('index', ['login.css', 'ForgiveCtrl.js','md5.js']));
                }]
            },
            authorizedRoles: ['?']
       })
        /*下载*/
       .state('download', {
            url: '/download',
            templateUrl: 'apps/modules/index/templates/download.html',
            controller:'download',
			resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(helperProvider.loadModuleFile('index', ['download.css', 'download.js']));
                }]
            }
       })
       
        
}]).controller("OuterController" , ['$scope', function($scope){
	$scope.bodyOverFlowIsAuto = true;
	$scope.$on("$setWindowOverflowIsAuto" , function(e, mark){
		e.stopPropagation();
		$scope.bodyOverFlowIsAuto = mark;
	});
	 
}]);