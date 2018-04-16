'use strict';
angular.module('fundApp')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('tabs.accountset', {
                url: "/accountset", 
                    controller: 'accountsetCtrl',
                    templateUrl: 'apps/modules/accountset/templates/index.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile(['accountset','accountset','index'], [ 'accountset.css','accountsetCtrl.js','md5.js']));
                    }]
                }
            })
            /* 关于胜遇法律声明*/
          .state('tabs.accountset.statement', {
                url: "/accountset/statement", 
                    controller: 'statementCtrl',
                    templateUrl: 'apps/modules/accountset/templates/statement.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'statement.css','statementCtrl.js']));
                    }]
                }
            })
          .state('tabs.accountset.about', {
                url: "/accountset/about", 
                    controller: 'aboutCtrl',
                    templateUrl: 'apps/modules/accountset/templates/about.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'about.css','aboutCtrl.js']));
                    }]
                }
            })
           
 }]);