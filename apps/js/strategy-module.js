'use strict';

angular.module('fundApp')

    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('tabs.strategy', {
                url: "/strategy", 
                    controller: 'strategyCtrl',
                    templateUrl: 'apps/modules/strategy/templates/index.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('strategy', ['strategy.css', 'strategyCtrl.js']));
                    }]
                }
            })    
            /* 关于胜遇法律声明*/
          .state('tabs.strategy.statement', {
                url: "/strategy/statement", 
                    controller: 'statementCtrl',
                    templateUrl: 'apps/modules/accountset/templates/statement.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'statement.css','statementCtrl.js']));
                    }]
                }
            })
          .state('tabs.strategy.about', {
                url: "/strategy/about", 
                    controller: 'aboutCtrl',
                    templateUrl: 'apps/modules/accountset/templates/about.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('accountset', [ 'about.css','aboutCtrl.js']));
                    }]
                }
            })
            
            
        }]);
