'use strict';
angular.module('fundApp')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('tabs.instruct', {
                url: "/instruct", 
                    controller: 'instructCtrl',
                    templateUrl: 'apps/modules/instruct/templates/index.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('instruct', [ 'instruct.css','instructCtrl.js']));
                    }]
                }
            })
            /* 关于胜遇法律声明*/
          .state('tabs.instruct.statement', {
                url: "/instruct/statement", 
                    controller: 'statementCtrl',
                    templateUrl: 'apps/modules/accountset/templates/statement.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'statement.css','statementCtrl.js']));
                    }]
                }
            })
          .state('tabs.instruct.about', {
                url: "/instruct/about", 
                    controller: 'aboutCtrl',
                    templateUrl: 'apps/modules/accountset/templates/about.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'about.css','aboutCtrl.js']));
                    }]
                }
            })
           
 }]);