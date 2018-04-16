'use strict';
angular.module('fundApp')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('tabs.news', {
                url: "/news", 
                    controller: 'newsCtrl',
                    templateUrl: 'apps/modules/news/templates/index.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('news', [ 'news.css','newsCtrl.js']));
                    }]
                }
            })   
            /* 关于胜遇法律声明*/
          .state('tabs.news.statement', {
                url: "/news/statement", 
                    controller: 'statementCtrl',
                    templateUrl: 'apps/modules/accountset/templates/statement.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'statement.css','statementCtrl.js']));
                    }]
                }
            })
          .state('tabs.news.about', {
                url: "/news/about", 
                    controller: 'aboutCtrl',
                    templateUrl: 'apps/modules/accountset/templates/about.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'about.css','aboutCtrl.js']));
                    }]
                }
            })
            

 }]);
